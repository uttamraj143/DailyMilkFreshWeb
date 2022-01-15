import { useState, useContext } from "react";
import UserContext from "UserContext";
import { Container, Card, CardContent, Grid } from "@mui/material";
import { updateLocationOfUser } from "store/assignUsers";
import { scannedDelivery } from "store/deliveries";
import QrReader from "react-qr-reader";
import Spinner from "components/common/Spinner";
import Skeleton from "@mui/material/Skeleton";
import SelectQuantity from "components/AssigningUsersToAgent/SelectQuantity";
import { useNavigate } from "react-router-dom";
import "./Qrscanner.scss"

export default function QRScanComponent(props) {
  let navigate = useNavigate();
  const [quantity, setQuantity] = useState(null);
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  // const qrRef = useRef(null);
  const userInfo = useContext(UserContext);
  const [spinner, toggleSpinner] = useState(false);
  const { access_token } = userInfo;

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = async (result) => {
    if (!result) return;
    toggleSpinner(true);
    if (result === props.currentUser.user_id) {
      // await updateLocationByAgent();
      let data = {
        listDeliveries: [
          {
            delivery_id: props.currentUser.delivery_id || "na",
            delivery_type: props.currentUser.del_type || "na",
            product_type: props.currentUser.product_type,
            quantity: quantity ? quantity : props.currentUser.quantity,
            user_id: result,
            delivery_date: new Date().toISOString(),
          },
        ],
      };
      await setScanResultWebCam(result);
      await scannedDelivery(data, access_token)
        .then((res) => {
          alert("success");
          props.clearCurrentUser();
          navigate("/");
        })
        .catch((res) => {
          alert("failed");
        });
      toggleSpinner(false);
    } else {
      alert("Wrong User Selected");
      toggleSpinner(false);
    }
  };

  const handleData = (e, b) => {
    e.preventDefault();
    setQuantity(b);
  };

  const updateLocationByAgent = (e) => {
    e.preventDefault()
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

    updateLocationOfUser(
      access_token,
      locdata,
      props.currentUser.delivery_id
    ).then((res) => {
      console.log("user location updated");
    });
  };

  return (
    <>
      {!spinner ? (
        <Container className="container">
          <Card>
            {/* <h2 className="title">Scan QR Code with DailyFreshMilk</h2> */}
            <div className="QRScanner__heading">For change in quantity select here</div>
            <SelectQuantity handleData={handleData}></SelectQuantity>

            <div onClick={e => updateLocationByAgent(e)} className="QRScanner__location">Click Here to Update Location</div>
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
      ) : (
        <div className="Agents__spinners">
          <Spinner />
          <Skeleton animation="wave" height={100} width="80%" />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={210}
            height={118}
          />
        </div>
      )}
    </>
  );
}
