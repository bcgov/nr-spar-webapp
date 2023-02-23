enum ActivitiesEnum {
  PARENT_TREE_ORCHARD = 'PARENT_TREE_ORCHARD',
  SEEDLOT_REGISTRATION = 'SEEDLOT_REGISTRATION',
  SEEDLING_REQUEST = 'SEEDLING_REQUEST'
};

interface ActivityProps { icon: string, header: string; description: string; link: string };

const ACTIVITY_TYPE = {
  PARENT_TREE_ORCHARD: {
    icon: 'Tree',
    header: 'Parent tree orchard',
    description:
      'Manage the parent trees inside your orchard and look for their latest reports and the latest data. ',
    link: '#'
  },
  SEEDLOT_REGISTRATION: {
    icon: 'SoilMoistureField',
    header: 'Seedlot registration',
    description:
      'Start a new registration or check on existing seedlots registrations',
    link: '#'
  },
  SEEDLING_REQUEST: {
    icon: 'CropGrowth',
    header: 'Seedling request',
    description: 'Open a new seedling request for your reforestation needs.',
    link: '#'
  }
};

const getActivityProps = (act: string): ActivityProps => {
  let actEnum = ActivitiesEnum.SEEDLING_REQUEST;

  switch (act){
    case ActivitiesEnum.PARENT_TREE_ORCHARD:
      actEnum = ActivitiesEnum.PARENT_TREE_ORCHARD;
      break;
    case ActivitiesEnum.SEEDLOT_REGISTRATION:
      actEnum = ActivitiesEnum.SEEDLOT_REGISTRATION;
      break;
    case ActivitiesEnum.SEEDLING_REQUEST:
      actEnum = ActivitiesEnum.SEEDLING_REQUEST;
      break;
    default:
      console.warn(`Unexpected activity value, props for ${act} not found`);
      break;
  }
  return ACTIVITY_TYPE[actEnum];
};

export default getActivityProps;
