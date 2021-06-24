import { MenuItem, TextField } from '@material-ui/core';
import { PAGE_SIZE_OPTIONS } from 'constants/common';

interface PageSizeSelectionProps {
  value: number;
  className?: string;
  onChange: (value: number) => void;
}

const PageSizeSelection: React.FC<PageSizeSelectionProps> = ({
  value,
  className,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(Number(value));
  };

  return (
    <TextField
      select
      value={value}
      onChange={handleChange}
      className={className}
      InputProps={{ disableUnderline: true }}
    >
      {PAGE_SIZE_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default PageSizeSelection;
