import { serverName } from './ServerConfig';

export async function getDepartureData(): Promise<any> {
    const response = await fetch(serverName + "api/departure");
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.json();
    }
}

export async function postDepartureData(time: Date | null | undefined, unit: number, origin: string, destination: string): Promise<any> {
    const jsonData = {
        "time": time,
        "unit": unit,
        "origin": origin,
        "destination": destination
    };
    const response = await fetch(serverName + "api/departure", {
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

export async function putDepartureData(id: Number, time: Date, unit: number, origin: string, destination: string): Promise<any> {
    const jsonData = {
        "id": id,
        "time": time,
        "unit": unit,
        "origin": origin,
        "destination": destination
    };
    const response = await fetch(serverName + "api/departure", {
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

export async function deleteDepartureById(id: Number): Promise<any> {
    const response = await fetch(serverName + `api/departure/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.status;
    }
}