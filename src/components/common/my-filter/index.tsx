import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

import { FilterInput } from 'types/filterInput';
import { useStyles } from './styles';

type MyFilterProps = {
  values: Record<string, any>;
  filterInputs: FilterInput[];
  handleChangeInput: React.ChangeEventHandler<{
    name?: string | undefined;
    value: unknown;
  }>;
};

const MyFilter: React.FC<MyFilterProps> = (props) => {
  const { values, filterInputs, handleChangeInput } = props;
  const classes = useStyles();
  return (
    <Grid item container justify="flex-end">
      {filterInputs.map((filterInput: FilterInput) => (
        <Grid item key={filterInput.name}>
          <FormControl className={classes.formControl}>
            <InputLabel id={filterInput.name}>{filterInput.label}</InputLabel>
            <Select
              labelId={filterInput.name}
              value={values[filterInput.name]}
              name={filterInput.name}
              onChange={handleChangeInput}
            >
              {filterInput.options.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyFilter;
