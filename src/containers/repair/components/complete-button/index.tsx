import { useContext } from 'react';
import { Tooltip, IconButton, Grid } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import { Repair } from 'types/repair';
import Spin from 'ui/spin';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import repairService from 'services/repair';
import useDidUpdate from 'hooks/useDidUpdate';
import storageService from 'services/storage';

import RepairFormContext from '../../contexts/RepairFormContext';

interface CompleteButtonProps {
  repair: Repair;
}

const CompleteButton: React.FC<CompleteButtonProps> = ({ repair }) => {
  const { onRefresh } = useContext(RepairFormContext);
  const [{ loading, success }, completeRepair] = useBackendServiceCallback(
    repairService.complete,
  );
  const staffId = storageService.getItem<string>('staff_id') ?? '';
  const visibility =
    repair.status === 'Đã phân công' && staffId === repair.staff_id;

  const handleComplete = () => {
    completeRepair(repair.id);
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
        <Tooltip title="Hoàn thành">
          <IconButton onClick={handleComplete}>
            <CheckIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Spin>
    </Grid>
  );
};

export default CompleteButton;
