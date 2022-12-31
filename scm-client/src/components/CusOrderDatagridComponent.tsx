import {useState, useEffect, FC} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowModel } from '@mui/x-data-grid';
import { CusOrder } from '../type/CusOrder';
import { deleteCusOrderById, postCusOrderData, putCusOrderData } from '../controllers/CusOrderController';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import React from 'react';

interface ICusOrderArray {
  cusOrderArray: Array<CusOrder>,
  updateCusOrderArray: (cusOrderArray: Array<CusOrder>) => void
}

const CusOrderDatagridComponent:FC<ICusOrderArray>= ({cusOrderArray, updateCusOrderArray}) => {

  const [cusOrder, setCusOrder] = useState({customer: "", productNo: 0, day: 0, hour: 0, airGround: 0, noOfPackages: 0, weight: 0, cube: 0});

  const inputChanged = (event: { target: { name: any; value: any; }; }) => {
    setCusOrder({...cusOrder, [event.target.name]: event.target.value});
  }

  async function addCusOrder() {
    await postCusOrderData(cusOrder.customer, cusOrder.productNo, cusOrder.day, cusOrder.hour, cusOrder.airGround, cusOrder.noOfPackages, cusOrder.weight, cusOrder.cube)
      .catch(console.error)
      .then(response => {
        updateCusOrderArray([...cusOrderArray, response]); //Add CusOrder to container's state
        console.log(JSON.stringify(response));
        setCusOrder({customer: "", productNo: 0, day: 0, hour: 0, airGround: 0, noOfPackages: 0, weight: 0, cube: 0});
    })
  }

  const updateCusOrder = React.useCallback(
    async (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      await putCusOrderData(newRow.id, newRow.customer, newRow.productNo, newRow.day, newRow.hour, newRow.airGround, newRow.noOfPackages, newRow.weight, newRow.cube)
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

    async function deleteCusOrderData() {
      if (window.confirm("Are you sure to delete this record?")) {
        //Make a DELETE request to the back-end application
        await deleteCusOrderById(id)
          .catch(console.error)
          .then(response => {
            console.log(JSON.stringify(response)) 
          });
        //Update front-end view; delete CusOrder from container's state
        const newCusOrderArray = cusOrderArray.filter(cusOrder => cusOrder.id !== id);
        updateCusOrderArray(newCusOrderArray);
      }
    }

    return <Button variant="contained" color="error" onClick={deleteCusOrderData}>Delete</Button>;
  }

  useEffect(() => {
    updateCusOrderArray(cusOrderArray);
  }, [cusOrderArray])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      hide: true
    },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 150,
      editable: true,
    },
    {
        field: 'productNo',
        headerName: 'Product No.',
        width: 150,
        editable: true,
    },
    {
      field: 'day',
      headerName: 'Day',
      width: 150,
      editable: true,
    },
    {
        field: 'hour',
        headerName: 'Hour',
        width: 150,
        editable: true,
    },
    {
        field: 'airGround',
        headerName: 'Air Ground',
        width: 150,
        editable: true,
    },
    {
        field: 'noOfPackages',
        headerName: 'Number of Packages',
        width: 150,
        editable: true,
    },
    {
        field: 'weight',
        headerName: 'Weight',
        width: 150,
        editable: true,
    },
    {
      field: 'cube',
      headerName: 'Cube',
      width: 150,
      editable: true,
    },
    {
      field: 'delete',
      headerName: 'Delete CusOrder',
      width: 150,
      sortable: false,
      renderCell: params => renderDeleteButton(params),
    }
  ];

  return (
    <div>
      <h3>Add CusOrder:</h3>
      <form onSubmit={addCusOrder}>
        <div>
          <TextField name="customer" value={cusOrder.customer} label="Customer" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
          <TextField type="number" inputProps={{min: 0}} name="productNo" value={cusOrder.productNo} label="Product No." variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
          <TextField type="number" inputProps={{min: 0}} name="day" value={cusOrder.day} label="Day" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
          <TextField type="number" inputProps={{min: 0}} name="hour" value={cusOrder.hour} label="Hour" variant="outlined" color="primary" required onChange={inputChanged}/>
          <br/><br/>
          <TextField type="number" inputProps={{min: 0}} name="airGround" value={cusOrder.airGround} label="Air Ground" variant="outlined" color="secondary" required onChange={inputChanged}/>{" "}
          <TextField type="number" inputProps={{min: 0}} name="noOfPackages" value={cusOrder.noOfPackages} label="Number of Packages" variant="outlined" color="secondary" required onChange={inputChanged}/>{" "}
          <TextField type="number" inputProps={{step: "any"}} name="weight" value={cusOrder.weight} label="Weight" variant="outlined" color="secondary" required onChange={inputChanged}/>{" "}
          <TextField type="number" inputProps={{step: "any"}} name="cube" value={cusOrder.cube} label="Cube" variant="outlined" color="secondary" required onChange={inputChanged}/>
        </div>
        <br/>
        <Button type="submit" variant="contained" size="large">Add</Button>
      </form>
      {cusOrderArray&&cusOrderArray.length>0?(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={cusOrderArray}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={updateCusOrder}
                onProcessRowUpdateError={(err) => console.log(err)}
            />
        </Box>
      ):(<h2>No data</h2>)}
    </div>
  );
}

export default CusOrderDatagridComponent;