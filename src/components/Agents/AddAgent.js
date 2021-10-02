import { useState, useCallback } from "react";
import { registerUser } from "store/user";
import "./Agents.scss";
import { v4 as uuidv4 } from "uuid";

import { debounce } from "lodash";

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

  const nameValidation = (fieldValue) => {
    if (/[^a-zA-Z -]/.test(fieldValue)) {
      return setErrors((prevState) => ({
        ...prevState,
        Username: "Invalid characters in Name",
      }));
    }
    if (fieldValue.trim().length < 3) {
      return setErrors((prevState) => ({
        ...prevState,
        Username: "Name needs to be at least three characters",
      }));
    }
    return null;
  };

  const phoneValidation = (fieldValue) => {
    if (/^[6-9]\d{9}$/.test(fieldValue)) {
      return null;
    } else {
      return setErrors((prevState) => ({
        ...prevState,
        phone: "Enter proper Phone",
      }));
    }
  };

  const emailValidation = (email) => {
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return null;
    } else
      return setErrors((prevState) => ({
        ...prevState,
        Email: "Please enter a valid email",
      }));
  };

  const addressValidation = (addr) => {
    if (addr.length < 5)
      return setErrors((prevState) => ({
        ...prevState,
        Address: "Please enter a valid address",
      }));
  };

  const passwordValidation = (pass) => {
    if (pass.length < 8)
      return setErrors((prevState) => ({
        ...prevState,
        Password: "Please enter a valid password min 8 char",
      }));
  };

  function validatedForm() {
    return Boolean(Object.keys(errors).length);
  }

  const validForm = () => {
    setErrors({});
    emailValidation(user.email_id);
    nameValidation(user.name);
    phoneValidation(user.phone_no);
    addressValidation(user.address);
    passwordValidation(user.password);
  };

  async function handleAddAgent(e) {
    e.preventDefault();
    await validForm();
    console.log(!validatedForm());
    if (!validatedForm()) {
      await submitData();
    }
  }

  const submitDataFinal = () => {
    let data = {
      user,
      access_token: props.access_token,
    };
    registerUser(data)
      .then((res) => {
        alert("successfully saved");
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

  const submitData = useCallback(debounce(submitDataFinal, 20000), []);

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
            minlength="3"
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
            required
            minlength="10"
            maxlength="10"
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
            minlength="5"
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
            minlength="8"
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
