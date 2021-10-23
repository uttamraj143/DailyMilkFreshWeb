import { useState } from "react";
import Paper from "@mui/material/Paper";
// import deleteIcon from "components/svgs/delete.svg";
import editIcon from "components/svgs/pencil.svg";
import saveIcon from "components/svgs/save.svg";

export default function ListDeliveryTypes(props) {
  const [editing, setEdit] = useState(false);

  const editItem = (e, id) => {
    e.preventDefault();
    setEdit(id);
  };

  // const deleteItem = (e) => {
  //   e.preventDefault();
  //   console.log("confirn");
  // };

  const saveHandle = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  return (
    <>
      {props.deliverytotal.map((item, index) => {
        return (
          <Paper
            key={index}
            className="Deliveries__types-container"
            elevation={2}
          >
            {editing === item.id ? (
              <div>
                <input
                  className="Deliveries__edit-input"
                  onChange={editItem}
                  value={item.name}
                />
                <input
                  className="Deliveries__edit-input"
                  onChange={editItem}
                  value={item.description}
                />
              </div>
            ) : (
              <div className="Deliveries__types-container">
                {item.name} : {item.description}
              </div>
            )}

            <div className="Deliveries__types-container-img">
              {editing === item.id ? (
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
                    onClick={(e) => editItem(e, item.id)}
                    src={editIcon}
                    alt="delete"
                  ></img>
                  {/* <img
        className="Deliveries__types-svg"
        onClick={(e) => deleteItem(e, item.id)}
        src={deleteIcon}
        alt="delete"
      ></img> */}
                </>
              )}
            </div>
          </Paper>
        );
      })}
    </>
  );
}
