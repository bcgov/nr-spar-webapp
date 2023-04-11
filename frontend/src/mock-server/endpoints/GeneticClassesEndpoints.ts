import { Server } from 'miragejs';
import AppSchema from '../schema';
import getUrl from '../../api-service/ApiUtils';
import ApiAddresses from '../../api-service/ApiAddresses';

const GeneticClassesEndpoints = (server: Server) => {
  server.get(getUrl(ApiAddresses.GeneticClassesRetrieveAll, true), (schema: AppSchema) => schema.all('geneticClasses'));
};

export default GeneticClassesEndpoints;
