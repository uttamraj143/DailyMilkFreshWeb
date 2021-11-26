import React, { useState, useRef } from "react";
import { Container, Card, CardContent, Grid } from "@mui/material";

import QrReader from "react-qr-reader";

export default function QRmainComponent() {
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  // const qrRef = useRef(null);

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };
  return (
    <Container className="conatiner">
      <Card>
        <h2 className="title">Scan QR Code with DailyFreshMilk</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>Qr Code Scan by Web Cam</h3>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
