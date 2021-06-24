import { Tooltip, IconButton } from '@material-ui/core';
import { Reply as ReplyIcon } from '@material-ui/icons';
import { useContext } from 'react';
import storageService from 'services/storage';

import { Reflect } from 'types/reflect';
import ReflectFormContext from '../../contexts/ReflectFormContext';

interface AnswerButtonProps {
  reflect: Reflect;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ reflect }) => {
  const { onAnswer } = useContext(ReflectFormContext);
  const department_id = storageService.getItem('department_id') || '';

  const visibility =
    reflect.status === 'Chờ trả lời' && reflect.department_id === department_id;

  if (!visibility) return null;

  return (
    <Tooltip title="Trả lời">
      <IconButton onClick={onAnswer?.(reflect)}>
        <ReplyIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AnswerButton;
