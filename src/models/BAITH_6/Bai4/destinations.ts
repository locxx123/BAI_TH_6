import { useState } from 'react';
import { Destination } from '../../../services/Admin/Destination/typings';
import { fetchDestinations, addDestination, updateDestination, deleteDestination } from '../../../services/Admin/Destination/destinations';
import { Form } from 'antd';
import { message } from 'antd';
export default () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDestination, setEditingDestination] = useState<any>(null);
    const [form] = Form.useForm();
    const loadDestinations = async () => {
        try {
            const data = await fetchDestinations();
            setDestinations(data);
        } catch (error) {
            console.error('Error loading destinations:', error);
        }
    };

    const addDestinationToModel = async (destination: any) => {
        try {
            await addDestination(destination);
            loadDestinations();
        } catch (error) {
            console.error('Error adding destination:', error);
        }
    };

    const updateDestinationInModel = async (destination: any) => {
        try {
            await updateDestination(destination);
            loadDestinations();
        } catch (error) {
            console.error('Error updating destination:', error);
        }
    };

    const deleteDestinationFromModel = async (id: string) => {
        try {
            await deleteDestination(id);
            loadDestinations();
        } catch (error) {
            console.error('Error deleting destination:', error);
        }
    };
    const handleFinish = async (values: any) => {
        if (editingDestination) {
            await updateDestinationInModel({ ...editingDestination, ...values });
            message.success('Cập nhật điểm đến thành công!');
        } else {
            await addDestinationToModel(values);
            message.success('Thêm điểm đến thành công!');
        }
        setIsModalVisible(false);
    };

    return {
        destinations,
        loadDestinations,
        addDestinationToModel,
        updateDestinationInModel,
        deleteDestinationFromModel,
        isModalVisible,
        setIsModalVisible,
        editingDestination,
        setEditingDestination,
        form,
        handleFinish
    };
};