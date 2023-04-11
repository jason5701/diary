import { AuthContext } from '@/auth/auth';
import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#eee',
        py: '1rem',
        top: 0,
        left: 0,
        width: '100%',
      }}
    >
      {/* 로고 섹션 */}
      <Box sx={{ paddingLeft: '2rem' }}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Typography variant='h6' sx={{ color: 'white' }}>
            My App
          </Typography>
        </Link>
      </Box>

      {/* 로그인 정보와 로그인/로그아웃 버튼 */}
      <Box sx={{ paddingRight: '1rem' }}>
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: '1rem', color: 'white' }}>
              Hello, {user.displayName}
            </Typography>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            variant='outlined'
            color='secondary'
            component={Link}
            to='/auth/login'
          >
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
