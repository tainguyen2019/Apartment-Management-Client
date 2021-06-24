import { Grid } from '@material-ui/core';
import dayjs from 'dayjs';

import { Vehicle } from 'types/vehicle';
import { ColumnOptionsList } from 'components/common/my-table';
import { DATE_FORMAT } from 'constants/common';

import CancelButton from './components/cancel-button';
import EditButton from './components/edit-button';
import ApproveButton from './components/approve-button';
import Restriction from 'components/common/restriction';
import { PRIVILEGES } from 'constants/users';

export const createVehicleCols = (
  page: number,
  pageSize: number,
): ColumnOptionsList<Vehicle> => [
  {
    name: 'STT',
    renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
  },
  { key: 'plate_number', name: 'Biển số xe' },
  { key: 'apartment_number', name: 'Thuộc căn hộ' },
  { key: 'block_number', name: 'Block' },
  { key: 'identity_card_number', name: 'CMND / Thẻ căn cước' },
  { key: 'parking_no', name: 'Thẻ gửi xe' },
  { key: 'type', name: 'Loại xe' },
  { key: 'status', name: 'Trạng thái' },
  {
    name: 'Ngày bắt đầu',
    renderCellContent: (record) => {
      if (record.start_date !== null)
        return dayjs(record.start_date).format(DATE_FORMAT);

      return '';
    },
  },
  {
    name: 'Ngày hủy',
    renderCellContent: (record) => {
      if (record.cancellation_date !== null)
        return dayjs(record.cancellation_date).format(DATE_FORMAT);

      return '';
    },
  },
  {
    name: 'Hành động',
    renderCellContent: (record) => (
      <Grid container>
        <Restriction privilege={PRIVILEGES.approveVehicle.value}>
          <CancelButton vehicle={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.approveVehicle.value}>
          <ApproveButton vehicle={record} />
        </Restriction>
        <Restriction privilege={PRIVILEGES.writeVehicle.value}>
          <EditButton vehicle={record} />
        </Restriction>
      </Grid>
    ),
  },
];
