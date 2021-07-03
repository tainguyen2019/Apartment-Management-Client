import { useState } from 'react';
import { Grid } from '@material-ui/core';

import MyTable from 'components/common/my-table';
import Spin from 'ui/spin';
import AppContent from 'components/app/app-content';

import * as actionCreator from 'redux/area/actionCreators';
import useShallowEqualSelector from 'hooks/useShallowEqualSelector';
import { selectAreaState } from 'selectors/area';
import useActions from 'hooks/useActions';
import useEffectOnce from 'hooks/useEffectOnce';
import { Area } from 'types/area';
import { appPaths } from 'routes/paths';
import { PRIVILEGES } from 'constants/users';
import Restriction from 'components/common/restriction';

import EditForm from './components/edit-form';
import InsertButton from './components/insert-button';
import AreaDialogContext from './components/edit-form/AreaDialogContext';
import { createAreaCols } from './utils';

const AreaInfo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area>();

  const [getAreas] = useActions(actionCreator.getAreas);
  const { loading, areas } = useShallowEqualSelector(selectAreaState);

  const handleEdit = (area: Area) => () => {
    setSelectedArea(area);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedArea(undefined);
    setOpen(false);
  };

  const areaCols = createAreaCols(handleEdit);
  const getData = () => {
    getAreas();
  };

  //get data on did mount
  useEffectOnce(() => {
    getData();
  });

  return (
    <AppContent title={appPaths.area.title}>
      <Spin loading={loading}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Restriction privilege={PRIVILEGES.createArea.value}>
              <InsertButton onRefresh={getData} />
            </Restriction>
          </Grid>
          <Grid item>
            <AreaDialogContext.Provider value={{ open, area: selectedArea }}>
              <MyTable data={areas} columns={areaCols} />
              <EditForm onClose={handleClose} onRefresh={getData} />
            </AreaDialogContext.Provider>
          </Grid>
        </Grid>
      </Spin>
    </AppContent>
  );
};

export default AreaInfo;
