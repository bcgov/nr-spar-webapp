import { env } from '../env';
import ApiAddresses from './ApiAddresses';

const serverUrl = (): string => {
  if (env.REACT_APP_ENABLE_MOCK_SERVER === 'true') {
    return '/mock-api';
  }

  return env.REACT_APP_SERVER_URL;
};

const getUrl = (apiAddress: ApiAddresses, mockServer: boolean = false): string => {
  // Favourite activities
  let favouriteActivitiesRetrieveUrl = '/api/favourite-activities';
  let favouriteActivitiesUpdateUrl = '/api/favourite-activities/:id';
  let favouriteActivitiesDeleteUrl = '/api/favourite-activities/:id';

  // Recent activities
  let recentActivitiesRetrieveAll = '/api/recent-activities';

  // Genetic classes
  let geneticClassesRetrieveAll = '/api/genetic-classes';

  // Applicant Info
  let applicantInfoRetrieveAll = '/api/application-info';

  // A Class Seedlot Register
  let aClassSeedlotPostUrl = '/api/register-a-class';

  // Mocks
  if (env.REACT_APP_ENABLE_MOCK_SERVER === 'true') {
    // Favourite activities
    favouriteActivitiesRetrieveUrl = '/favourite-activities';
    favouriteActivitiesUpdateUrl = '/favourite-activities/del/:id';
    favouriteActivitiesDeleteUrl = '/favourite-activities/up/:id';

    // Recent activities
    recentActivitiesRetrieveAll = '/recent-activities';

    // Genetic classes
    geneticClassesRetrieveAll = '/genetic-classes';

    // Applicant Info
    applicantInfoRetrieveAll = '/application-info';

    // A Class Seedlot Register
    aClassSeedlotPostUrl = '/register-a-class';
  }

  let server = serverUrl();
  if (mockServer) {
    server = '';
  }

  switch (apiAddress) {
    case ApiAddresses.FavouriteActiviteRetrieveAll:
      return `${server}${favouriteActivitiesRetrieveUrl}`;
    case ApiAddresses.FavouriteActiviteSave:
      return `${server}${favouriteActivitiesUpdateUrl}`;
    case ApiAddresses.FavouriteActiviteDelete:
      return `${server}${favouriteActivitiesDeleteUrl}`;
    case ApiAddresses.RecentActivitiesRetrieveAll:
      return `${server}${recentActivitiesRetrieveAll}`;
    case ApiAddresses.GeneticClassesRetrieveAll:
      return `${server}${geneticClassesRetrieveAll}`;
    case ApiAddresses.ApplicantInfoRetrieveAll:
      return `${server}${applicantInfoRetrieveAll}`;
    case ApiAddresses.AClassSeedlotPost:
      return `${server}${aClassSeedlotPostUrl}`;
    default:
      return '';
  }
};

export default getUrl;
