import { useState } from 'react';
import { Grid } from '@material-ui/core';

import MyTable from 'components/common/my-table';
import Spin from 'ui/spin';
import AppContent from 'components/app/app-content';

import * as actionCreator from 'redux/device/actionCreators';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import { selectDeviceState } from 'selectors/device';
import useActions from 'hooks/useActions';
import useEffectOnce from 'hooks/useEffectOnce';
import { Device } from 'types/device';
import { appPaths } from 'routes/paths';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import EditForm from './components/edit-form';
import InsertButton from './components/insert-button';
import DeviceDialogContext from './components/edit-form/DeviceDialogContext';
import { createDeviceCols } from './utils';

const DeviceInfo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selecteDevice, setSelectedDevice] = useState<Device>();

  const [getDevices] = useActions(actionCreator.getDevices);
  const { loading, devices } = useShallowEqualSelector(selectDeviceState);

  const handleEdit = (device: Device) => () => {
    setSelectedDevice(device);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedDevice(undefined);
    setOpen(false);
  };

  const deviceCols = createDeviceCols(handleEdit);
  const getData = () => {
    getDevices();
  };

  //get data on did mount
  useEffectOnce(() => {
    getData();
  });

  return (
    <AppContent title={appPaths.device.title}>
      <Spin loading={loading}>
        <Grid container spacing={2}>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createDevice.value}>
              <InsertButton onRefresh={getData} />
            </Restriction>
          </Grid>
          <Grid item>
            <DeviceDialogContext.Provider
              value={{ open, device: selecteDevice }}
            >
              <MyTable data={devices} columns={deviceCols} />
              <EditForm onClose={handleClose} onRefresh={getData} />
            </DeviceDialogContext.Provider>
          </Grid>
        </Grid>
      </Spin>
    </AppContent>
  );
};

export default DeviceInfo;
