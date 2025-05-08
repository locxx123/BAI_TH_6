// pages/destinations.tsx
import React from 'react';
import DestinationList from './DestinationList';
import type { Destination } from './destination'; // Giả sử bạn có định nghĩa kiểu cho Destination

// Dữ liệu mẫu (thay thế bằng dữ liệu thực tế của bạn)
const sampleDestinations: Destination[] = [
    {
        "id": "f3e5f3b4-21da-4f58-9cbb-213ac4e8a7a6",
        "ten": "Vịnh Hạ Long",
        "mo_ta": "Một trong những kỳ quan thiên nhiên thế giới, nổi tiếng với cảnh sắc biển và các hòn đảo đá vôi.",
        "vi_tri": "Quảng Ninh, Việt Nam",
        "loai": "Biển",
        "muc_gia": 2000000,
        "rating": 4.7,
        "thoi_gian_can": 4,
        "hinh_anh": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlF5aO4Dg7S755mSR-rc7o8t5USzhgJ5eV0Q&s"
    },
    {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "ten": "Sapa",
        "mo_ta": "Thị trấn vùng cao tuyệt đẹp với những thửa ruộng bậc thang và văn hóa dân tộc độc đáo.",
        "vi_tri": "Lào Cai, Việt Nam",
        "loai": "Núi",
        "muc_gia": 1500000,
        "rating": 4.5,
        "thoi_gian_can": 3,
        "hinh_anh": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuPR2SwoAUXMpyAf39zTSsjIxHN3tRdB8gzw&s"
    },
    {
        "id": "98765432-10fe-dcba-9876-543210fedcba",
        "ten": "Hội An",
        "mo_ta": "Phố cổ quyến rũ với những con phố đèn lồng và kiến trúc cổ kính.",
        "vi_tri": "Quảng Nam, Việt Nam",
        "loai": "Thành phố",
        "muc_gia": 1800000,
        "rating": 4.8,
        "thoi_gian_can": 2,
        "hinh_anh": "https://cdn.tuoitre.vn/2018/4/16/3-15238498425701309536303.jpg"
    },
    {
        "id": "bcdefa01-2345-6789-abcd-ef0123456789",
        "ten": "Đà Nẵng",
        "mo_ta": "Thành phố biển hiện đại với những bãi biển tuyệt đẹp và cây cầu nổi tiếng.",
        "vi_tri": "Đà Nẵng, Việt Nam",
        "loai": "Biển",
        "muc_gia": 2200000,
        "rating": 4.6,
        "thoi_gian_can": 3,
        "hinh_anh": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMyTcytJB8iAcxgvQEN-KsshE3816N58Xisdbfk8tnpqaW28i8fr-BENEpT6stVyr0Hkg&usqp=CAU"
    },
    {
        "id": "cdefab12-3456-7890-bcde-fa0123456789",
        "ten": "Đà Lạt",
        "mo_ta": "Thành phố ngàn hoa với khí hậu mát mẻ và những cảnh quan lãng mạn.",
        "vi_tri": "Lâm Đồng, Việt Nam",
        "loai": "Núi",
        "muc_gia": 1600000,
        "rating": 4.4,
        "thoi_gian_can": 4,
        "hinh_anh": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLxFexPXfZABLoeN_ni1zOVC_cFHdQobz-0Q&s"
    },
];

const DestinationsPage: React.FC = () => {
    return (
        <DestinationList destinations={sampleDestinations} />
    );
};

export default DestinationsPage;