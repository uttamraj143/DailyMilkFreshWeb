import { useState } from "react";
import { registerUser } from "store/user";

export default function AddAgent() {
  const [name, setname] = useState("");
  const [email_id, setEmail] = useState("");
  const [phone_no, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [user_type, setType] = useState(2);
  const [app_token, setToken] = useState("");

  const handleAddAgent = () => {
    registerUser().then((res) => {
      console.log("ss");
    });
  };

  return (
    <div className="Agent__add-container">
      <form>
        <div className="Login__col-3">
          <input
            className="Login__input-focus-effect"
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setname(e.target.value)}
            value={name}
          ></input>
          <span className="focus-border"></span>
        </div>

        <input
          onClick={(e) => handleAddAgent(e)}
          type="submit"
          value="Change Password"
        ></input>
      </form>
    </div>
  );
}
