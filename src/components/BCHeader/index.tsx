import React from 'react';

import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Theme,
} from '@carbon/react';
import { Search, Notification, Switcher } from '@carbon/icons-react';

const BCHeader = () => (
  <Theme theme="g100">
    <Header aria-label="BC Gov's NR Sample App" data-testid="header">
      <HeaderName href="/" prefix="SPAR" data-testid="header-name">
        Seed Planning and Registry System
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Search"
          data-testid="header-button__search"
        >
          <Search size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Notifications"
          data-testid="header-button__notifications"
        >
          <Notification size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="App Switcher"
          tooltipAlignment="end"
          data-testid="header-button__switcher"
        >
          <Switcher size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  </Theme>
);

export default BCHeader;
