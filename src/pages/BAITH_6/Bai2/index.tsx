import { Button, Modal, Table } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormLichTrinh from '@/pages/BAI_TH6/Bai2/form';

const LichTrinhPage = () => {
    const {
        lichTrinhList,
        diemDenList,
        selectedLichTrinh,
        setSelectedLichTrinh,
        visible,
        setVisible,
        fetchData,
        setLichTrinhList,
    } = useModel('BAITH_6.bai2');

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { title: 'Tên lịch trình', dataIndex: 'ten', key: 'ten', align: 'center' },
        { title: 'Tổng ngân sách', dataIndex: 'tong_ngan_sach', key: 'tong_ngan_sach', align: 'center' },
        { title: 'Tổng thời gian', dataIndex: 'tong_thoi_gian', key: 'tong_thoi_gian', align: 'center' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: any) => (
                <Button
                    onClick={() => {
                        setSelectedLichTrinh(record);
                        setVisible(true);
                    }}
                >
                    Xem/Chỉnh sửa
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setSelectedLichTrinh(null);
                    setVisible(true);
                }}
                style={{ marginBottom: 16 }}
            >
                Thêm lịch trình
            </Button>
            <Table rowKey="id" dataSource={lichTrinhList} columns={columns} />


            <Modal
                destroyOnClose
                footer={false}
                title={selectedLichTrinh ? 'Chỉnh sửa lịch trình' : 'Thêm lịch trình'}
                visible={visible} // Sửa ở đây
                onCancel={() => setVisible(false)}
                width={800}
            >
                <FormLichTrinh />
            </Modal>
        </div>
    );
};

export default LichTrinhPage;
