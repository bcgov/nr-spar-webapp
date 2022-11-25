import React from 'react';

import './styles.css';

import { SideNav, SideNavItems, SideNavLink, Theme } from '@carbon/react';

import * as Icons from '@carbon/icons-react';

const LeftPanel = ({ listItems }: any) => {
  return (
    <React.Fragment>
      <SideNav
        className="panel"
        aria-label="Side navigation"
        isChildOfHeader={true}
        isFixedNav
        expanded={true}
      >
        <SideNavItems>
          <div className="top-container">
            {listItems.map((item: any) => {
              return (
                <SideNavLink key={item.name} title={item.name} disabled>
                  {item.name}
                  {item.items.map((subItem: any) => {
                    const IconComponent = Icons[subItem.icon];
                    return (
                      <SideNavLink
                        key={subItem.name}
                        renderIcon={IconComponent ? IconComponent : ''}
                        href={!subItem.disabled ? subItem.link : null}
                      >
                        {subItem.name}
                      </SideNavLink>
                    );
                  })}
                </SideNavLink>
              );
            })}
          </div>
          <div className="bottom-container">
            <SideNavLink disabled>
              Support
              <SideNavLink renderIcon={Icons['Help']}>Need help?</SideNavLink>
            </SideNavLink>
          </div>
        </SideNavItems>
      </SideNav>
    </React.Fragment>
  );
};

export default LeftPanel;
