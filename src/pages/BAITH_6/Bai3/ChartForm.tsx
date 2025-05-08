import React from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF'];

const ChartForm: React.FC<NganSach.ChartFormProps> = ({ data, loading }) => {
  return (
    <Card title="Phân bổ chi phí" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toLocaleString()} VNĐ`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ChartForm;
