import { request } from 'umi';
import { Destination } from './typings';



export const fetchDestinations = async (): Promise<any[]> => {
    const response = await request('/api/diem_den', { method: 'GET' });
    return response.data || [];
};


export const addDestination = async (destination: Destination): Promise<void> => {
    return request('/api/diem_den', {
        method: 'POST',
        data: destination,
    });
};


export const updateDestination = async (destination: Destination): Promise<void> => {
    return request(`/api/diem_den/${destination.id}`, {
        method: 'PUT',
        data: destination,
    });
};


export const deleteDestination = async (id: string): Promise<void> => {
    return request(`/api/diem_den/${id}`, { method: 'DELETE' });
};