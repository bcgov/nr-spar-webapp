import { Server } from 'miragejs';

const RecentActivitiesEndpoints = (server: Server) => {
  server.get('/recent-activities', ({ db }) => db.recent);
};

export default RecentActivitiesEndpoints;
