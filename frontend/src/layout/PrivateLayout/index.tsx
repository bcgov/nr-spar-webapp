import React from 'react';

import { Outlet } from 'react-router-dom';
import { Content } from '@carbon/react';

// import makeServer from '../../mock-server/server';

import BCHeader from '../../components/BCHeader';

import './styles.scss';
// import { env } from '../../env';

// if (env.REACT_APP_NRSPARWEBAPP_VERSION === 'dev') {
//   makeServer('development');
// }

const Layout = () => (
  <>
    <BCHeader />
    <div className="mainContainer">
      <Content className="page-content">
        <Outlet />
      </Content>
    </div>
  </>
);

export default Layout;
