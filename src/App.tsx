import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { getDoc, doc, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';
import TradeInput from '@/view/TradeInput';

function App() {
  const testFunc = async () => {
    const ref = doc(db, 'members', 'jasoon5701');
    const subRef = doc(ref, 'stocks', '017960');
    const refSnap = await getDoc(ref);
    const subSnap = await getDoc(subRef);

    if (refSnap.exists()) {
      const data = refSnap.data();
      console.log(data);
    } else {
      console.log('no data');
    }

    if (subSnap.exists()) {
      console.log(subSnap.data());
    } else console.log('no sub data');
  };

  useEffect(() => {
    testFunc();
  }, []);

  return (
    <div className='App'>
      <TradeInput onSubmit={(trade) => console.log(trade)} />
    </div>
  );
}

export default App;
