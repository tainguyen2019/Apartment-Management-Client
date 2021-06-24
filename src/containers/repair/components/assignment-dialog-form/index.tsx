import React, { useContext, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from '@material-ui/core';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';
import dayjs from 'dayjs';

import { AssignmentRepair } from 'types/repair';
import MyDialog from 'components/common/my-dialog';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import repairService from 'services/repair';
import useDidUpdate from 'hooks/useDidUpdate';
import { DATE_FORMAT } from 'constants/common';

import RepairFormContext from '../../contexts/RepairFormContext';
import AssignmentDialogContext from '../../contexts/AssignmentDialogContext';
import TechniqueStaffSelect from 'components/common/technique-staff-select';

const initialValues: DefaultValues<AssignmentRepair> = {
  staff_id: '',
};

const AssignmentDialogForm: React.FC = () => {
  const { onRefresh } = useContext(RepairFormContext);
  const { open, repair, onClose } = useContext(AssignmentDialogContext);
  const [{ loading, success }, assignmentRepair] = useBackendServiceCallback(
    repairService.assignment,
  );
  const {
    handleSubmit: submitForm,
    control,
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const handleSubmit: SubmitHandler<AssignmentRepair> = ({ staff_id }) => {
    assignmentRepair(repair!.id, staff_id);
  };

  useEffect(() => {
    if (!open) {
      reset(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useDidUpdate(() => {
    if (success) {
      setTimeout(onClose!, 500);
      setTimeout(onRefresh!, 1000);
    }
  }, [success]);

  if (!repair) return null;

  return (
    <MyDialog
      fullWidth
      loading={loading}
      open={open}
      title="Phân công sửa chữa"
      onClose={onClose}
    >
      <form onSubmit={submitForm(handleSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Căn hộ"
                variant="outlined"
                defaultValue={repair.apartment_number}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Block"
                variant="outlined"
                defaultValue={repair.block_number}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Nội dung sửa chữa"
                variant="outlined"
                defaultValue={repair.content}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Ngày dự kiến"
                variant="outlined"
                defaultValue={dayjs(repair.date).format(DATE_FORMAT)}
              />
            </Grid>
            <Grid item xs={12}>
              <TechniqueStaffSelect
                autoFocus
                fullWidth
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: '200px',
                      },
                    },
                  },
                }}
                name="staff_id"
                label="Người phụ trách"
                control={control}
                margin="normal"
                rules={{
                  required: 'Vui lòng chọn người phụ trách',
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

export default AssignmentDialogForm;
