import { useContext } from 'react';
import { Tooltip, IconButton, Grid } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

import Spin from 'ui/spin';
import { WaterIndex } from 'types/water-index';

import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import waterIndexService from 'services/water-index';
import useDidUpdate from 'hooks/useDidUpdate';
import WaterIndexFormContext from '../../contexts/WaterIndexFormContext';

interface ConfirmButtonProps {
  waterIndex: WaterIndex;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ waterIndex }) => {
  const { onRefresh } = useContext(WaterIndexFormContext);
  const [{ loading, success }, confirmWaterIndex] = useBackendServiceCallback(
    waterIndexService.confirm,
  );

  const visibility = waterIndex.status === 'Chưa chốt';

  const handleApprove = () => {
    confirmWaterIndex(waterIndex.id);
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
        <Tooltip title="Chốt">
          <IconButton onClick={handleApprove}>
            <CheckIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Spin>
    </Grid>
  );
};

export default ConfirmButton;
