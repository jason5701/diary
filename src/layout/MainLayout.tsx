import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import Topbar from './header/Topbar';

const MainLayout = () => {
  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
      <Topbar />
      <Box sx={{ width: '70%', margin: '0 auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
