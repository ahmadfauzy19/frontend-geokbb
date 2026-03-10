import { Routes, Route } from 'react-router-dom';
import Beranda from '../page/Beranda';
import MapSet from '../page/MapSet';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/mapset" element={<MapSet />} />
      <Route path="*" element={<Beranda />} />
    </Routes>
  );
};

export default AppRoutes;
