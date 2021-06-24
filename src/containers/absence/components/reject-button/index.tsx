import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { Block as CancelIcon } from '@material-ui/icons';

import { Absence } from 'types/absence';
import AbsenceFormContext from '../../context/AbsenceFormContext';

interface RejectButtonProps {
  absence: Absence;
}

const RejectButton: React.FC<RejectButtonProps> = ({ absence }) => {
  const { onReject } = useContext(AbsenceFormContext);

  const visibility = absence.status === 'Chờ xử lý';

  if (!visibility) return null;

  return (
    <Tooltip title="Từ chối">
      <IconButton onClick={onReject?.(absence)}>
        <CancelIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default RejectButton;
