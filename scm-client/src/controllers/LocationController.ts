import { serverName } from './ServerConfig';

export async function getLocationData(): Promise<any>{
    const response = await fetch(serverName + "api/location")
    if(!response.ok){
        throw new Error(response.statusText);
    } else {
        return response.json();
    }
}

export async function postLocationData(no: Number, name: string, lat: Number, lon: Number, processingCost: Number, maxHrCap: Number, sla: Number): Promise<any> {
    const jsonData = {
        "no": no,
        "name": name,
        "lat": lat,
        "lon": lon,
        "processingCost": processingCost,
        "maxHrCap": maxHrCap,
        "sla": sla,
    };
    const response = await fetch(serverName + "api/location", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.json();
    }
}

export async function putLocationData(id: Number, no: Number, name: string, lat: Number, lon: Number, processingCost: Number, maxHrCap: Number, sla: Number): Promise<any> {
    const jsonData = {
        "id": id,
        "no": no,
        "name": name,
        "lat": lat,
        "lon": lon,
        "processingCost": processingCost,
        "maxHrCap": maxHrCap,
        "sla": sla,
    };
    const response = await fetch(serverName + "api/location", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.json();
    }
}

export async function deleteLocationById(id: Number): Promise<any> {
    const response = await fetch(serverName + `api/location/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.status;
    }
}