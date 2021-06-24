import { useState } from 'react';
import { Grid } from '@material-ui/core';

import MyTable from 'components/common/my-table';
import Spin from 'ui/spin';
import AppContent from 'components/app/app-content';

import * as actionCreator from 'redux/fee/actionCreators';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import { selectFeeState } from 'selectors/fee';
import useActions from 'hooks/useActions';
import useEffectOnce from 'hooks/useEffectOnce';
import { Fee } from 'types/fee';
import { appPaths } from 'routes/paths';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import EditForm from './components/edit-form';
import InsertButton from './components/insert-button';
import FeeDialogContext from './components/edit-form/FeeDialogContext';
import { createFeeCols } from './utils';

const DeviceInfo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selecteFee, setSelectedFee] = useState<Fee>();

  const [getDevices] = useActions(actionCreator.getDevices);
  const { loading, fees } = useShallowEqualSelector(selectFeeState);

  const handleEdit = (fee: Fee) => () => {
    setSelectedFee(fee);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFee(undefined);
    setOpen(false);
  };

  const feeCols = createFeeCols(handleEdit);
  const getData = () => {
    getDevices();
  };

  //get data on did mount
  useEffectOnce(() => {
    getData();
  });

  return (
    <AppContent title={appPaths.fee().title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createFee.value}>
              <InsertButton onRefresh={getData} />
            </Restriction>
          </Grid>
          <Grid item>
            <FeeDialogContext.Provider value={{ open, fee: selecteFee }}>
              <MyTable data={fees} columns={feeCols} />
              <EditForm onClose={handleClose} onRefresh={getData} />
            </FeeDialogContext.Provider>
          </Grid>
        </Grid>
      </Spin>
    </AppContent>
  );
};

export default DeviceInfo;
