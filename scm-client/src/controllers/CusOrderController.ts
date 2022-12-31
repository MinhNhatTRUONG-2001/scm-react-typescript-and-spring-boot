import { serverName } from './ServerConfig';

export async function getCusOrderData(): Promise<any> {
    const response = await fetch(serverName + "api/cus_order");
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.json();
    }
}

export async function postCusOrderData(customer: string, productNo: number, day: number, hour: number, airGround: number, noOfPackages: number, weight: number, cube: number): Promise<any> {
    const jsonData = {
        "customer": customer,
        "productNo": productNo,
        "day": day,
        "hour": hour,
        "airGround": airGround,
        "noOfPackages": noOfPackages,
        "weight": weight,
        "cube": cube
    };
    const response = await fetch(serverName + "api/cus_order", {
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

export async function putCusOrderData(id: Number, customer: string, productNo: number, day: number, hour: number, airGround: number, noOfPackages: number, weight: number, cube: number): Promise<any> {
    const jsonData = {
        "id": id,
        "customer": customer,
        "productNo": productNo,
        "day": day,
        "hour": hour,
        "airGround": airGround,
        "noOfPackages": noOfPackages,
        "weight": weight,
        "cube": cube
    };
    const response = await fetch(serverName + "api/cus_order", {
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

export async function deleteCusOrderById(id: Number): Promise<any> {
    const response = await fetch(serverName + `api/cus_order/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error(response.statusText);
    } else {
        return response.status;
    }
}