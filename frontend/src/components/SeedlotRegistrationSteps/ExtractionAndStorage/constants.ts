export const DATE_FORMAT = 'Y/m/d';

export const inputText = {
  extractionTitle: {
    titleText: 'Extraction information',
    subtitleText: 'Enter the extractory agency information and extraction’s star and end dates for this seedlot'
  },
  extractorCheckbox: {
    labelText: 'The extractory agency is the Tree Seed Center (TSC)'
  },
  extractor: {
    placeholder: 'Select Interim agency name',
    titleText: 'Extractory agency',
    helperText: 'You can enter your agency number, name or acronym'
  },
  extractorCode: {
    labelText: 'Extractory agency location code',
    helperText: '2-digit code that identifies the address of operated office or division',
    invalidText: 'Please enter a valid value'
  },
  date: {
    extraction: {
      labelText: {
        start: 'Extraction start date',
        end: 'Extraction end date'
      },
      notification: {
        title: 'Extraction start and end dates',
        subtitle: 'The extraction start and end dates will be filled by the TSC. You will receive a notification once it’s completed.'
      }
    },
    storage: {
      labelText: {
        start: 'Storage start date',
        end: 'Storage end date'
      },
      notification: {
        title: 'Storage start and end dates',
        subtitle: 'The storage start and end dates will be filled by the TSC. You will receive a notification once it’s completed.'
      }
    },
    helperText: 'year/month/day',
    placeholder: 'yyyy/mm/dd',
    invalidText: 'Please enter a valid date'
  },
  storageTitle: {
    titleText: 'Temporary seed storage',
    subtitleText: 'Enter the seed storage agency information and storage’s star and end dates for this seedlot'
  },
  storageCheckbox: {
    labelText: 'The seed storage agency is the Tree Seed Center (TSC)'
  },
  storage: {
    placeholder: 'Select Interim agency name',
    titleText: 'Seed storage agency',
    helperText: 'You can enter your agency number, name or acronym'
  },
  storageCode: {
    labelText: 'Seed storage location code',
    helperText: '2-digit code that identifies the address of operated office or division',
    invalidText: 'Please enter a valid value'
  },
  modal: {
    buttonText: 'Submit registration',
    modalLabel: 'Seedlot registration',
    modalHeading: 'Declaration',
    primaryButtonText: 'Submit seedlot',
    secondaryButtonText: 'Cancel',
    helperText: 'Read and accept the declaration to complete the seedlot registration',
    checkboxLabelText: 'I hereby declare that the information provided in this application is true and correct, and that I am the owner of the seedlot or have been authorized by the owner(s) of the seedlot to submit this application.',
    notification: {
      title: 'Review the form:',
      subtitle: 'Please, be sure to review the content and check if everything is correct with your seedlot registration.',
      link: 'Go to first step and review the form'
    }
  }
};
