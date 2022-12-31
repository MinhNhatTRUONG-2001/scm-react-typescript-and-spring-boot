import {FC, useEffect, useState} from 'react';
import TruckDatagridComponent from '../components/TruckDatagridComponent';
import { getTruckData } from '../controllers/TruckController';
import { Truck } from '../type/Truck';

const TruckContainer:FC=() => {
  const [truckArray, setTruckArray] = useState<Array<Truck>>([]);
  
  async function readTruckData() {
    await getTruckData()
    .catch(console.error)
    .then(response => {
        setTruckArray(response);
        console.log(JSON.stringify(response));
    })
  }

  useEffect(() => {
      readTruckData();
  },[])

  const updateTruckArray = (truckArray: Array<Truck>):void => {
    setTruckArray(truckArray);
  }

  return (
    <div>
        <h1>SCM Application - Truck</h1>
        <TruckDatagridComponent truckArray={truckArray} updateTruckArray={updateTruckArray}/>
    </div>
  );
}

export default TruckContainer;