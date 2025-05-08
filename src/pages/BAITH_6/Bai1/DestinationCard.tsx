// components/DestinationCard.tsx
import React from 'react';
import { Card, Rate } from 'antd';
import type { Destination } from './destination'; // Giả sử bạn có định nghĩa kiểu cho Destination

const { Meta } = Card;

interface DestinationCardProps {
    destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
    return (
        <Card
            hoverable
            style={{ width: 300, marginBottom: 16 }}
            cover={<img alt={destination.ten} src={destination.hinh_anh} style={{ height: 200, objectFit: 'cover' }} />}
        >
            <Meta
                title={destination.ten}
                description={
                    <>
                        <p className="text-gray-600">{destination.vi_tri}</p>
                        <Rate disabled defaultValue={destination.rating} />
                        <p className="text-blue-500 font-semibold">{destination.muc_gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </>
                }
            />
        </Card>
    );
};

export default DestinationCard;