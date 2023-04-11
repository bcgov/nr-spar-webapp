import { Server } from 'miragejs';
import ApiAddresses from '../../api-service/ApiAddresses';
import getUrl from '../../api-service/ApiUtils';

const RecentActivitiesEndpoints = (server: Server) => {
  server.get(getUrl(ApiAddresses.RecentActivitiesRetrieveAll, true), ({ db }) => db.recent);
};

export default RecentActivitiesEndpoints;
