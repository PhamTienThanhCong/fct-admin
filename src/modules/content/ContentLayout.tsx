import { Route, Routes } from 'react-router-dom';
import ListUser from '../user/ListUser';
import DashBroad from '../dashBroad/DashBroad';

const ContentLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashBroad" element={<DashBroad />} />
        <Route path="/listUser" element={<ListUser />} />
      </Routes>
    </div>
  );
};

export default ContentLayout;
