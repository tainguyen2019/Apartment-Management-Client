import { useContext } from 'react';
import { Tooltip, IconButton, Grid } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import { Absence } from 'types/absence';

import Spin from 'ui/spin';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import absenceService from 'services/absence';
import useDidUpdate from 'hooks/useDidUpdate';
import AbsenceFormContext from '../../context/AbsenceFormContext';

interface ApproveButtonProps {
  absence: Absence;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({ absence }) => {
  const { onRefresh } = useContext(AbsenceFormContext);
  const [{ loading, success }, approveAbsence] = useBackendServiceCallback(
    absenceService.approve,
  );

  const visibility = absence.status === 'Chờ xử lý';

  const handleApprove = () => {
    approveAbsence(absence.id);
  };

  useDidUpdate(() => {
    if (success && onRefresh) {
      setTimeout(onRefresh, 500);
    }
  }, [success]);

  if (!visibility) return null;

  return (
    <Grid container alignItems="center">
      <Spin loading={loading} size={18}>
        <Tooltip title="Duyệt">
          <IconButton onClick={handleApprove}>
            <CheckIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Spin>
    </Grid>
  );
};

export default ApproveButton;
