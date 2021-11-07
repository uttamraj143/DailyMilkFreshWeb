import { useRef, useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";

export default function ExportData(props) {
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
      editable: true,
    },
    {
      field: "agent_name",
      headerName: "Agent name",
      width: 200,
      editable: true,
    },
    {
      field: "product",
      headerName: "Product Type",
      width: 140,
      editable: true,
    },
    {
      field: "delivery_type",
      headerName: "Delivery Type",
      description: "Delivery Type.",
      width: 120,
    },
    {
      field: "delivery_status",
      headerName: "Delivery Status",
      description: "Delivery Status.",
      width: 160,
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
    },
    {
      field: "modified_at",
      headerName: "Modified",
      description: "Delivery Type.",
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
        rows={props.orders}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
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
