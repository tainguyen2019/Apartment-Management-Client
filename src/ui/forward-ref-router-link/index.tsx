import React, { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const ForwardRefRouterLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link {...props} innerRef={ref} />,
);

ForwardRefRouterLink.displayName = 'ForwardRefRouterLink';
export default ForwardRefRouterLink;
