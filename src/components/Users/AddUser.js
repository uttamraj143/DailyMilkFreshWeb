import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { registerUser, verifyRegisteredUser } from "store/user";
import "./Users.scss";

export default function AddUser(props) {
  const [user, setUserProfile] = useState({
    name: "",
    email_id: "",
    phone_no: "",
    password: "",
    address: "",
    user_type: "3",
    app_token: uuidv4(),
  });
  const [verifyUser, setVerifyUser] = useState(null);

  const onSubmit = async (data) => {
    const returnedTarget = Object.assign(user, data);
    await setUserProfile({ ...returnedTarget });
    if (errors.length) return;
    submitDataFinal();
  };

  const onSubmitSecond = (data) => {
    if (errors.length) return;
    verifyRegister(data);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitDataFinal = () => {
    let data = {
      user,
      access_token: props.access_token,
    };
    registerUser(data)
      .then((res) => {
        setVerifyUser(res.data.code);
      })
      .catch((err) => {
        console.log("Failed", err.response);
        alert("Failed");
      });
  };

  const verifyRegister = (data) => {
    console.log(data);
    let datas = {
      verify_code: verifyUser,
      otp: data.otp,
    };
    verifyRegisteredUser(datas)
      .then((res) => {
        alert("successfully saved");
        setTimeout(() => {
          props.addUserClicked();
        }, 2000);
      })
      .catch((err) => {
        alert("Failed");
        console.log(err.response);
      });
  };

  // const submitData = useCallback(debounce(submitDataFinal, 5000), []);

  return (
    <div className="Users__sub-container">
      {!verifyUser ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="Login__col-3">
              {errors.name && (
                <div className="Users__errors">
                  Name needs to be at least 5 characters
                </div>
              )}
              <input
                className="Login__input-focus-effect"
                type="text"
                placeholder="Name"
                {...register("name", { required: true, min: 5 })}
              ></input>

              <span className="focus-border"></span>
            </div>

            <div className="Login__col-3">
              {errors.email_id && (
                <span className="Users__errors">{errors.email_id.message}</span>
              )}
              <input
                className="Login__input-focus-effect"
                type="text"
                placeholder="Email"
                {...register("email_id", {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              ></input>

              <span className="focus-border"></span>
            </div>

            <div className="Login__col-3">
              {errors.phone_no && (
                <span className="Users__errors">Please enter phone number</span>
              )}
              <input
                className="Login__input-focus-effect"
                placeholder="Phone Number"
                type="number"
                {...register("phone_no", {
                  required: true,
                  pattern: /^[6789]\d{9}$/,
                })}
              />
              <span className="focus-border"></span>
            </div>

            <div className="Login__col-3">
              {errors.address && (
                <span className="Users__errors">{errors.address.message}</span>
              )}
              <input
                className="Login__input-focus-effect"
                type="text"
                placeholder="Address"
                {...register("address", {
                  required: "required",
                  minLength: {
                    value: 8,
                    message: "Please enter full address",
                  },
                })}
              ></input>
              <span className="focus-border"></span>
            </div>

            <div className="Login__col-3">
              {errors.password && (
                <span className="Users__errors">{errors.password.message}</span>
              )}
              <input
                className="Login__input-focus-effect"
                type="text"
                placeholder="Password"
                {...register("password", {
                  required: "required",
                  minLength: {
                    value: 8,
                    message: "Please enter a valid password min 8 char",
                  },
                })}
              ></input>
              <span className="focus-border"></span>
            </div>

            <div className="Login__col-3">
              <input
                disabled={verifyUser}
                className={
                  errors.length
                    ? "Users__refresh-button Users__refresh-button-disabled"
                    : "Users__refresh-button"
                }
                type="submit"
                value="Add New User"
              ></input>
            </div>
          </form>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmitSecond)}>
            <div className="Login__col-3">
              <input
                className="Login__input-focus-effect"
                type="number"
                placeholder="Enter OTP"
                {...register("otp", {
                  required: "required",
                  minLength: {
                    value: 4,
                    message: "Please enter a valid password min 8 char",
                  },
                })}
              ></input>
              <span className="focus-border"></span>
            </div>
            <div className="Login__col-3">
              <input
                className={
                  errors.length
                    ? "Users__refresh-button Users__refresh-button-disabled"
                    : "Users__refresh-button"
                }
                type="submit"
                value="Submit"
              ></input>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
