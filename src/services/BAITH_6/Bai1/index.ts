import axios from 'axios';


export const getData = async () => {
    // Dùng json-server để tạo API giả lập
    // Dữ liệu mẫu trong file db.json
    const res = await axios.get('http://localhost:8000/diem_den');
    return res;
};
