import React, { FC, memo } from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

export const VersionInfoComponent: FC<VersionInfoProps> = (props) => (
  <Typography {...props}>
    v{process.env.REACT_APP_VERSION || process.env.REACT_APP_TAG || '0.0.0'}
  </Typography>
);

const VersionInfo = memo(VersionInfoComponent);
VersionInfo.displayName = 'VersionInfo';
export default VersionInfo;

export interface VersionInfoProps
  extends OmitFrom<TypographyProps, 'children'> {}
