import React, { FC, memo } from 'react';
import { LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as MuiLink } from '@material-ui/core';
import { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import ForwardRefRouterLink from '../forward-ref-router-link';

export const LinkComponent: FC<LinkProps> = (props) => (
  <MuiLink {...props} component={ForwardRefRouterLink} />
);

const Link = memo(LinkComponent);
Link.displayName = 'Link';
export default Link;

export type LinkProps = OmitFrom<RouterLinkProps, 'innerRef'> & MuiLinkProps;
