import {useState, useEffect, FC } from "react";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowModel } from '@mui/x-data-grid';
import { Location } from "../type/Location";
import { postLocationData, deleteLocationById, putLocationData } from "../controllers/LocationController";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";

interface ILocationArray {
  locationArray: Array<Location>,
  updateLocationArray: (locationArray: Array<Location>) => void
}

const LocationDatagridComponent:FC<ILocationArray>=({locationArray, updateLocationArray})=>{
  const [location, setLocation] = useState({no: 0, name: "", lat: 0, lon: 0, processingCost: 0, maxHrCap: 0, sla: 0});

  const inputChanged = (event: { target: { name: any; value: any; }; }) => {
    setLocation({...location, [event.target.name]: event.target.value});
  }

  async function addLocation() {
    await postLocationData(location.no, location.name, location.lat, location.lon, location.processingCost, location.maxHrCap, location.sla)
      .catch(console.error)
      .then(response => {
        updateLocationArray([...locationArray, response]);
        console.log(JSON.stringify(response));
        setLocation({no: 0, name: "", lat: 0, lon: 0, processingCost: 0, maxHrCap: 0, sla: 0});
    })
  }

  const updateLocation = React.useCallback(
    async (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      await putLocationData(newRow.id, newRow.no, newRow.name, newRow.lat, newRow.lon, newRow.processingCost, newRow.maxHrCap, newRow.sla)
        .catch(console.error)
        .then(response => {
          console.log(JSON.stringify(response));
      })
      return updatedRow;
    },
    [] //Add something for second argument since useCallback requires this :)
  );
  
  const renderDeleteButton = (params: GridRenderCellParams<any, any, any>) => {
    //Get id from the selected row
    const {row} = params;
    const id = row.id;
  
    async function deleteLocationData() {
      if (window.confirm("Are you sure to delete this record?")) {
        //Make a DELETE request to the back-end application
        await deleteLocationById(id)
          .catch(console.error)
          .then(response => {
            console.log(JSON.stringify(response)) 
          });
        //Update front-end view
        const newLocationArray = locationArray.filter(location => location.id !== id);
        updateLocationArray(newLocationArray);
      }
    }
  
    return <Button variant="contained" color="error" onClick={deleteLocationData}>Delete</Button>;
  }

  useEffect(() => {
    updateLocationArray(locationArray);
  }, [locationArray])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      hide: true
    },
    {
      field: 'no',
      headerName: 'No.',
      width: 100,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'lat',
      headerName: 'Latitude',
      width: 100,
      editable: true,
    },
    {
      field: 'lon',
      headerName: 'Longitude',
      width: 100,
      editable: true,
    },
    {
      field: 'processingCost',
      headerName: 'Processing Cost',
      width: 150,
      editable: true,
    },
    {
      field: 'maxHrCap',
      headerName: 'Max Hr Cap',
      width: 100,
      editable: true,
    },
    {
      field: 'sla',
      headerName: 'SLA',
      width: 100,
      editable: true,
    },
    {
      field: 'delete',
      headerName: 'Delete Location',
      width: 150,
      sortable: false,
      renderCell: params => renderDeleteButton(params),
    }
  ];

    return(
      <div>
        <h3>Add location:</h3>
        <form onSubmit={addLocation}>
          <div>
            <TextField type="number" inputProps={{min: 0}} name="no" value={location.no} label="No." variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
            <TextField name="name" value={location.name} label="Name" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
            <TextField type="number" inputProps={{step: "any"}} name="lat" value={location.lat} label="Latitude" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
            <TextField type="number" inputProps={{step: "any"}} name="lon" value={location.lon} label="Longitude" variant="outlined" color="primary" required onChange={inputChanged}/>
            <br/><br/>
            <TextField type="number" inputProps={{step: "any"}} name="processingCost" value={location.processingCost} label="Processing Cost" variant="outlined" color="secondary" required onChange={inputChanged}/>{" "}
            <TextField type="number" inputProps={{step: "any"}} name="maxHrCap" value={location.maxHrCap} label="Max Hr Cap" variant="outlined" color="secondary" required onChange={inputChanged}/>{" "}
            <TextField type="number" inputProps={{step: "any"}} name="sla" value={location.sla} label="SLA" variant="outlined" color="secondary" required onChange={inputChanged}/>{" "}
          </div>
          <br/>
          <Button type="submit" variant="contained" size="large">Add</Button>
        </form>
        {locationArray&&locationArray.length>0?(
          <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                  rows={locationArray}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  processRowUpdate={updateLocation}
                  onProcessRowUpdateError={(err) => console.log(err)}
              />
          </Box>
        ):(<h2>No data</h2>)}
      </div>
    )
}
export default LocationDatagridComponent;