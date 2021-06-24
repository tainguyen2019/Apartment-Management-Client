import React, { useContext } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from '@material-ui/core';

import MyDialog from 'components/common/my-dialog';

import ViewReflectDialogContext from '../../contexts/ViewReflectDialogContext';

const ViewDialogForm: React.FC = () => {
  const { open, reflect, onClose } = useContext(ViewReflectDialogContext);

  if (!reflect) return null;

  return (
    <MyDialog
      fullWidth
      open={open}
      title="Xem chi tiết phản ánh"
      onClose={onClose}
    >
      <DialogContent>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              fullWidth
              label="Tiêu đề"
              margin="normal"
              variant="outlined"
              defaultValue={reflect.title}
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Bộ phận tiếp nhận"
              margin="normal"
              variant="outlined"
              defaultValue={reflect.department_name}
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              multiline
              label="Nội dung phản ánh"
              margin="normal"
              variant="outlined"
              defaultValue={reflect.content}
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              multiline
              label="Nội dung phản hồi"
              margin="normal"
              variant="outlined"
              defaultValue={reflect.answer}
              inputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justify="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Đóng
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </MyDialog>
  );
};

export default ViewDialogForm;
