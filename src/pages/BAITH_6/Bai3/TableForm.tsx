import React from 'react';
import { Card, Table, Tag, Progress, Typography } from 'antd';
import styles from './style.less';

const { Text } = Typography;

const TableForm: React.FC<NganSach.TableFormProps> = ({ nganSach, loading }) => {
  const columns = [
    {
      title: 'Loại chi phí',
      dataIndex: 'loai',
      key: 'loai',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Hạn mức (VNĐ)',
      dataIndex: 'han_muc',
      key: 'han_muc',
      render: (value: number) => <span>{value.toLocaleString()} VNĐ</span>,
    },
    {
      title: 'Đã chi (VNĐ)',
      dataIndex: 'so_tien',
      key: 'so_tien',
      render: (value: number) => <span>{value.toLocaleString()} VNĐ</span>,
    },
    {
      title: 'Trạng thái',
      key: 'trang_thai',
      render: (_: any, record: NganSach.Record) => (
        <Tag color={record.so_tien > record.han_muc ? 'error' : 'success'}>
          {record.so_tien > record.han_muc ? 'Vượt hạn mức' : 'Trong hạn mức'}
        </Tag>
      ),
    },
    {
      title: 'Tiến độ',
      key: 'tien_do',
      render: (_: any, record: NganSach.Record) => (
        <Progress 
          percent={Math.round((record.so_tien / record.han_muc) * 100)} 
          status={record.so_tien > record.han_muc ? 'exception' : 'normal'}
          strokeColor={record.so_tien > record.han_muc ? '#f5222d' : '#1890ff'}
        />
      ),
    },
  ];

  return (
    <Card title="Chi tiết ngân sách" style={{ marginTop: 24 }} loading={loading}>
      <Table
        dataSource={nganSach}
        columns={columns}
        rowKey="id"
        pagination={false}
        expandable={{
          expandedRowRender: (record: NganSach.Record) => (
            <div className={styles.expandedRow}>
              <Text>Chi tiết chi phí {record.loai}</Text>
              <Progress
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': record.so_tien > record.han_muc ? '#f5222d' : '#87d068',
                }}
                percent={Math.round((record.so_tien / record.han_muc) * 100)}
                status={record.so_tien > record.han_muc ? 'exception' : 'normal'}
              />
              <div style={{ marginTop: 8 }}>
                <Text>
                  {record.so_tien > record.han_muc
                    ? `Vượt ${(record.so_tien - record.han_muc).toLocaleString()} VNĐ (${Math.round(((record.so_tien - record.han_muc) / record.han_muc) * 100)}%)`
                    : `Còn lại ${(record.han_muc - record.so_tien).toLocaleString()} VNĐ (${Math.round(((record.han_muc - record.so_tien) / record.han_muc) * 100)}%)`}
                </Text>
              </div>
            </div>
          ),
        }}
      />
    </Card>
  );
};

export default TableForm;
