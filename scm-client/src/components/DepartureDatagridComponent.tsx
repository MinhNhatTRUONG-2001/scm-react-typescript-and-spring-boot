import {useState, useEffect, FC} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowModel } from '@mui/x-data-grid';
import { Departure } from '../type/Departure';
import { deleteDepartureById, postDepartureData, putDepartureData } from '../controllers/DepartureController';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface IDepartureArray {
  departureArray: Array<Departure>,
  updateDepartureArray: (departureArray: Array<Departure>) => void
}

const DepartureDatagridComponent:FC<IDepartureArray>= ({departureArray, updateDepartureArray}) => {

  const [initialTime, setInitialTime] = useState<Date | null>(new Date());
  const [departure, setDeparture] = useState({time: initialTime, unit: 0, origin: "", destination: ""});

  const inputChanged = (event: { target: { name: any; value: any; }; }) => {
    setDeparture({...departure, [event.target.name]: event.target.value});
  }

  async function addDeparture() {
    await postDepartureData(departure.time, departure.unit, departure.origin, departure.destination)
      .catch(console.error)
      .then(response => {
        updateDepartureArray([...departureArray, response]); //Add Departure to container's state
        console.log(JSON.stringify(response));
        setDeparture({time: initialTime, unit: 0, origin: "", destination: ""});
    })
  }

  const updateDeparture = React.useCallback(
    async (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      await putDepartureData(newRow.id, newRow.time, newRow.unit, newRow.origin, newRow.destination)
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

    async function deleteDepartureData() {
      if (window.confirm("Are you sure to delete this record?")) {
        //Make a DELETE request to the back-end application
        await deleteDepartureById(id)
          .catch(console.error)
          .then(response => {
            console.log(JSON.stringify(response)) 
          });
        //Update front-end view; delete Departure from container's state
        const newDepartureArray = departureArray.filter(departure => departure.id !== id);
        updateDepartureArray(newDepartureArray);
      }
    }

    return <Button variant="contained" color="error" onClick={deleteDepartureData}>Delete</Button>;
  }

  useEffect(() => {
    updateDepartureArray(departureArray);
  }, [departureArray])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      hide: true
    },
    {
      field: 'time',
      headerName: 'Time',
      type: 'dateTime',
      width: 200,
      editable: true,
      valueFormatter: params => dayjs(params?.value).format("DD/MM/YYYY hh:mm A")
    },
    {
      field: 'unit',
      headerName: 'Unit',
      width: 100,
      editable: true,
    },
    {
        field: 'origin',
        headerName: 'Origin',
        width: 150,
        editable: true,
    },
    {
        field: 'destination',
        headerName: 'Destination',
        width: 150,
        editable: true,
    },
    {
      field: 'delete',
      headerName: 'Delete Departure',
      width: 150,
      sortable: false,
      renderCell: params => renderDeleteButton(params),
    }
  ];

  const handleChange = (newTime: Date | null) => {
    setDeparture({...departure, time: newTime});
  };

  return (
    <div>
      <h3>Add Departure:</h3>
      <form onSubmit={addDeparture}>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="Time" value={departure.time} onChange={handleChange} renderInput={(params) => <TextField name="time" variant="outlined" color="primary" required {...params} />} />{" "}
        </LocalizationProvider>
          <TextField type="number" inputProps={{min: 0}} name="unit" value={departure.unit} label="Unit" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
          <TextField name="origin" value={departure.origin} label="Origin" variant="outlined" color="primary" required onChange={inputChanged}/>{" "}
          <TextField name="destination" value={departure.destination} label="Destination" variant="outlined" color="primary" required onChange={inputChanged}/>
        </div>
        <br/>
        <Button type="submit" variant="contained" size="large">Add</Button>
      </form>
      {departureArray&&departureArray.length>0?(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={departureArray}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={updateDeparture}
                onProcessRowUpdateError={(err) => console.log(err)}
            />
        </Box>
      ):(<h2>No data</h2>)}
    </div>
  );
}

export default DepartureDatagridComponent;