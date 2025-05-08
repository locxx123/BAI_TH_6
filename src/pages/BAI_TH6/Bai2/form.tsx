import { Button, Form, Input, DatePicker, Select, List, Space, Popconfirm } from 'antd';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import * as service from '@/services/BAI_TH6/Bai2/index';

const FormLichTrinh = () => {
    const {
        diemDenList,
        selectedLichTrinh,
        setVisible,
        fetchData,
    } = useModel('BAITH_6.bai2');
    const [form] = Form.useForm();
    const [diemDenLichTrinh, setDiemDenLichTrinh] = useState<LichTrinh.DiemDenLichTrinh[]>([]);

    useEffect(() => {
        if (selectedLichTrinh) {
            form.setFieldsValue({
                ...selectedLichTrinh,
                ngay_bat_dau: dayjs(selectedLichTrinh.ngay_bat_dau),
                ngay_ket_thuc: dayjs(selectedLichTrinh.ngay_ket_thuc),
            });
            setDiemDenLichTrinh(selectedLichTrinh.diem_den || []);
        } else {
            form.resetFields();
            setDiemDenLichTrinh([]);
        }
    }, [selectedLichTrinh]);

    const handleAddDiemDen = (id: string) => {
        if (diemDenLichTrinh.find((d) => d.diem_den_id === id)) return;
        const diemDen = diemDenList.find((d) => d.id === id);
        setDiemDenLichTrinh([
            ...diemDenLichTrinh,
            {
                id: Math.random().toString(),
                diem_den_id: id,
                thu_tu: diemDenLichTrinh.length + 1,
                diem_den: diemDen,
            },
        ]);
    };

    const handleRemoveDiemDen = (id: string) => {
        setDiemDenLichTrinh(diemDenLichTrinh.filter((d) => d.diem_den_id !== id));
    };

    const handleSort = (from: number, to: number) => {
        if (to < 0 || to >= diemDenLichTrinh.length) return;
        const arr = [...diemDenLichTrinh];
        const [moved] = arr.splice(from, 1);
        arr.splice(to, 0, moved);
        setDiemDenLichTrinh(arr.map((d, idx) => ({ ...d, thu_tu: idx + 1 })));
    };

    const calcTongNganSach = () => {
        return diemDenLichTrinh.length * 1000000; // demo: mỗi điểm đến 1tr
    };

    const calcTongThoiGian = () => {
        return diemDenLichTrinh.reduce((sum, d) => sum + (d.diem_den?.thoi_gian_can || 1), 0);
    };

    const onFinish = async (values: any) => {
        const lichTrinhData = {
            ...values,
            ngay_bat_dau: values.ngay_bat_dau.format('YYYY-MM-DD'),
            ngay_ket_thuc: values.ngay_ket_thuc.format('YYYY-MM-DD'),
            tong_ngan_sach: calcTongNganSach(),
            tong_thoi_gian: calcTongThoiGian(),
        };
        if (selectedLichTrinh) {
            await service.updateLichTrinh(selectedLichTrinh.id, lichTrinhData);
        } else {
            await service.addLichTrinh(lichTrinhData);
        }
        // Xử lý điểm đến lịch trình (demo: chỉ lưu local, thực tế cần gọi API)
        setVisible(false);
        fetchData();
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="ten" label="Tên lịch trình" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ngay_bat_dau" label="Ngày bắt đầu" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item name="ngay_ket_thuc" label="Ngày kết thúc" rules={[{ required: true }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item label="Chọn điểm đến">
                <Select
                    showSearch
                    placeholder="Chọn điểm đến"
                    onSelect={handleAddDiemDen}
                    style={{ width: 300 }}
                >
                    {diemDenList.map((d) => (
                        <Select.Option key={d.id} value={d.id}>
                            {d.ten}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <List
                header="Danh sách điểm đến"
                bordered
                dataSource={diemDenLichTrinh}
                renderItem={(item, idx) => (
                    <List.Item
                        actions={[
                            <Button size="small" onClick={() => handleSort(idx, idx - 1)}>↑</Button>,
                            <Button size="small" onClick={() => handleSort(idx, idx + 1)}>↓</Button>,
                            <Popconfirm
                                title="Xóa điểm đến này?"
                                onConfirm={() => handleRemoveDiemDen(item.diem_den_id)}
                            >
                                <Button size="small" danger>Xóa</Button>
                            </Popconfirm>,
                        ]}
                    >
                        <Space>
                            <span>{item.diem_den?.ten}</span>
                            <span>({item.diem_den?.vi_tri})</span>
                        </Space>
                    </List.Item>
                )}
            />
            <div style={{ margin: '16px 0' }}>
                <b>Tổng ngân sách:</b> {calcTongNganSach().toLocaleString()} VND &nbsp; | &nbsp;
                <b>Tổng thời gian:</b> {calcTongThoiGian()} ngày
            </div>
            <div>
                <Button type="primary" htmlType="submit">
                    {selectedLichTrinh ? 'Lưu' : 'Tạo mới'}
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => setVisible(false)}>
                    Hủy
                </Button>
            </div>
        </Form>
    );
};

export default FormLichTrinh;
