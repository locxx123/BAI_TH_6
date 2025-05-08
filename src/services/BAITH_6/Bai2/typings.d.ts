declare module LichTrinh {
    export interface DiemDen {
        id: string;
        ten: string;
        mo_ta: string;
        vi_tri: string;
        loai: string;
        muc_gia: string;
        rating: number;
        thoi_gian_can: number;
        hinh_anh: string;
    }

    export interface LichTrinh {
        id: string;
        ten: string;
        tong_ngan_sach: number;
        tong_thoi_gian: number;
        ngay_bat_dau: string;
        ngay_ket_thuc: string;
        diem_den: DiemDenLichTrinh[];
    }

    export interface DiemDenLichTrinh {
        id: string;
        diem_den_id: string;
        thu_tu: number;
        diem_den?: DiemDen;
    }
}
