
﻿import component from "@/locales/en-US/component";
import path from "path";

export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user/login',
                layout: false,
                name: 'login',
                component: './user/Login',
            },
            {
                path: '/user',
                redirect: '/user/login',
            },
        ],
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: './TrangChu',
        icon: 'HomeOutlined',
    },
    {
        path: '/gioi-thieu',
        name: 'About',
        component: './TienIch/GioiThieu',
        hideInMenu: true,
    },
    {
        path: '/',
        name: 'About',
        component: './TienIch/GioiThieu',
        hideInMenu: true,
    },
    {
        path: '/notification',
        routes: [
            {
                path: './subscribe',
                exact: true,
                component: './ThongBao/Subscribe',
            },
            {
                path: './check',
                exact: true,
                component: './ThongBao/Check',
            },
            {
                path: './',
                exact: true,
                component: './ThongBao/NotifOneSignal',
            },
        ],
        layout: false,
        hideInMenu: true,
    },
    {
        path: '/403',
        component: './exception/403/403Page',
        layout: false,
    },
    {
        path: '/hold-on',
        component: './exception/DangCapNhat',
        layout: false,
    },
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todolist',
		name: 'Todolist',
		component: './todolist',
	},
  }
		name: 'Random User',
		icon: "UserOutlined",
		exact:true,
		component:'./RandomUser',
	},
    // Bài thực hành 6
    // Bài 1
    // Khám phá điểm đến
    {
		path: '/kham-pha-diem-den',
		name: 'Khám phá điểm đến',
		icon: "UserOutlined",
		exact:true,
		component:'./BAITH_6/Bai1',
	},
   {
        path: '/lich-trinh',
        name: 'Lịch trình',
        icon: 'ScheduleOutlined',
        exact: true,
        component: './BAI_TH6/Bai2', // Sửa lại đúng đường dẫn component bạn đang dùng
    },
   {
        path: '/quan-ly-ngan-sach',
        name: 'Quản lý ngân sách',
        icon: "DollarOutlined",
        exact: true,
        component: './BAITH_6/Bai3',
   },
     {
		path: '/admin/statistics',
		name: 'Statistics',
		icon: 'BarChartOutlined',
		component: './BAITH_6/Bai4/Statistic/Statistic'
  },
    {
		path: '/admin',
		name: 'Admin',
		icon: 'UserOutlined',
		component: "./BAITH_6/Bai4/Destination/DestinationManagement",
	},

];
