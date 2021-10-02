import { useState } from "react";
import { changePassword, forgotpasswordToken } from "store/auth";
import "./login.scss";

export default function ForgotPassword(props) {
  const [otp, setNewotp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [validcode, setvalidcode] = useState(null);

  const fetchOtpToken = (e) => {
    e.preventDefault();
    props.setClickOnce(true);
    forgotpasswordToken(props.username)
      .then((res) => {
        setvalidcode(res.data.code);
        props.setClickOnce(false);
      })
      .catch((res) => {
        props.setapiresponse(res.response.message);
        props.setClickOnce(false);
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    let data = {
      code: validcode,
      otp: otp,
      newpassword: newpassword,
    };
    changePassword(data)
      .then((res) => {
        props.setapiresponse(res.data.message);
        setTimeout(() => {
          props.setResetPassword(false);
          props.setapiresponse(null);
        }, 6000);
      })
      .catch((res) => {
        props.setapiresponse(res.response.data.message);
      });
  };

  return (
    <form className="Login__sub-container">
      <div className="Login__login-header">Forgot Password</div>
      {props.apiresponsemessage ? (
        <div className="Login__col-3">
          <span className="Login__success-password">
            {props.apiresponsemessage}
          </span>
        </div>
      ) : null}
      {!validcode ? (
        <>
          <div className="Login__col-3">
            <input
              className="Login__input-focus-effect"
              type="text"
              placeholder="Phone Number"
              onChange={(e) => props.setUsername(e.target.value)}
              value={props.username}
            ></input>
            <span className="focus-border"></span>
          </div>
          <div className="Login__col-3">
            <input
              onClick={(e) => fetchOtpToken(e)}
              type="submit"
              value="Request OTP"
              disabled={props.username.length !== 10 || props.clickedonce}
              className={
                props.username.length !== 10 || props.clickedonce
                  ? "Login__submit Login__submit-disabled"
                  : "Login__submit"
              }
            ></input>
          </div>
        </>
      ) : (
        <>
          <div className="Login__col-3">
            <input
              className="Login__input-focus-effect"
              type="text"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newpassword}
            ></input>
            <span className="focus-border"></span>
          </div>
          <div className="Login__col-3">
            <input
              className="Login__input-focus-effect"
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setNewotp(e.target.value)}
              value={otp}
            ></input>
            <span className="focus-border"></span>
          </div>
          <div className="Login__col-3">
            <input
              onClick={(e) => handleForgotPassword(e)}
              disabled={
                newpassword.length < 3 || otp.length < 3 || props.clickedonce
              }
              type="submit"
              value="Change Password"
              className={
                newpassword.length < 3 || otp.length < 3 || props.clickedonce
                  ? "Login__submit Login__submit-disabled"
                  : "Login__submit"
              }
            ></input>
          </div>
        </>
      )}
    </form>
  );
}
