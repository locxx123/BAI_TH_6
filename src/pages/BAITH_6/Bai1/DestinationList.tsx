// components/DestinationList.tsx
import React, { useState } from 'react';
import DestinationCard from './DestinationCard';
import { Select, InputNumber, Slider, Row, Col, Typography } from 'antd';
import type { Destination } from './destination'; // Giả sử bạn có định nghĩa kiểu cho Destination

const { Option } = Select;
const { Title } = Typography;

interface DestinationListProps {
    destinations: Destination[];
}

interface Filters {
    loai: string[];
    gia: [number, number];
    rating: number;
}

const DestinationList: React.FC<DestinationListProps> = ({ destinations }) => {
    const [filters, setFilters] = useState<Filters>({
        loai: [],
        gia: [0, Infinity],
        rating: 0,
    });
    const [sortBy, setSortBy] = useState<string | null>(null);

    const uniqueLoai = [...new Set(destinations.map((dest) => dest.loai))];

    const filteredDestinations = destinations.filter((dest) => {
        const loaiFilter = filters.loai.length === 0 || filters.loai.includes(dest.loai);
        const giaFilter = dest.muc_gia >= filters.gia[0] && dest.muc_gia <= filters.gia[1];
        const ratingFilter = dest.rating >= filters.rating;
        return loaiFilter && giaFilter && ratingFilter;
    });

    const sortedDestinations = [...filteredDestinations].sort((a, b) => {
        if (sortBy === 'gia_thap') return a.muc_gia - b.muc_gia;
        if (sortBy === 'gia_cao') return b.muc_gia - a.muc_gia;
        if (sortBy === 'rating_cao') return b.rating - a.rating;
        return 0;
    });

    const handleFilterChange = (type: keyof Filters, value: any) => {
        setFilters({ ...filters, [type]: value });
    };

    const handleSortChange = (value: string | null) => {
        setSortBy(value);
    };

    return (
        <div className="p-8">
            <Title level={2} className="mb-4">Các Điểm Đến Nổi Bật</Title>
            <Row gutter={[16, 16]} className="mb-8">
                <Col xs={24} sm={12} md={8}>
                    <Select
                        mode="multiple"
                        placeholder="Lọc theo loại hình"
                        style={{ width: '100%' }}
                        onChange={(value) => handleFilterChange('loai', value)}
                    >
                        {uniqueLoai.map((loai) => (
                            <Option key={loai} value={loai}>
                                {loai}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <div className="flex items-center">
                        <span className="mr-2">Giá từ:</span>
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value ? value.replace(/,*/g, '') : ''}
                            style={{ width: 100 }}
                            onChange={(value) => handleFilterChange('gia', [value || 0, filters.gia[1]])}
                        />
                        <span className="ml-2 mr-2">đến:</span>
                        <InputNumber
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value ? value.replace(/,*/g, '') : ''}
                            style={{ width: 100 }}
                            onChange={(value) => handleFilterChange('gia', [filters.gia[0], value || Infinity])}
                        />
                    </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <span className="mr-2">Đánh giá tối thiểu:</span>
                    <Slider
                        min={0}
                        max={5}
                        step={0.1}
                        onChange={(value) => handleFilterChange('rating', value)}
                        value={filters.rating}
                    />
                    <span className="ml-2">{filters.rating} sao</span>
                </Col>
            </Row>
            <Row justify="end" className="mb-4">
                <Col>
                    <Select placeholder="Sắp xếp theo" onChange={handleSortChange} style={{ width: 150 }}>
                        <Option value="gia_thap">Giá thấp đến cao</Option>
                        <Option value="gia_cao">Giá cao đến thấp</Option>
                        <Option value="rating_cao">Đánh giá cao nhất</Option>
                    </Select>
                </Col>
            </Row>
            <Row className='mt-4' gutter={[16, 16]}>
                {sortedDestinations.map((destination) => (
                    <Col key={destination.id} xs={24} sm={12} md={8} lg={6}>
                        <DestinationCard destination={destination} />
                    </Col>
                ))}
                {sortedDestinations.length === 0 && <Col span={24}><Typography.Paragraph>Không có điểm đến nào phù hợp với bộ lọc.</Typography.Paragraph></Col>}
            </Row>
        </div>
    );
};

export default DestinationList;