import { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import RateReviewIcon from '@material-ui/icons/RateReview';

import storageService from 'services/storage';
import { Repair } from 'types/repair';

import RepairFormContext from '../../contexts/RepairFormContext';

interface RateButtonProps {
  repair: Repair;
}

const RateButton: React.FC<RateButtonProps> = ({ repair }) => {
  const { onRate } = useContext(RepairFormContext);

  const apartment_id = storageService.getItem<string>('apartment_id') ?? '';

  const visibility =
    repair.status === 'Đã xử lý' && repair.apartment_id === apartment_id;

  if (!visibility) return null;

  return (
    <Tooltip title="Đánh giá">
      <IconButton onClick={onRate?.(repair)}>
        <RateReviewIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default RateButton;
