import { useState } from 'react';
import { Button } from '@material-ui/core';
import InputField from '@/components/InputField';
import { setDoc, doc } from 'firebase/firestore/lite';
import { db } from '../../firebase';

export interface IStock {
  type: '' | 'kospi' | 'kosdaq';
  name: string;
  ticker: string;
  date: string;
  ownerId: 'jasoon5701';
}

const TradeInput = () => {
  const [type, setType] = useState('');
  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');

  const onSubmit = async (trade: IStock) => {
    const today = new Date();
    const docId = trade.ticker;
    const updateData = {
      createdAt: today.toISOString().slice(0, 10),
      updatedAt: today.toISOString().slice(0, 10),
      name: trade.name,
      ownerId: trade.ownerId,
    };
    await setDoc(doc(db, 'stocks', docId), updateData);
    console.log('save : ', trade.name);
  };

  const handleSubmit = () => {
    const today = new Date();
    const trade: IStock = {
      type: type as '' | 'kospi' | 'kosdaq',
      ticker,
      name,
      date: today.toISOString().slice(0, 10),
      ownerId: 'jasoon5701',
    };
    let error = '';
    (Object.keys(trade) as (keyof typeof trade)[]).forEach((key) => {
      if (trade[key] === '') {
        error = '입력칸을 확인하세요.';
      }
    });
    if (error !== '') {
      alert(error);
    } else {
      if (window.confirm(`'${name}' 등록하시겠습니까?`)) {
        onSubmit(trade);
        setType('');
        setTicker('');
        setName('');
      } else return;
    }
  };

  return (
    <div>
      <InputField
        label='구분'
        value={type}
        select
        selectItems={[
          { value: 'kospi', label: '코스피' },
          { value: 'kosdaq', label: '코스닥' },
        ]}
        onChange={(e) => setType(e.target.value)}
      />
      <InputField
        label='종목코드'
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />
      <InputField
        label='종목명'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        등록
      </Button>
    </div>
  );
};

export default TradeInput;
