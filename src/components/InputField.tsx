import { ChangeEvent, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

interface IInputFiled {
  label: string;
  value?: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  select?: boolean;
  selectItems?: { value: string; label: string }[];
  name?: string;
  inputProps?: {
    minLength?: number;
    pattern?: string;
  };
  required?: boolean;
}

const InputField = ({
  label,
  value,
  select = false,
  selectItems = [],
  onChange,
  type,
  name,
  required = false,
  inputProps = {},
}: IInputFiled) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
    onChange(event as unknown as ChangeEvent<HTMLInputElement>);
  };

  return (
    <FormControl fullWidth margin='dense'>
      {select ? (
        <>
          <InputLabel>{label}</InputLabel>
          <Select value={selectedValue} onChange={handleSelectChange}>
            {selectItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </>
      ) : (
        <TextField
          required={required}
          name={name}
          type={type}
          label={label}
          value={value}
          onChange={onChange}
          inputProps={inputProps}
        />
      )}
    </FormControl>
  );
};

export default InputField;
