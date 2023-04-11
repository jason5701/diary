import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import InputField from '@/components/InputField';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore/lite';
import { db } from '../../firebase';

export interface ITrade {
  ticker: string;
  tradeType: '' | 'buy' | 'sell';
  date: string;
  price: number;
  quantity: number;
  term: '' | 'short' | 'swing' | 'long';
  reason: string;
}

const TradeInput = () => {
  const [tradeType, setTradeType] = useState('');
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [term, setTerm] = useState('');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(0);

  const [stocks, setStocks] = useState<{ value: string; label: string }[]>([
    { value: '', label: '' },
  ]);
  const [selectedStock, setSelectedStock] = useState('');

  const handleSubmit = async () => {
    const trade: ITrade = {
      ticker: selectedStock,
      tradeType: tradeType as '' | 'buy' | 'sell',
      date,
      price: Number(price),
      quantity: Number(quantity),
      term: term as '' | 'short' | 'swing' | 'long',
      reason,
    };
    let error = '';
    (Object.keys(trade) as (keyof typeof trade)[]).forEach((key) => {
      if (trade[key] === '' || (trade[key] as number) < 1) {
        error = '입력칸을 확인하세요.';
      }
    });
    if (error !== '') {
      alert(error);
    } else {
      if (window.confirm(`등록하시겠습니까?`)) {
        console.log(`${selectedStock} is saved`);
        const now = new Date().toISOString();
        const ref = doc(db, 'members', 'jasoon5701');
        await setDoc(doc(ref, 'stocks', now), trade);
        setTradeType('');
        setDate('');
        setPrice(0);
        setQuantity(0);
        setTerm('');
        setReason('');
      } else return;
    }
  };

  const docs = async () => {
    const db = getFirestore();
    const colRef = collection(db, 'stocks');
    const docsSnap = await getDocs(colRef);

    let arr: any = [];
    docsSnap.forEach((doc) => {
      arr.push({ value: doc.id, label: doc.data().name });
    });

    setStocks(arr);
  };

  useEffect(() => {
    docs();
  }, []);

  useEffect(() => {
    const sum = price * quantity;
    setAmount(sum);
  }, [price, quantity]);

  return (
    <div>
      <InputField
        label='주식'
        value={selectedStock}
        select
        selectItems={stocks}
        onChange={(e) => setSelectedStock(e.target.value)}
      />
      <InputField
        label='매매종류'
        value={tradeType}
        select
        selectItems={[
          { value: 'buy', label: '매수' },
          { value: 'sell', label: '매도' },
        ]}
        onChange={(e) => setTradeType(e.target.value)}
      />
      <InputField
        label=''
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <InputField
        label='가격'
        type='number'
        value={String(price)}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <InputField
        label='수량'
        type='number'
        value={String(quantity)}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <InputField
        label='기간'
        value={term}
        select
        selectItems={[
          { value: 'short', label: '단기' },
          { value: 'swing', label: '중기' },
          { value: 'long', label: '장기' },
        ]}
        onChange={(e) => setTerm(e.target.value)}
      />
      <InputField
        label='이유'
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <InputField
        label='총액'
        value={String(amount)}
        onChange={() => console.log(amount)}
      />
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        등록
      </Button>
    </div>
  );
};

export default TradeInput;
