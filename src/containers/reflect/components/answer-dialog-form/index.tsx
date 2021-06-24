import React, { useContext, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';

import MyDialog from 'components/common/my-dialog';
import MyInput from 'components/common/my-input';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import reflectService from 'services/reflect';

import ReflectFormContext from '../../contexts/ReflectFormContext';
import AnswerReflectDialogContext from '../../contexts/AnswerReflectDialogContext';

type AnswerReflectFormValues = {
  answer: string;
};

const initialValues: DefaultValues<AnswerReflectFormValues> = {
  answer: '',
};

const AnswerDialogForm: React.FC = () => {
  const { onRefresh } = useContext(ReflectFormContext);
  const { open, reflect, onClose } = useContext(AnswerReflectDialogContext);
  const [{ loading, success }, answerReflect] = useBackendServiceCallback(
    reflectService.answer,
  );
  const {
    handleSubmit: submitForm,
    control,
    reset,
  } = useForm<AnswerReflectFormValues>({
    defaultValues: initialValues,
  });

  const handleSubmit: SubmitHandler<AnswerReflectFormValues> = ({ answer }) => {
    answerReflect({
      id: reflect!.id,
      answer,
    });
  };

  useEffect(() => {
    if (!open) {
      reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (success) {
      setTimeout(onClose!, 500);
      setTimeout(onRefresh!, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (!reflect) return null;

  return (
    <MyDialog
      fullWidth
      loading={loading}
      open={open}
      title="Trả lời phản ánh"
      onClose={onClose}
    >
      <form onSubmit={submitForm(handleSubmit)}>
        <DialogContent>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                multiline
                label="Nội dung phản ánh"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={reflect.content}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <MyInput
                autoFocus
                fullWidth
                multiline
                rows={3}
                control={control}
                name="answer"
                label="Nội dung phản hồi"
                margin="normal"
                rules={{
                  required: 'Vui lòng nhập nội dung phản hồi.',
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button type="submit" color="primary" variant="outlined">
                Đồng ý
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={onClose} color="secondary" variant="outlined">
                Hủy bỏ
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </MyDialog>
  );
};

export default AnswerDialogForm;
