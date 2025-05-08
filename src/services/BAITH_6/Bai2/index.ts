import axios from 'axios';

const API = 'http://localhost:3000';

export const getDiemDen = async () => {
    const res = await axios.get(`${API}/diem_den`);
    return res.data;
};

export const getLichTrinh = async () => {
    const res = await axios.get(`${API}/lich_trinh?_embed=diem_den_lich_trinh`);
    return res.data;
};

export const getDiemDenLichTrinh = async (lichTrinhId: string) => {
    const res = await axios.get(`${API}/diem_den_lich_trinh?lich_trinh_id=${lichTrinhId}&_sort=thu_tu`);
    return res.data;
};

export const addLichTrinh = async (data: any) => {
    const res = await axios.post(`${API}/lich_trinh`, data);
    return res.data;
};

export const updateLichTrinh = async (id: string, data: any) => {
    const res = await axios.put(`${API}/lich_trinh/${id}`, data);
    return res.data;
};

export const deleteLichTrinh = async (id: string) => {
    await axios.delete(`${API}/lich_trinh/${id}`);
};

export const addDiemDenLichTrinh = async (data: any) => {
    const res = await axios.post(`${API}/diem_den_lich_trinh`, data);
    return res.data;
};

export const updateDiemDenLichTrinh = async (id: string, data: any) => {
    const res = await axios.put(`${API}/diem_den_lich_trinh/${id}`, data);
    return res.data;
};

export const deleteDiemDenLichTrinh = async (id: string) => {
    await axios.delete(`${API}/diem_den_lich_trinh/${id}`);
};
