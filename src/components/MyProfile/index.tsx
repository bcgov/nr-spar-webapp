import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  SideNavLink
} from '@carbon/react';
import * as Icons from '@carbon/icons-react';

import AvatarImage from '../AvatarImage';
import PanelSectionName from '../PanelSectionName';

import UserData from '../../mock-data/UserData';
import AccountOptions from '../../mock-data/AccountOptions';

import './style.scss';

const MyProfile = () => {
  const navigate = useNavigate();

  const goOut = () => {
    navigate('/logout');
  };

  return (
    <>
      <div className="user-info-section">
        <div className="user-image">
          <AvatarImage userName={UserData.name} size="large" />
        </div>
        <div className="user-data">
          <p className="user-name">{UserData.name}</p>
          <p>{`IDIR: ${UserData.idir}`}</p>
          <p>{UserData.email}</p>
        </div>
      </div>
      <hr className="divisory" />
      <nav className="account-nav">
        <ul>
          <PanelSectionName title="Change account" />
          {AccountOptions.map((option) => {
            const IconComponent = Icons[option.icon];
            return (
              <SideNavLink
                key={option.header}
                renderIcon={IconComponent || ''}
                onClick={() => {
                  navigate(`${option.url}`);
                }}
              >
                {option.header}
              </SideNavLink>
            );
          })}
          <PanelSectionName title="Options" />
          <SideNavLink
            renderIcon={Icons.UserFollow}
            onClick={goOut}
          >
            Sign out
          </SideNavLink>
        </ul>
      </nav>
    </>
  );
};

export default MyProfile;
