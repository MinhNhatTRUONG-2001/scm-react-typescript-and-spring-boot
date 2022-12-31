import {useState, useEffect, FC} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowModel } from '@mui/x-data-grid';
import { Truck } from '../type/Truck';
import { deleteTruckById, postTruckData, putTruckData } from '../controllers/TruckController';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import React from 'react';

interface ITruckArray {
  truckArray: Array<Truck>,
  updateTruckArray: (truckArray: Array<Truck>) => void
}

const TruckDatagridComponent:FC<ITruckArray>= ({truckArray, updateTruckArray}) => {

  const [truck, setTruck] = useState({licensePlate: "", name: ""});

  const inputChanged = (event: { target: { name: any; value: any; }; }) => {
    setTruck({...truck, [event.target.name]: event.target.value});
  }

  async function addTruck() {
    await postTruckData(truck.licensePlate, truck.name)
      .catch(console.error)
      .then(response => {
        updateTruckArray([...truckArray, response]); //Add truck to container's state
        console.log(JSON.stringify(response));
        setTruck({licensePlate: "", name: ""});
    })
  }

  const updateTruck = React.useCallback(
    async (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      await putTruckData(newRow.id, newRow.licensePlate, newRow.name)
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

    async function deleteTruckData() {
      if (window.confirm("Are you sure to delete this record?")) {
        //Make a DELETE request to the back-end application
        await deleteTruckById(id)
          .catch(console.error)
          .then(response => {
            console.log(JSON.stringify(response)) 
          });
        //Update front-end view; delete truck from container's state
        const newTruckArray = truckArray.filter(truck => truck.id !== id);
        updateTruckArray(newTruckArray);
      }
    }

    return <Button variant="contained" color="error" onClick={deleteTruckData}>Delete</Button>;
  }

  useEffect(() => {
    updateTruckArray(truckArray);
  }, [truckArray])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      hide: true
    },
    {
      field: 'licensePlate',
      headerName: 'License Plate',
      width: 150,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'delete',
      headerName: 'Delete Truck',
      width: 150,
      sortable: false,
      renderCell: params => renderDeleteButton(params),
    }
  ];

  return (
    <div>
      <h3>Add truck:</h3>
      <form onSubmit={addTruck}>
        <div>
          <TextField name="licensePlate" value={truck.licensePlate} label="License Plate" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
          <TextField name="name" value={truck.name} label="Name" variant="outlined" color="primary" required onChange={inputChanged}/>
        </div>
        <br/>
        <Button type="submit" variant="contained" size="large">Add</Button>
      </form>
      {truckArray&&truckArray.length>0?(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={truckArray}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={updateTruck}
                onProcessRowUpdateError={(err) => console.log(err)}
            />
        </Box>
      ):(<h2>No data</h2>)}
    </div>
  );
}

export default TruckDatagridComponent;