import { serverName } from './ServerConfig';

export async function getDepoData(): Promise<any> {
    const response = await fetch(serverName + "api/depo");
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.json();
    }
}

export async function postDepoData(productName: string, warehouse1: number, warehouse2: number, warehouse3: number): Promise<any> {
    const jsonData = {
        "productName": productName,
        "warehouse1": warehouse1,
        "warehouse2": warehouse2,
        "warehouse3": warehouse3
    };
    const response = await fetch(serverName + "api/depo", {
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

export async function putDepoData(id: Number, productName: string, warehouse1: number, warehouse2: number, warehouse3: number): Promise<any> {
    const jsonData = {
        "id": id,
        "productName": productName,
        "warehouse1": warehouse1,
        "warehouse2": warehouse2,
        "warehouse3": warehouse3
    };
    const response = await fetch(serverName + "api/depo", {
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

export async function deleteDepoById(id: Number): Promise<any> {
    const response = await fetch(serverName + `api/depo/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.status;
    }
}