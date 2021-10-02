import { useState } from "react";
import { registerUser } from "store/user";

export default function AddAgent() {
  const [user, setUserProfile] = useState({
    name: "",
    email_id: "",
    phone_no: "",
    password: "",
    app_token: "",
  });

  const [user_type] = useState(2);

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
            placeholder="Name"
            onChange={(e) => setUserProfile({ ...user, name: e.target.value })}
            value={user.name}
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
