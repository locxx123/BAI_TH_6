import { useState } from 'react';
import { Statistics } from '../../../services/Admin/Statistic/typing';
import { fetchStatistics } from '../../../services/Admin/Statistic/statistics';

export default () => {
    const [statistics, setStatistics] = useState<Statistics[]>([]);

    const loadStatistics = async () => {
        try {
            const data = await fetchStatistics();
            setStatistics(data);
        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    };

    return {
        statistics,
        loadStatistics,
    };
};