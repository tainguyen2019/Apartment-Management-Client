import { Grid, Typography } from '@material-ui/core';
import { Pagination, PaginationProps } from '@material-ui/lab';
import PageSizeSelection from '../page-size-selection';
import useStyles from './styles';

interface MyPaginationProps extends Omit<PaginationProps, 'onChange'> {
  page: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}

const MyPagination: React.FC<MyPaginationProps> = ({
  className,
  page,
  pageSize,
  onChange,
  classes: paginationClasses,
  ...paginationProps
}) => {
  const classes = useStyles();

  const handleChangePageSize = (value: number) => {
    onChange(page, value);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    onChange(value, pageSize);
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={className}
      spacing={2}
    >
      <Grid item md={5} xs={12}>
        <Grid container alignItems="center">
          <Typography variant="body1">Hiển thị</Typography>
          <PageSizeSelection
            value={pageSize}
            onChange={handleChangePageSize}
            className={classes.pageSizeSelection}
          />
          <Typography variant="body1">dòng trên trang</Typography>
        </Grid>
      </Grid>
      <Grid item className={classes.grow}></Grid>
      <Grid item md="auto" xs={12}>
        <Grid container>
          <Pagination
            {...paginationProps}
            classes={{
              ...paginationClasses,
              ul: classes.ulPagination,
            }}
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyPagination;
