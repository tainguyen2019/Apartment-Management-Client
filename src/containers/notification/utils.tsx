import dayjs from 'dayjs';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { ColumnOptionsList } from 'components/common/my-table';
import Attachment from 'components/common/attachment';
import Restriction from 'components/common/restriction';
import { DATE_FORMAT } from 'constants/common';
import { RecordEditor } from 'types/common';
import { Notification } from 'types/notification';
import { PRIVILEGES } from 'constants/users';

import PublishButton from './components/publish-button';
import UnpublishButton from './components/unpublish-button';
import storageService from 'services/storage';

export const createNotificationCols = (
  onEdit: RecordEditor<Notification>,
  page: number,
  pageSize: number,
): ColumnOptionsList<Notification> => {
  let columns: ColumnOptionsList<Notification> = [
    {
      name: 'STT',
      renderCellContent: (_, index) => (page - 1) * pageSize + (index + 1),
    },
    { key: 'title', name: 'Tiêu đề' },
    { key: 'content', name: 'Nội dung tóm tắt' },
    { key: 'staff_name', name: 'Người tạo' },
    {
      name: 'Ngày đăng',
      renderCellContent: ({ date }) => {
        if (date !== null) return dayjs(date).format(DATE_FORMAT);

        return '';
      },
    },
    {
      key: 'attachment',
      name: 'File đính kèm',
      renderCellContent: ({ attachment }) =>
        attachment && <Attachment fileName={attachment} />,
    },
  ];

  if (storageService.getItem<string>('staff_id')) {
    columns.push(
      { key: 'status', name: 'Trạng thái' },
      {
        name: 'Hành động',
        renderCellContent: (record) => (
          <Grid container>
            {record.status === 'Chưa đăng' && (
              <Restriction privilege={PRIVILEGES.writeNotification.value}>
                <Tooltip title="Chỉnh sửa" key={record.id}>
                  <IconButton onClick={onEdit(record)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Restriction>
            )}
            <Restriction privilege={PRIVILEGES.approveNotification.value}>
              <PublishButton notification={record} />
            </Restriction>
            <Restriction privilege={PRIVILEGES.approveNotification.value}>
              <UnpublishButton notification={record} />
            </Restriction>
          </Grid>
        ),
      },
    );
  }

  return columns;
};
