/* eslint-disable import/no-unresolved */
import {
  createServer
} from 'miragejs';

import mockServerConfig from './config';

import endpoints from './endpoints';
import fixtures from './fixtures';
import models from './models';
import { env } from '../env';

// eslint-disable-next-line
export default function makeServer(environment = 'development') {
  const mirageServer = createServer({
    models,
    fixtures,
    environment,
    seeds(server) {
      const dbData = localStorage.getItem('spar-mock-db');
      if (dbData) {
        server.db.loadData(JSON.parse(dbData));
      } else {
        server.loadFixtures();
      }
    },
    routes() {
      this.passthrough(`${env.REACT_APP_SERVER_URL}/api/**`);
      this.passthrough('https://test.loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect/token');
      this.passthrough('https://dev.loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect/token');
      this.namespace = mockServerConfig.namespace;
    }
  });

  Object.keys(endpoints).forEach((enpoint) => {
    // @ts-ignore
    endpoints[enpoint](mirageServer);
  });

  mirageServer.pretender.handledRequest = (verb) => {
    if (verb.toLowerCase() !== 'get' && verb.toLowerCase() !== 'head') {
      localStorage.setItem('spar-mock-db', JSON.stringify(mirageServer.db.dump()));
    }
  };
}
