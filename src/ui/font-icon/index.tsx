import React, { FC, memo } from 'react';
import { FontIconType } from 'types/fontIcons';
import { Icon } from '@material-ui/core';
import { IconProps } from '@material-ui/core/Icon';

export const FontIconComponent: FC<FontIconProps> = ({ type, ...props }) => (
  <Icon {...props}>{type}</Icon>
);

const FontIcon = memo(FontIconComponent);
FontIcon.displayName = 'FontIcon';
export default FontIcon;

export interface FontIconProps extends IconProps {
  type: FontIconType;
}
