import React from 'react';

import { SideNav, SideNavItems, SideNavLink } from '@carbon/react';

import * as Icons from '@carbon/icons-react';

const LeftPanel = ({ listItems }: any) => (
  <SideNav isFixedNav expanded isChildOfHeader aria-label="Side navigation">
    <SideNavItems>
      {listItems.map((item: any) => (
        <div key={item.name}>
          <SideNavLink key={item.name} title={item.name} disabled>
            {item.name}
          </SideNavLink>
          {item.items.map((subItem: any) => {
            const IconComponent = Icons[subItem.icon];
            return (
              <SideNavLink
                key={subItem.name}
                renderIcon={IconComponent || ''}
                href={!subItem.disabled ? subItem.link : null}
                isActive={window.location.pathname === subItem.link}
              >
                {subItem.name}
              </SideNavLink>
            );
          })}
        </div>
      ))}

      <SideNavLink disabled>Support</SideNavLink>
      <SideNavLink renderIcon={Icons.Help}>Need help?</SideNavLink>
    </SideNavItems>
  </SideNav>
);

export default LeftPanel;
