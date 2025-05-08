import { useState, useCallback } from 'react';
import { getLichTrinh, getNganSach, updateNganSach, addNganSach } from '../../services/BAITH_6/Bai3';

export default () => {
  const [nganSach, setNganSach] = useState<NganSach.Record[]>([]);
  const [lichTrinh, setLichTrinh] = useState<NganSach.LichTrinh | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (lichTrinhId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const lichTrinhRes = await getLichTrinh(lichTrinhId);
      const nganSachRes = await getNganSach(lichTrinhId);
      
      setLichTrinh(lichTrinhRes.data);
      setNganSach(nganSachRes.data);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, []);

  const capNhatNganSach = useCallback(async (id: string, soTien: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await updateNganSach(id, soTien);
      
      setNganSach(prev => prev.map(item => (item.id === id ? response.data : item)));
      
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi cập nhật ngân sách');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const themHangMucNganSach = useCallback(async (hangMuc: NganSach.Record) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await addNganSach(hangMuc);
      
      setNganSach(prev => [...prev, response.data]);
      
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi thêm hạng mục ngân sách');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    nganSach,
    lichTrinh,
    loading,
    error,
    fetchData,
    capNhatNganSach,
    themHangMucNganSach,
  };
}; 