import {
  Box,
  Grid,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Spin from 'ui/spin';
import { useStyles } from './styles';

export interface MyDialogProps extends MuiDialogProps {
  title: string;
  loading?: boolean;
  onClose?: React.MouseEventHandler;
}

const MyDialog: React.FC<MyDialogProps> = ({
  title,
  children,
  onClose,
  loading = false,
  ...dialogProps
}) => {
  const classes = useStyles();
  return (
    <MuiDialog {...dialogProps}>
      <Box className={classes.container}>
        <Spin loading={loading}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            className={classes.dialogHeader}
          >
            <Grid item xs>
              <DialogTitle className={classes.title}>{title}</DialogTitle>
            </Grid>
            <Grid item xs="auto">
              <IconButton
                title="Đóng"
                size="medium"
                className={classes.closeButton}
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          {children}
        </Spin>
      </Box>
    </MuiDialog>
  );
};

export default MyDialog;
