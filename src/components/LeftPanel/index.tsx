import React from 'react';

import './styles.css';

import { SideNav, SideNavItems, SideNavLink } from '@carbon/react';

import * as Icons from '@carbon/icons-react';

const LeftPanel = ({ listItems }: any) => (
  <SideNav
    isFixedNav
    expanded
    isChildOfHeader
    aria-label="Side navigation"
  >
    <div className="left-panel">
      <SideNavItems>
        <div className="top-container">
          {listItems.map((item: any) => (
            <SideNavLink
              className="sub-item"
              key={item.name}
              title={item.name}
              disabled
            >
              {item.name}
              {item.items.map((subItem: any) => {
                const IconComponent = Icons[subItem.icon];
                return (
                  <SideNavLink
                    className="sub-item"
                    key={subItem.name}
                    renderIcon={IconComponent || ''}
                    href={!subItem.disabled ? subItem.link : null}
                    selected
                  >
                    {subItem.name}
                  </SideNavLink>
                );
              })}
            </SideNavLink>
          ))}
        </div>
        <div className="bottom-container">
          <SideNavLink className="sub-item" disabled>
            Support
          </SideNavLink>
          <SideNavLink className="sub-item" renderIcon={Icons.Help}>
            Need help?
          </SideNavLink>
        </div>
      </SideNavItems>
    </div>
  </SideNav>
);

export default LeftPanel;
