import axios from 'axios';

export const getLichTrinh = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/lich_trinh/${id}`);
  return res;
};

export const getNganSach = async (lichTrinhId: string) => {
  const res = await axios.get(`http://localhost:3000/ngan_sach?lich_trinh_id=${lichTrinhId}`);
  return res;
};

export const updateNganSach = async (id: string, soTien: number) => {
  const res = await axios.patch(`http://localhost:3000/ngan_sach/${id}`, { so_tien: soTien });
  return res;
};

export const addNganSach = async (hangMuc: NganSach.Record) => {
  const res = await axios.post('http://localhost:3000/ngan_sach', hangMuc);
  return res;
}; 