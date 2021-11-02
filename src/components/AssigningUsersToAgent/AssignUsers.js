import { useState, useEffect, useContext } from "react";
import UserContext from "UserContext";
import { ReactComponent as UserBadge } from "components/svgs/users.svg";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "components/AssigningUsersToAgent/AssignUsers.scss";
import Spinner from "spinner.png";
import SelectProduct from "components/AssigningUsersToAgent/SelectProduct";
import SelectUser from "components/AssigningUsersToAgent/SelectUser";


//  Stepper - load components
//  1. Select Agent - Single Dropdown
//  2. Select List Users  (single User id)
//  3. Select Product
//  4. Select Quantity
//  5. Select Delivery type


export default function AssignUsers() {
  const userInfo = useContext(UserContext);
  // const [spinner, toggleSpinner] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  function getSteps() {
    return [
      "Basic information",
      "Contact Information",
      "Personal Information",
      "Payment",
    ];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            {/* <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              placeholder="Enter Your First Name"
              fullWidth
              margin="normal"
              name="firstName"
            /> */}
            <SelectUser/>
          </>
        );
  
      case 1:
        return (
          <>
            {/* <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              placeholder="Enter Your E-mail Address"
              fullWidth
              margin="normal"
              name="emailAddress"
            /> */}
            <SelectProduct/>
            </>
        );
      case 2:
        return (
          <>
            <TextField
              id="address1"
              label="Address 1"
              variant="outlined"
              placeholder="Enter Your Address 1"
              fullWidth
              margin="normal"
              name="address1"
            />
          </>
        );
      case 3:
        return (
          <>
            <TextField
              id="cardNumber"
              label="Card Number"
              variant="outlined"
              placeholder="Enter Your Card Number"
              fullWidth
              margin="normal"
              name="cardNumber"
            />
          </>
        );
      default:
        return "unknown step";
    }
  }
  
  return (
    <div className="AssignUsers__main">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <UserBadge /> {"  "} Assign Users to Agents
        </div>
      </div>

      <div>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );

            return (
              <Step {...stepProps} key={index}>
                <StepLabel {...labelProps}>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <Typography variant="h3" align="center">
            Thank You
          </Typography>
        ) : (
          <>
            <form>{getStepContent(activeStep)}</form>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              back
            </Button>

            <Button
              className=""
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
