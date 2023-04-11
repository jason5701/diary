import { AuthContext } from '@/auth/auth';
import TradingGrid from '@components/TradingGrid';
import { Box, Typography } from '@mui/material';
import { db } from '../../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import { useContext, useEffect } from 'react';

const GridView = () => {
  const { user } = useContext(AuthContext);
  const getData = async () => {
    const ref = doc(db, 'members', 'jasoon5701');
    const refSnap = await getDoc(ref);
    const cols = await getDocs(collection(ref, 'stocks'));

    cols.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });

    if (refSnap.exists()) {
      const data = refSnap.data();
      console.log(data);
    } else {
      console.log('no data');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ p: '2rem' }}>
      {user ? (
        <TradingGrid />
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h4'>로그인이 필요합니다.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default GridView;
