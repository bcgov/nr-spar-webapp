import { Server } from 'miragejs';
import AppSchema from '../schema';
import getUrl from '../../api-service/ApiUtils';
import ApiAddresses from '../../api-service/ApiAddresses';

const ApplicantInfoEndpoint = (server: Server) => {
  server.get(getUrl(ApiAddresses.ApplicantInfoRetrieveAll, true), (schema: AppSchema) => schema.all('applicantInfo'));
};

export default ApplicantInfoEndpoint;
