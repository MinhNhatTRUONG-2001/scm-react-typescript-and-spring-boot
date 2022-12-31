import {FC, useEffect, useState} from 'react';
import CusOrderDatagridComponent from '../components/CusOrderDatagridComponent';
import { getCusOrderData } from '../controllers/CusOrderController';
import { CusOrder } from '../type/CusOrder';

const CusOrderContainer:FC=() => {
  const [cusOrderArray, setCusOrderArray] = useState<Array<CusOrder>>([]);
  
  async function readCusOrderData() {
    await getCusOrderData()
    .catch(console.error)
    .then(response => {
        setCusOrderArray(response);
        console.log(JSON.stringify(response));
    })
  }

  useEffect(() => {
      readCusOrderData();
  },[])

  const updateCusOrderArray = (cusOrderArray: Array<CusOrder>):void => {
    setCusOrderArray(cusOrderArray);
  }

  return (
    <div>
        <h1>SCM Application - Customer Order</h1>
        <CusOrderDatagridComponent cusOrderArray={cusOrderArray} updateCusOrderArray={updateCusOrderArray}/>
    </div>
  );
}

export default CusOrderContainer;