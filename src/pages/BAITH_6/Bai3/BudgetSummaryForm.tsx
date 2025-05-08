import React from 'react';
import { Card, Progress, Typography } from 'antd';
import styles from './style.less';

const { Text } = Typography;

const BudgetSummaryForm: React.FC<NganSach.BudgetSummaryFormProps> = ({
  tongSoTienDaChi,
  tongNganSach,
  percentSpent,
  loading,
}) => {
  return (
    <Card title="Tổng quan ngân sách" loading={loading}>
      <div className={styles.budgetSummary}>
        <Progress
          type="circle"
          percent={percentSpent}
          status={percentSpent > 100 ? 'exception' : 'normal'}
          format={(percent) => `${percent}%`}
        />
        <div className={styles.budgetDetail}>
          <Text>Đã chi: <Text strong>{tongSoTienDaChi.toLocaleString()}</Text> VNĐ</Text>
          <br />
          <Text>Tổng ngân sách: <Text strong>{tongNganSach.toLocaleString()}</Text> VNĐ</Text>
          <br />
          <Text>Còn lại: <Text strong>{(tongNganSach - tongSoTienDaChi).toLocaleString()}</Text> VNĐ</Text>
        </div>
      </div>
    </Card>
  );
};

export default BudgetSummaryForm;
