import { useEffect, useContext } from 'react';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../firebase';
import Routes from '@/routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { AuthContext } from './auth/auth';

function App() {
  const { user } = useContext(AuthContext);

  const testFunc = async () => {
    const ref = doc(db, 'members', 'jasoon5701');
    const subRef = doc(ref, 'stocks', '017960');
    const refSnap = await getDoc(ref);
    const subSnap = await getDoc(subRef);

    if (refSnap.exists()) {
      const data = refSnap.data();
    } else {
      console.log('no data');
    }

    if (subSnap.exists()) {
    } else console.log('no sub data');
  };

  useEffect(() => {
    testFunc();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
