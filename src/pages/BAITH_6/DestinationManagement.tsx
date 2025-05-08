import React, { useEffect, useState } from 'react';
import { Table, Button, Form, message, Row, Col, Card, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import DestinationFormModal from './DestinationFormModal';
import styles from './DestinationManagement.less';

const DestinationManagement: React.FC = () => {
    const {
        destinations,
        loadDestinations,
        deleteDestinationFromModel,
        isModalVisible,
        setIsModalVisible,
        editingDestination,
        setEditingDestination,
        form,
        handleFinish
    } = useModel('BAITH_6.Bai4.destinations');

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        loadDestinations();

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cấu hình responsive cho bảng
    const getResponsiveColumns = () => {
        const columns = [
            { title: 'Tên', dataIndex: 'ten', key: 'ten' },
            { title: 'Vị trí', dataIndex: 'vi_tri', key: 'vi_tri' },
            { title: 'Loại', dataIndex: 'loai', key: 'loai' },
            { title: 'Mức giá', dataIndex: 'muc_gia', key: 'muc_gia' },
            { title: 'Rating', dataIndex: 'rating', key: 'rating' },
            {
                title: 'Hành động',
                key: 'action',
                render: (record: any) => (
                    <Space>
                        <Button onClick={() => { setEditingDestination(record); setIsModalVisible(true); }}>Sửa</Button>
                        <Button danger onClick={() => deleteDestinationFromModel(record.id)}>Xóa</Button>
                    </Space>
                ),
            },
        ];

        // Nếu màn hình nhỏ, chỉ hiển thị các cột quan trọng
        if (width < 768) {
            return [
                columns[0], // Tên
                columns[2], // Loại
                columns[5], // Hành động
            ];
        }

        // Màn hình trung bình
        if (width < 992) {
            return [
                columns[0], // Tên
                columns[1], // Vị trí
                columns[2], // Loại
                columns[5], // Hành động
            ];
        }

        // Màn hình lớn hiển thị đầy đủ
        return columns;
    };

    return (
        <div className={styles.destinationManagement}>
            <Card className={styles.actionCard}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <h2>Quản lý điểm đến</h2>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => { setEditingDestination(null); setIsModalVisible(true); }}
                        >
                            {width > 576 ? 'Thêm điểm đến' : 'Thêm'}
                        </Button>
                    </Col>
                </Row>
            </Card>

            <Card className={styles.tableCard}>
                <Table
                    columns={getResponsiveColumns()}
                    dataSource={Array.isArray(destinations) ? destinations : []}
                    rowKey="id"
                    scroll={{ x: true }}
                    pagination={{
                        responsive: true,
                        pageSize: width < 768 ? 5 : 10
                    }}
                />
            </Card>

            <DestinationFormModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onFinish={handleFinish}
                editingDestination={editingDestination}
                form={form}
            />
        </div>
    );
};

export default DestinationManagement;