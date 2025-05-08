import React, { useEffect, useState } from 'react';
import { Card, List, Table, Row, Col } from 'antd';
import { useModel } from 'umi';
import { Statistics } from '../../../../services/BAITH_6/Bai4/Statistic/typing';
import styles from './Statistics.less';

const StatisticsPage: React.FC = () => {
    const { statistics, loadStatistics } = useModel('BAITH_6.Bai4.statistics');
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        loadStatistics();

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.statisticsPage}>
            {statistics.map((stat: Statistics) => (
                <Card key={stat.id} title={`Thống kê tháng ${stat.thang}`} className={styles.statisticCard}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Card className={styles.summaryCard} size="small" title="Tổng quan">
                                <p><strong>Tổng số lịch trình:</strong> {stat.tong_so_lich_trinh}</p>
                                <p><strong>Doanh thu:</strong> {stat.doanh_thu.toLocaleString()} VND</p>
                            </Card>
                        </Col>

                        <Col xs={24} md={12}>
                            <Card className={styles.popularCard} size="small" title="Địa điểm phổ biến">
                                <List
                                    dataSource={stat.diem_den_pho_bien}
                                    renderItem={(item) => <List.Item>{item}</List.Item>}
                                    size="small"
                                />
                            </Card>
                        </Col>

                        <Col xs={24}>
                            <Card className={styles.revenueCard} size="small" title="Doanh thu theo loại">
                                <Table
                                    dataSource={Object.entries(stat.doanh_thu_theo_loai).map(([key, value]) => ({ loai: key, so_tien: value }))}
                                    columns={[
                                        { title: 'Loại', dataIndex: 'loai', key: 'loai' },
                                        {
                                            title: 'Số tiền',
                                            dataIndex: 'so_tien',
                                            key: 'so_tien',
                                            render: (value) => `${value.toLocaleString()} VND`
                                        },
                                    ]}
                                    pagination={false}
                                    rowKey="loai"
                                    size={width < 768 ? 'small' : 'middle'}
                                    scroll={{ x: 'max-content' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Card>
            ))}
        </div>
    );
};

export default StatisticsPage;