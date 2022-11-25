import React from 'react';
import { Outlet } from 'react-router-dom';

import { FlexGrid } from '@carbon/react';

import BCHeader from '../../components/BCHeader';

import LeftPanel from '../../components/LeftPanel';

import './styles.css';

import LeftPanelItems from '../../mock-data/LeftPanelItems';
import { Content } from '@carbon/react';

const listItems = LeftPanelItems;

const Layout = () => (
  <>
    <BCHeader />
    <div className="mainContainer">
      <LeftPanel listItems={listItems} />
      <Content>
        <Outlet />
      </Content>
    </div>
  </>
);

export default Layout;
