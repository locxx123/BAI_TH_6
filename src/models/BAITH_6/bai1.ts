import { getData } from '@/services/BAITH_6/Bai1/index';
import { useState } from 'react';

export default () => {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		const res = await getData();
		setData(res.data ?? []);
		return;
	};

	return {
		data,
        fetchData
	};
};
