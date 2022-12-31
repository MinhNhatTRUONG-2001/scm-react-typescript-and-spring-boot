import {useState, useEffect, FC} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowModel } from '@mui/x-data-grid';
import { Depo } from '../type/Depo';
import { deleteDepoById, postDepoData, putDepoData } from '../controllers/DepoController';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import React from 'react';

interface IDepoArray {
  depoArray: Array<Depo>,
  updateDepoArray: (depoArray: Array<Depo>) => void
}

const DepoDatagridComponent:FC<IDepoArray>= ({depoArray, updateDepoArray}) => {

  const [depo, setDepo] = useState({productName: "", warehouse1: 0, warehouse2: 0, warehouse3: 0});

  const inputChanged = (event: { target: { name: any; value: any; }; }) => {
    setDepo({...depo, [event.target.name]: event.target.value});
  }

  async function addDepo() {
    await postDepoData(depo.productName, depo.warehouse1, depo.warehouse2, depo.warehouse3)
      .catch(console.error)
      .then(response => {
        updateDepoArray([...depoArray, response]); //Add Depo to container's state
        console.log(JSON.stringify(response));
        setDepo({productName: "", warehouse1: 0, warehouse2: 0, warehouse3: 0});
    })
  }

  const updateDepo = React.useCallback(
    async (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      await putDepoData(newRow.id, newRow.productName, newRow.warehouse1, newRow.warehouse2, newRow.warehouse3)
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

    async function deleteDepoData() {
      if (window.confirm("Are you sure to delete this record?")) {
        //Make a DELETE request to the back-end application
        await deleteDepoById(id)
          .catch(console.error)
          .then(response => {
            console.log(JSON.stringify(response)) 
          });
        //Update front-end view; delete Depo from container's state
        const newDepoArray = depoArray.filter(depo => depo.id !== id);
        updateDepoArray(newDepoArray);
      }
    }

    return <Button variant="contained" color="error" onClick={deleteDepoData}>Delete</Button>;
  }

  useEffect(() => {
    updateDepoArray(depoArray);
  }, [depoArray])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      hide: true
    },
    {
      field: 'productName',
      headerName: 'Product Name',
      width: 150,
      editable: true,
    },
    {
      field: 'warehouse1',
      headerName: 'Warehouse 1',
      width: 150,
      editable: true,
    },
    {
        field: 'warehouse2',
        headerName: 'Warehouse 2',
        width: 150,
        editable: true,
      },
      {
        field: 'warehouse3',
        headerName: 'Warehouse 3',
        width: 150,
        editable: true,
      },
    {
      field: 'delete',
      headerName: 'Delete Depo',
      width: 150,
      sortable: false,
      renderCell: params => renderDeleteButton(params),
    }
  ];

  return (
    <div>
      <h3>Add Depo:</h3>
      <form onSubmit={addDepo}>
        <div>
          <TextField name="productName" value={depo.productName} label="Product Name" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
          <TextField type="number" inputProps={{min: 0}} name="warehouse1" value={depo.warehouse1} label="Warehouse 1" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
          <TextField type="number" inputProps={{min: 0}} name="warehouse2" value={depo.warehouse2} label="Warehouse 2" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
          <TextField type="number" inputProps={{min: 0}} name="warehouse3" value={depo.warehouse3} label="Warehouse 3" variant="outlined" color="primary" required onChange={inputChanged}/>
        </div>
        <br/>
        <Button type="submit" variant="contained" size="large">Add</Button>
      </form>
      {depoArray&&depoArray.length>0?(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={depoArray}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={updateDepo}
                onProcessRowUpdateError={(err) => console.log(err)}
            />
        </Box>
      ):(<h2>No data</h2>)}
    </div>
  );
}

export default DepoDatagridComponent;