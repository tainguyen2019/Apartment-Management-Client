import React, { FC, memo } from 'react';
import { MenuList } from '@material-ui/core';
import clsx from 'clsx';
import Dropdown, { DropdownProps } from 'ui/dropdown';
import useDropdown from 'hooks/useDropdown';
import useStyles from './styles';

export const DropdownMenuComponent: FC<DropdownMenuProps> = ({
  children,
  popperClassName,
  ...props
}) => {
  const { anchorRef, handleClose, handleListKeyDown, handleToggle, show } =
    useDropdown();
  const classes = useStyles({ show });

  return (
    <Dropdown
      {...props}
      anchorRef={anchorRef}
      onClose={handleClose}
      onToggle={handleToggle}
      popperClassName={clsx(classes.popper, popperClassName)}
      show={show}
    >
      <MenuList
        autoFocusItem={show}
        onClick={handleClose}
        onKeyDown={handleListKeyDown}
      >
        {children}
      </MenuList>
    </Dropdown>
  );
};

const DropdownMenu = memo(DropdownMenuComponent);
DropdownMenu.displayName = 'DropdownMenu';
export default DropdownMenu;

export interface DropdownMenuProps
  extends OmitFrom<
    DropdownProps,
    'anchorRef' | 'show' | 'onToggle' | 'onClose'
  > {}
