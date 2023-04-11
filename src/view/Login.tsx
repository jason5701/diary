import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { AuthContext } from '@/auth/auth';

export default function GoogleLogin() {
  const navigate = useNavigate();
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    signInWithGoogle()
      .then(() => {
        console.log('login done');
        navigate('/');
      })
      .catch((error) => console.error(error));
  };

  return (
    <Grid container justifyContent='center' spacing={2}>
      <Grid item xs={12} sm={8} md={6}>
        <Button
          fullWidth
          variant='contained'
          onClick={handleGoogleSignIn}
          sx={{
            backgroundColor: '#fff',
            color: '#000',
            '&:hover': {
              backgroundColor: '#000',
              color: '#fff',
            },
          }}
        >
          Google 로그인
        </Button>
      </Grid>
    </Grid>
  );
}
