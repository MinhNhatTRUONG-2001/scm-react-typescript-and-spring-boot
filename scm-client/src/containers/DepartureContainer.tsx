import {FC, useEffect, useState} from 'react';
import DepartureDatagridComponent from '../components/DepartureDatagridComponent';
import { getDepartureData } from '../controllers/DepartureController';
import { Departure } from '../type/Departure';

const DepartureContainer:FC=() => {
  const [departureArray, setDepartureArray] = useState<Array<Departure>>([]);
  
  async function readDepartureData() {
    await getDepartureData()
    .catch(console.error)
    .then(response => {
        setDepartureArray(response);
        console.log(JSON.stringify(response));
    })
  }

  useEffect(() => {
      readDepartureData();
  },[])

  const updateDepartureArray = (departureArray: Array<Departure>):void => {
    setDepartureArray(departureArray);
  }

  return (
    <div>
        <h1>SCM Application - Departure</h1>
        <DepartureDatagridComponent departureArray={departureArray} updateDepartureArray={updateDepartureArray}/>
    </div>
  );
}

export default DepartureContainer;