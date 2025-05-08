import { useState } from 'react';
import * as service from '@/services/BAITH_6/Bai2/index';

export default () => {
    const [lichTrinhList, setLichTrinhList] = useState<LichTrinh.LichTrinh[]>([]);
    const [diemDenList, setDiemDenList] = useState<LichTrinh.DiemDen[]>([]);
    const [selectedLichTrinh, setSelectedLichTrinh] = useState<LichTrinh.LichTrinh | null>(null);
    const [visible, setVisible] = useState(false);

    const fetchData = async () => {
        const [lichTrinh, diemDen] = await Promise.all([
            service.getLichTrinh(),
            service.getDiemDen(),
        ]);
        setLichTrinhList(lichTrinh);
        setDiemDenList(diemDen);
    };

    return {
        lichTrinhList,
        diemDenList,
        selectedLichTrinh,
        setSelectedLichTrinh,
        visible,
        setVisible,
        fetchData,
        setLichTrinhList,
    };
};
