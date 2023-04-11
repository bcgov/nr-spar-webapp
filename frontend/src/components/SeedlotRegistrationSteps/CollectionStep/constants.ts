const DATE_FORMAT = 'Y/m/d';

const fieldsConfig = {
  checkbox: {
    name: 'applicant',
    labelText: 'Use applicant agency as collector agency'
  },
  collector: {
    name: 'collectorAgency',
    placeholder: 'Enter or choose your agency',
    titleText: 'Cone Collector agency',
    helperText: 'You can enter the agency number, name or acronym',
    invalidText: 'Please choose a valid collector agency, filter with agency number, name or acronym'
  },
  code: {
    name: 'locationCode',
    placeholder: 'Example: 00',
    label: 'Cone Collector location code',
    helperText: '2-digit code that identifies the address of operated office or division',
    invalidText: 'Please enter a valid 2-digit code that identifies the address of operated office or division'
  },
  startDate: {
    name: 'starDate',
    placeholder: 'yyyy/mm/dd',
    labelText: 'Collection start date',
    helperText: 'year/month/day',
    invalidText: 'Please enter a valid date'
  },
  endDate: {
    name: 'endDate',
    placeholder: 'yyyy/mm/dd',
    labelText: 'Collection end date',
    helperText: 'year/month/day',
    invalidText: 'Please enter a valid date'
  },
  numberOfContainers: {
    name: 'numberOfContainers',
    labelText: 'Number of Containers',
    invalidText: 'Number is not valid'
  },
  volumePerContainers: {
    name: 'volumePerContainers',
    labelText: 'Volume per Containers (HI)',
    invalidText: 'Number is not valid'
  },
  volumeOfCones: {
    name: 'volumeOfCones',
    labelText: 'Volume of Cones (HI)',
    invalidText: 'Number is not valid',
    helperText: 'This value should be the "Volume per container" X "Number of containers".'
  },
  comments: {
    name: 'comments',
    labelText: 'Comments (optional)',
    placeholder: 'Additional comments about the seedlot'
  }
};

export { DATE_FORMAT, fieldsConfig };
