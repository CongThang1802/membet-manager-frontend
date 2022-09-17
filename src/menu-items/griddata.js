// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - Data Grid ||============================== //

const griddata = {
    id: 'group-dashboard',
    title: 'Danh Sách',
    type: 'group',
    children: [
        {
            id: 'griddata',
            title: 'Thành Viên',
            type: 'item',
            url: '/griddata',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        }
    ]
};

export default griddata;
