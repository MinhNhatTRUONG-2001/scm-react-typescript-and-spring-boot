import {FC, useEffect, useState} from 'react';
import DepoDatagridComponent from '../components/DepoDatagridComponent';
import { getDepoData } from '../controllers/DepoController';
import { Depo } from '../type/Depo';

const DepoContainer:FC=() => {
  const [depoArray, setDepoArray] = useState<Array<Depo>>([]);
  
  async function readDepoData() {
    await getDepoData()
    .catch(console.error)
    .then(response => {
        setDepoArray(response);
        console.log(JSON.stringify(response));
    })
  }

  useEffect(() => {
      readDepoData();
  },[])

  const updateDepoArray = (depoArray: Array<Depo>):void => {
    setDepoArray(depoArray);
  }

  return (
    <div>
        <h1>SCM Application - Depo</h1>
        <DepoDatagridComponent depoArray={depoArray} updateDepoArray={updateDepoArray}/>
    </div>
  );
}

export default DepoContainer;