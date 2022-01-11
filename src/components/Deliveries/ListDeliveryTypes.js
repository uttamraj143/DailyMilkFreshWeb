import { useState } from "react";
import Paper from "@mui/material/Paper";
// import deleteIcon from "svgs/delete.svg";
import cancelIcon from "svgs/cancel.svg";
import editIcon from "svgs/pencil.svg";
import saveIcon from "svgs/save.svg";
import { updateDeliveryTypes } from "store/deliveries";

export default function ListDeliveryTypes(props) {
  const [singleDeliveryType, setDeliveryType] = useState(props.deliverytype);
  const [editing, setEdit] = useState(false);

  const editItem = (e, id) => {
    e.preventDefault();
    setEdit(id);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setDeliveryType(props.deliverytype);
    setEdit(false);
  };

  const handleChange = (e, no) => {
    e.preventDefault();

    switch (no) {
      case 1:
        return setDeliveryType({ ...singleDeliveryType, name: e.target.value });
      case 2:
        return setDeliveryType({
          ...singleDeliveryType,
          description: e.target.value,
        });
      default:
        return;
    }
  };

  //  DONT SHARE DELETE to Customer
  // c const deleteItem = (e) => {
  //   e.preventDefault();
  //   console.log("confirn");
  // };

  const saveHandle = (e) => {
    e.preventDefault();
    let data = {
      name: singleDeliveryType.name,
      description: singleDeliveryType.description,
    };
    updateDeliveryTypes(props.access_token, data, singleDeliveryType.id);
    setEdit(false);
  };

  return (
    <Paper className="Deliveries__types-container" elevation={2}>
      {editing === singleDeliveryType.id ? (
        <div>
          <input
            className="Deliveries__edit-input"
            onChange={(e) => handleChange(e, 1)}
            value={singleDeliveryType.name}
          />
          <input
            className="Deliveries__edit-input"
            onChange={(e) => handleChange(e, 2)}
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
          <>
            <img
              className="Deliveries__types-svg"
              src={saveIcon}
              alt="save"
              onClick={(e) => saveHandle(e)}
            ></img>
            <img
              className="Deliveries__types-svg"
              src={cancelIcon}
              alt="cancel"
              onClick={(e) => cancelEdit(e)}
            ></img>
          </>
        ) : (
          <>
            <img
              className="Deliveries__types-svg"
              onClick={(e) => editItem(e, singleDeliveryType.id)}
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
