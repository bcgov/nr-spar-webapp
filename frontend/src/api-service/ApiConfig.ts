import { env } from '../env';
import mockServerConfig from '../mock-server/config';

const serverHost = env.REACT_APP_SERVER_URL;

const oracleServerHost = env.REACT_APP_ORACLE_SERVER_URL;

const mockServerHost = mockServerConfig.namespace;

const ApiConfig = {
  // Favourite activities
  favouriteActivities: `${serverHost}/api/favourite-activities`,

  // Recent activities
  recentActivities: `${mockServerHost}/api/recent-activities`,

  // Genetic classes
  geneticClasses: `${serverHost}/api/genetic-classes`,

  // Applicant Info
  applicantInfo: `${mockServerHost}/api/application-info`,

  // A Class Seedlot Register
  aClassSeedlot: `${mockServerHost}/api/register-a-class`,

  // Seedlot
  seedlot: `${mockServerHost}/api/seedlot`,

  // Seedlot orchard step register
  seedlotOrchardStep: `${mockServerHost}/api/seedlot/orchard`,

  // Orchard
  orchard: `${mockServerHost}/api/orchard`,

  // Vegetation Code
  vegetationCode: `${oracleServerHost}/api/vegetation-codes`
};

export default ApiConfig;
