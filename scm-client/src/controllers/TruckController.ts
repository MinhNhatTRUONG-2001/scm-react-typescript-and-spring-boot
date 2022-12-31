import { serverName } from './ServerConfig';

export async function getTruckData(): Promise<any> {
    const response = await fetch(serverName + "api/truck");
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.json();
    }
}

export async function postTruckData(licensePlate: string, name: string): Promise<any> {
    const jsonData = {
        "licensePlate": licensePlate,
        "name": name
    };
    const response = await fetch(serverName + "api/truck", {
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

export async function putTruckData(id: Number, licensePlate: string, name: string): Promise<any> {
    const jsonData = {
        "id": id,
        "licensePlate": licensePlate,
        "name": name
    };
    const response = await fetch(serverName + "api/truck", {
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

export async function deleteTruckById(id: Number): Promise<any> {
    const response = await fetch(serverName + `api/truck/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.status;
    }
}