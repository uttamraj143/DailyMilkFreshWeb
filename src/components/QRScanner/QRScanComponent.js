import { useState, useContext } from "react";
import UserContext from "UserContext";
import { Container, Card, CardContent, Grid } from "@mui/material";
import { updateLocationOfUser } from "store/assignUsers";
import { scannedDelivery } from "store/deliveries";
import QrReader from "react-qr-reader";

export default function QRScanComponent(props) {
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  // const qrRef = useRef(null);
  const userInfo = useContext(UserContext);
  const { access_token } = userInfo;

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = async (result) => {
    if (result) {
      await updateLocationByAgent();
      let data = {
        listDeliveries: {
          delivery_id: props.delivery_id,
          quantity: props.quantity,
          user_id: result,
          delivery_date: new Date().toISOString(),
        },
      };
      await setScanResultWebCam(result);
      await scannedDelivery(data, access_token).then((res) => {
        alert("success");
        props.clearCurrentUser();
      });
    }
  };

  const updateLocationByAgent = () => {
    let locdata = {
      lat: 0,
      long: 0,
    };

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      locdata.lat = crd.latitude;
      locdata.long = crd.longitude;
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    updateLocationOfUser(locdata, access_token).then((res) => {
      console.log("user location updated");
    });
  };

  return (
    <Container className="conatiner">
      <Card>
        <h2 className="title">Scan QR Code with DailyFreshMilk</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>Qr Code Scan by Camera</h3>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3>User ID: {scanResultWebCam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
