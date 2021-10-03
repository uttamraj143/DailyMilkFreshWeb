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

  const onSubmit = (data) => {
    setUserProfile({ ...user, ...data });
    submitDataFinal();
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
        verifyRegister(res.code, 1234);
      })
      .catch((err) => {
        console.log("Failed", err.response);
        // alert("Failed");
      });
  };

  const verifyRegister = (code, otp) => {
    verifyRegisteredUser(code, otp)
      .then((res) => {
        alert("successfully saved");
        setTimeout(() => {
          props.addUserClicked();
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // const submitData = useCallback(debounce(submitDataFinal, 5000), []);

  return (
    <div className="Users__sub-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            type="text"
            placeholder="Name"
            {...register("name", { required: true, min: 5 })}
          ></input>
          {errors.name && <span>Name needs to be at least 5 characters</span>}

          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            type="text"
            placeholder="Email"
            {...register("email_id", {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
            })}
          ></input>
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            placeholder="Phone Number"
            type="number"
            {...register("phone_no", {
              required: true,
              // pattern: /^[6789]\d{9}$/,
              min: 10,
            })}
          />
          {errors.phone_no && <span>This field is required</span>}

          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            type="text"
            placeholder="Address"
            {...register("address", { required: true, min: 5 })}
          ></input>
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            type="password"
            placeholder="Password"
            {...register("password", { required: true, min: 8 })}
          ></input>
          <span className="focus-border"></span>
        </div>
        {errors.password && (
          <span>Please enter a valid password min 8 char"</span>
        )}

        <div className="Login__col-3">
          <input
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
  );
}
