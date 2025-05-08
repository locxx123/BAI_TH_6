import React, { useEffect } from 'react';
import { Row, Col, Alert, Typography } from 'antd';
import { useModel } from 'umi';
import BudgetSummaryForm from './BudgetSummaryForm';
import ChartForm from './ChartForm';
import TableForm from './TableForm';
import styles from './style.less';

const { Title } = Typography;

const QuanLyNganSach: React.FC = () => {
  const { nganSach, lichTrinh, loading, fetchData } = useModel('BAITH_6.bai3');

  useEffect(() => {
    // Trong thực tế, sẽ lấy lichTrinhId từ param URL hoặc từ context
    const lichTrinhId = "a57d0c0f-1b8a-4747-b233-3db9519eab57";
    fetchData(lichTrinhId);
  }, []);

  // Tính tổng số tiền đã chi
  const tongSoTienDaChi = nganSach.reduce((sum:any, item) => sum + item.so_tien, 0);
  
  // Kiểm tra vượt ngân sách
  const vuotNganSach = lichTrinh && (tongSoTienDaChi > lichTrinh.tong_ngan_sach);
  
  // Tỷ lệ chi tiêu so với tổng ngân sách
  const percentSpent = lichTrinh ? Math.round((tongSoTienDaChi / lichTrinh.tong_ngan_sach) * 100) : 0;
  
  // Dữ liệu cho biểu đồ tròn
  const chartData = nganSach.map(item => ({
    name: item.loai,
    value: item.so_tien,
    hanMuc: item.han_muc
  }));

  return (
    <div className={styles.container}>
      <Title level={2}>Quản lý ngân sách</Title>
      {lichTrinh && (
        <Title level={4}>{lichTrinh.ten} ({lichTrinh.ngay_bat_dau} - {lichTrinh.ngay_ket_thuc})</Title>
      )}

      {vuotNganSach && (
        <Alert
          message="Cảnh báo vượt ngân sách!"
          description={`Tổng chi phí hiện tại (${tongSoTienDaChi.toLocaleString()} VNĐ) đã vượt quá tổng ngân sách (${lichTrinh?.tong_ngan_sach.toLocaleString()} VNĐ).`}
          type="error"
          showIcon
          className={styles.alertWarning}
        />
      )}

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <BudgetSummaryForm 
            tongSoTienDaChi={tongSoTienDaChi} 
            tongNganSach={lichTrinh?.tong_ngan_sach || 0}
            percentSpent={percentSpent}
            loading={loading}
          />
        </Col>

        <Col xs={24} md={16}>
          <ChartForm data={chartData} loading={loading} />
        </Col>
      </Row>

      <TableForm nganSach={nganSach} loading={loading} />
    </div>
  );
};

export default QuanLyNganSach;