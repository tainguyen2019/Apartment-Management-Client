import { Typography, Grid, Paper, Button } from '@material-ui/core';
import { useStyles } from './styles';

interface SearchFormProps {
  onSubmit?: React.FormEventHandler;
  onReset?: React.MouseEventHandler;
  children?: React.ReactNode;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  onReset,
  children,
}) => {
  const classes = useStyles();
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Grid
        container
        component={Paper}
        className={classes.root}
        direction="column"
      >
        <Grid item className={classes.title}>
          <Typography variant="button">Tìm kiếm</Typography>
        </Grid>
        <Grid item>{children}</Grid>
        <Grid item className={classes.actions}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={2}>
              <Button
                fullWidth
                size="medium"
                type="submit"
                variant="outlined"
                color="primary"
              >
                Tìm kiếm
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Button
                fullWidth
                size="medium"
                type="reset"
                onClick={onReset}
                variant="outlined"
                color="secondary"
              >
                Nhập lại
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchForm;
