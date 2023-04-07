import { useState } from 'react';
import { Button } from '@material-ui/core';
import InputField from '@/components/InputField';

interface Trade {
  tradeType: '' | 'buy' | 'sell';
  date: string;
  price: number;
  quantity: number;
  term: '' | 'short' | 'swing' | 'long';
  reason: string;
}

interface TradeInputProps {
  onSubmit: (trade: Trade) => void;
}

const TradeInput = ({ onSubmit }: TradeInputProps) => {
  const [tradeType, setTradeType] = useState('');
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [term, setTerm] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    const trade: Trade = {
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
      if (window.confirm('등록하시겠습니까?')) {
        onSubmit(trade);
        setTradeType('');
        setDate('');
        setPrice('');
        setQuantity('');
        setTerm('');
        setReason('');
      } else return;
    }
  };

  return (
    <div>
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
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <InputField
        label='수량'
        type='number'
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <InputField
        label='기간'
        value={tradeType}
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
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        등록
      </Button>
    </div>
  );
};

export default TradeInput;
