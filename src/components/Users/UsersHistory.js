import { getHistory } from "store/deliveries";
import { useEffect, useContext, useState } from "react";
import UserContext from "UserContext";
import QRCode from "qrcode";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import "./Users.scss";

export default function UsersHistory() {
  let userInfo = useContext(UserContext);
  let { access_token } = userInfo;
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let curr_id = window.location.pathname.split("/")[2];
    let data = {
      customer_user_id: [curr_id],
      from: new Date(Date.now() - 24 * 60 * 60 * 1000), // new Date().toISOString(),
      to: new Date().toISOString(),
    };
    if (curr_id) {
      getHistory(access_token, data);
    }
    const generateQrCode = async () => {
      try {
        var opts = {
          errorCorrectionLevel: "H",
          type: "image/jpeg",
          quality: 1,
          margin: 1,
          color: {
            dark: "#000",
            light: "#FFF",
          },
        };
        const response = await QRCode.toDataURL(curr_id, opts);
        setImageUrl(response);
      } catch (error) {
        console.log(error);
      }
    };
    generateQrCode();
  });

  const captureDate = (e) => {
    e.preventDefault();
    let fromDate = new Date().toISOString();
    console.log(fromDate);
  };

  return (
    <div className="main-container">
      <Paper className="Users__top">
        Show QR code with Name
        <TextField
          id="date"
          label="Date"
          type="date"
          onChange={(e, newValue) => captureDate(e, newValue)}
          defaultValue={new Date().toLocaleDateString("fr-CA")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Paper>

      {/* List History Name of the Customer: */}
      <Paper className="AssignUsers__sub" elevation={2}>
        {imageUrl ? (
          <a href={imageUrl} download>
            <img width="350px" height="350px" src={imageUrl} alt="img" />
          </a>
        ) : null}
      </Paper>
    </div>
  );
}
