import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, Upload, Button, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DestinationFormModalProps } from "../../../../services/BAITH_6/Bai4/Destination/typings";
import styles from './DestinationFormModal.less';

const { Option } = Select;

const DestinationFormModal: React.FC<DestinationFormModalProps> = ({
    visible,
    onCancel,
    onFinish,
    editingDestination,
    form,
}) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Điều chỉnh layout của form dựa trên kích thước màn hình
    const formLayout = width > 768 ? 'horizontal' : 'vertical';
    const modalWidth = width > 768 ? 600 : (width > 576 ? '80%' : '95%');

    return (
        <Modal
            visible={visible}
            title={editingDestination ? 'Chỉnh sửa điểm đến' : 'Thêm điểm đến'}
            onCancel={onCancel}
            onOk={() => form.submit()}
            width={modalWidth}
            className={styles.destinationModal}
        >
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={editingDestination || {}}
                layout={formLayout}
                labelCol={formLayout === 'horizontal' ? { span: 6 } : undefined}
                wrapperCol={formLayout === 'horizontal' ? { span: 18 } : undefined}
            >
                <Row gutter={[16, 0]}>
                    <Col xs={24} md={24}>
                        <Form.Item name="ten" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item name="vi_tri" label="Vị trí" rules={[{ required: true, message: 'Vui lòng nhập vị trí!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item name="loai" label="Loại" rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}>
                            <Select>
                                <Option value="Biển">Biển</Option>
                                <Option value="Núi">Núi</Option>
                                <Option value="Thành phố">Thành phố</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item name="muc_gia" label="Mức giá" rules={[{ required: true, message: 'Vui lòng chọn mức giá!' }]}>
                            <Select>
                                <Option value="Thấp">Thấp</Option>
                                <Option value="Trung bình">Trung bình</Option>
                                <Option value="Cao">Cao</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item name="rating" label="Rating" rules={[{ required: true, message: 'Vui lòng nhập rating!' }]}>
                            <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24}>
                        <Form.Item name="hinh_anh" label="Hình ảnh">
                            <Upload>
                                <Button icon={<UploadOutlined />}>Tải lên</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default DestinationFormModal;