import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import { Repair } from 'types/repair';
import RepairFormContext from '../../contexts/RepairFormContext';

interface AssignmentButtonProps {
  repair: Repair;
}

const AssignmentButton: React.FC<AssignmentButtonProps> = ({ repair }) => {
  const { onAssignment } = useContext(RepairFormContext);

  const visibility = ['Chờ xử lý', 'Đã phân công'].includes(repair.status);

  if (!visibility) return null;

  return (
    <Tooltip title="Phân công">
      <IconButton onClick={onAssignment?.(repair)}>
        <AssignmentIndIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default AssignmentButton;
