export interface Destination {
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

interface DestinationFormModalProps {
    visible: boolean;
    onCancel: () => void;
    onFinish: (values: any) => void;
    editingDestination: any;
    form: any;
}
