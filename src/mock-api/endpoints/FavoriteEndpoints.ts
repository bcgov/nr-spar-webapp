import { Server } from 'miragejs';
import AppSchema from '../schema';

const FavoriteEndpoints = (server: Server) => {
  server.get('/favorite-activities', (schema: AppSchema) => schema.all('favorites'));

  server.del('/favorite-activities/del/:id', (schema: AppSchema, request) => {
    const { id } = request.params;
    const card = schema.find('favorites', id);
    if (card !== null) {
      card.destroy();
    }
    return {
      status: 'OK'
    };
  });

  server.put('/favorite-activities/up/:id', (schema: AppSchema, request) => {
    const { id } = request.params;
    const attrs = JSON.parse(request.requestBody);
    const card = schema.find('favorites', id);
    if (card !== null) {
      card.update(attrs);
    }
    return {
      status: 'OK'
    };
  });
};

export default FavoriteEndpoints;
