import { useState,useEffect, FC } from "react";
import LocationDatagridComponent from "../components/LocationDatagridComponent";
import { getLocationData } from "../controllers/LocationController";
import { Location } from "../type/Location";


const LocationContainer:FC=()=>{

    const [locationArray, setLocationArray] = useState<Array<Location>>([]);

    async function readLocationData() {
        await getLocationData()
        .catch(console.error)
        .then(response => {
            setLocationArray(response);
            console.log(JSON.stringify(response));
        })
      }

    useEffect(()=>{
        readLocationData();
    },[]);

    const updateLocationArray = (locationArray: Array<Location>):void => {
        setLocationArray(locationArray);
      }

    return(
        <div>
            <h1>SCM Application - Location</h1>
            <LocationDatagridComponent locationArray={locationArray} updateLocationArray={updateLocationArray} />
        </div>
    )
}
export default LocationContainer;