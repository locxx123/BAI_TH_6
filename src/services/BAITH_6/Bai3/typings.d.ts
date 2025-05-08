declare namespace NganSach {
  export interface Record {
    id: string;
    lich_trinh_id: string;
    loai: string;
    han_muc: number;
    so_tien: number;
  }

  export interface LichTrinh {
    id: string;
    ten: string;
    tong_ngan_sach: number;
    tong_thoi_gian: number;
    ngay_bat_dau: string;
    ngay_ket_thuc: string;
  }

  interface BudgetSummaryFormProps {
    tongSoTienDaChi: number;
    tongNganSach: number;
    percentSpent: number;
    loading: boolean;
  }

  interface ChartFormProps {
    data: Array<{
      name: string;
      value: number;
      hanMuc: number;
    }>;
    loading: boolean;
  }

  interface TableFormProps {
    nganSach: NganSach.Record[];
    loading: boolean;
  }
} 