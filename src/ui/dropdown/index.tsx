import React, {
  FC,
  memo,
  ReactNode,
  RefObject,
  MouseEventHandler,
} from 'react';
import { Popper, Grow, Paper, ClickAwayListener } from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper';
import clsx from 'clsx';
import useStyles from './styles';

export const DropdownComponent: FC<DropdownProps> = ({
  className,
  popperClassName,
  id,
  anchorRef,
  show,
  onClose,
  onToggle,
  toggleButton,
  placement = 'bottom-end',
  children,
}) => {
  const classes = useStyles({ show });

  return (
    <>
      <div
        className={className}
        ref={anchorRef}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-controls={id}
        aria-haspopup
      >
        {toggleButton}
      </div>
      <Popper
        transition
        disablePortal
        open={show}
        anchorEl={anchorRef.current}
        placement={placement}
        className={clsx(classes.popper, popperClassName)}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={onClose}>
                {children}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const Dropdown = memo(DropdownComponent);
Dropdown.displayName = 'Dropdown';
export default Dropdown;

export interface DropdownProps {
  anchorRef: RefObject<HTMLDivElement>;
  children: ReactNode;
  className?: string;
  id: string;
  onClose: MouseEventHandler<unknown>;
  onToggle: VoidFunction;
  placement?: PopperProps['placement'];
  popperClassName?: string;
  show: boolean;
  toggleButton: ReactNode;
}
