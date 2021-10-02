import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "lodash";
import {
  passwordValidation,
  emailValidation,
  addressValidation,
  phoneValidation,
  nameValidation,
} from "./validators";
import { registerUser, verifyRegisteredUser } from "store/user";
import "./Agents.scss";

export default function AddAgent(props) {
  const [user, setUserProfile] = useState({
    name: "",
    email_id: "",
    phone_no: "",
    password: "",
    address: "",
    user_type: "2",
    app_token: uuidv4(),
  });
  const [errors, setErrors] = useState({
    Welcome: "Please fill all mandatory fields",
  });

  function validatedForm() {
    return Boolean(Object.keys(errors).length);
  }

  const validForm = () => {
    setErrors({});
    let emailvalid = emailValidation(user.email_id);
    let namevalid = nameValidation(user.name);
    let phonevalid = phoneValidation(user.phone_no);
    let addressvalid = addressValidation(user.address);
    let passwordvalid = passwordValidation(user.password);

    if (emailvalid) {
      setErrors((prevState) => ({
        ...prevState,
        Email: emailvalid,
      }));
    }

    if (namevalid) {
      setErrors((prevState) => ({
        ...prevState,
        Username: namevalid,
      }));
    }

    if (phonevalid) {
      setErrors((prevState) => ({
        ...prevState,
        Phone: phonevalid,
      }));
    }
    if (addressvalid) {
      setErrors((prevState) => ({
        ...prevState,
        Address: addressvalid,
      }));
    }
    if (passwordvalid) {
      setErrors((prevState) => ({
        ...prevState,
        Password: passwordvalid,
      }));
    }
  };

  async function handleAddAgent(e) {
    e.preventDefault();
    await validForm();
    if (!validatedForm()) {
      await submitData(e);
    }
  }

  const submitDataFinal = () => {
    let data = {
      user,
      access_token: props.access_token,
    };
    console.log(data);
    registerUser(data)
      .then((res) => {
        verifyRegisteredUser(res.code, 1234).then((res) => {
          alert("successfully saved");
        });
      })
      .catch((err) => {
        console.log(
          "Failed",
          err.response.data.message,
          err.response.statusText
        );
        alert("Failed");
      });
  };

  const submitData = useCallback(debounce(submitDataFinal, 5000), []);

  return (
    <div className="Agents__sub-container">
      {validatedForm
        ? Object.entries(errors).map(([key, value]) => {
            return (
              <span style={{ color: "red" }}>
                {key} : {value} <br />
              </span>
            );
          })
        : null}
      <form>
        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            type="text"
            required
            placeholder="Name"
            minLength="3"
            onChange={(e) => setUserProfile({ ...user, name: e.target.value })}
            value={user.name}
          ></input>
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            required
            className="Login__input-focus-effect"
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setUserProfile({ ...user, email_id: e.target.value })
            }
            value={user.email_id}
          ></input>
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            required
            pattern="\d*"
            minLength="10"
            maxLength="10"
            className="Login__input-focus-effect"
            type="text"
            placeholder="Phone Number"
            onChange={(e) =>
              setUserProfile({ ...user, phone_no: e.target.value })
            }
            value={user.phone_no}
          ></input>
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            required
            className="Login__input-focus-effect"
            type="text"
            placeholder="Address"
            minLength="5"
            onChange={(e) =>
              setUserProfile({ ...user, address: e.target.value })
            }
            value={user.address}
          ></input>
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            required
            className="Login__input-focus-effect"
            type="text"
            placeholder="Password"
            minLength="8"
            onChange={(e) =>
              setUserProfile({ ...user, password: e.target.value })
            }
            value={user.password}
          ></input>
          <span className="focus-border"></span>
        </div>

        <div className="Login__col-3">
          <input
            className={
              validatedForm()
                ? "Agents__refresh-button Agents__refresh-button-disabled"
                : "Agents__refresh-button"
            }
            onClick={(e) => handleAddAgent(e)}
            type="submit"
            value="Add New Agent"
          ></input>
        </div>
      </form>
    </div>
  );
}
