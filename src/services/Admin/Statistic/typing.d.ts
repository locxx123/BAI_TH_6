export interface Statistics {
    id: string;
    thang: string;
    tong_so_lich_trinh: number;
    diem_den_pho_bien: string[];
    doanh_thu: number;
    doanh_thu_theo_loai: Record<string, number>;
    ngay_tao: string;
}

interface Statistics {
    id: string;
    thang: string;
    tong_so_lich_trinh: number;
    diem_den_pho_bien: string[];
    doanh_thu: number;
    doanh_thu_theo_loai: Record<string, number>;
}