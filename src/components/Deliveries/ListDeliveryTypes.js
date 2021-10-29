import { useState } from "react";
import Paper from "@mui/material/Paper";
// import deleteIcon from "components/svgs/delete.svg";
import editIcon from "components/svgs/pencil.svg";
import saveIcon from "components/svgs/save.svg";

export default function ListDeliveryTypes(props) {
  const [singleDeliveryType, setDeliveryType] = useState(props.deliverytype);
  const [editing, setEdit] = useState(false);

  const editItem = (e, id) => {
    e.preventDefault();
    setEdit(id);
  };

  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.value;
    console.log(name);
  };

  //  DONT SHARE DELETE to Customer
  // c const deleteItem = (e) => {
  //   e.preventDefault();
  //   console.log("confirn");
  // };

  const saveHandle = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  return (
    <Paper className="Deliveries__types-container" elevation={2}>
      {editing === singleDeliveryType.id ? (
        <div>
          <input
            className="Deliveries__edit-input"
            onChange={(e) => handleChange(e)}
            value={singleDeliveryType.name}
          />
          <input
            className="Deliveries__edit-input"
            onChange={(e) => handleChange(e)}
            value={singleDeliveryType.description}
          />
        </div>
      ) : (
        <div className="Deliveries__types-container">
          {singleDeliveryType.name} : {singleDeliveryType.description}
        </div>
      )}

      <div className="Deliveries__types-container-img">
        {editing === singleDeliveryType.id ? (
          <img
            className="Deliveries__types-svg"
            src={saveIcon}
            alt="save"
            onClick={saveHandle}
          ></img>
        ) : (
          <>
            <img
              className="Deliveries__types-svg"
              onClick={((e) => editItem, singleDeliveryType.id)}
              src={editIcon}
              alt="delete"
            ></img>
            {/* <img
        className="Deliveries__types-svg"
        onClick={(e) => deleteItem(e, singleDeliveryType.id)}
        src={deleteIcon}
        alt="delete"
      ></img> */}
          </>
        )}
      </div>
    </Paper>
  );
}
