import { useRef, useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";

export default function HistoryTable(props) {
  const [selectPage, setSelection] = useState([]);
  const nodeRef = useRef(null);

  function CustomToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user_name",
      headerName: "Customer name",
      width: 200,
    },
    // {
    //   field: "agent_name",
    //   headerName: "Agent name",
    //   width: 200,
    // },
    {
      field: "product",
      headerName: "Product",
      width: 140,
    },
    {
      field: "delivery_type",
      headerName: "Delivery Type",
      description: "Delivery Type.",
      width: 120,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      description: "Delivery Type.",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      description: "Price.",
      width: 100,
      editable: true,
    },
    {
      field: "delivered_at",
      headerName: "Delivered",
      description: "Delivery Time.",
      width: 200,
    },
  ];

  const handleRowSelection = (e) => {
    setSelection(e.selectionModel);
  };

  useEffect(() => {
    console.info(selectPage, "export_page number"); // <-- The state is updated
  }, [selectPage]);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        nodeRef={nodeRef}
        rows={props.historyData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        // checkboxSelection
        onSelectionModelChange={handleRowSelection}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
