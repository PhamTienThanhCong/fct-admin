import { Route, Routes } from 'react-router-dom';
import ListUser from '../user/ListUser';
import DashBroad from '../dashBroad/DashBroad';
import Notification from '../notification/Notification';

const ContentLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashBroad" element={<DashBroad />} />
        <Route path="/listUser" element={<ListUser />} />
        <Route path="/notification" element={<Notification />} />
        {/* Đặt mặc định nội dung trang DashBroad */}
        <Route index element={<DashBroad />} />
      </Routes>
    </div>
  );
};

export default ContentLayout;
