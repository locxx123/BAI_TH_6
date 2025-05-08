import { request } from 'umi';
import { Statistics } from './typing';



export const fetchStatistics = async (): Promise<any[]> => {
    const response = await request('/api/thong_ke', { method: 'GET' });
    return response.data || [];
};