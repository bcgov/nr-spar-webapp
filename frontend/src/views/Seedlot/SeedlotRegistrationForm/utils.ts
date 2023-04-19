import { ownerTemplate } from '../../../components/SeedlotRegistrationSteps/OwnershipStep/constants';
import DropDownObj from '../../../types/DropDownObject';

export const initCollectionState = (
  defaultAgency: string,
  defaultCode: string
) => ({
  collectorAgency: defaultAgency,
  locationCode: defaultCode,
  startDate: '',
  endDate: '',
  numberOfContainers: '1',
  volumePerContainers: '1',
  volumeOfCones: '1',
  aerialRanking: false,
  aerialClippingTopping: false,
  felledTrees: false,
  climbing: false,
  squirrelCache: false,
  ground: false,
  squirrelHarvesting: false,
  other: false,
  collectionMethodName: '',
  comments: ''
});

export const initOwnershipState = (
  defaultAgency: string,
  defaultCode: string
) => {
  const initialOwnerState = { ...ownerTemplate };
  initialOwnerState.id = 0;
  initialOwnerState.ownerAgency = defaultAgency;
  initialOwnerState.ownerCode = defaultCode;
  initialOwnerState.ownerPortion = '100';
  return initialOwnerState;
};

export const initInterimState = (
  defaultAgency: string,
  defaultCode: string
) => ({
  agencyName: defaultAgency,
  locationCode: defaultCode,
  startDate: '',
  endDate: '',
  storageLocation: '',
  facilityType: 'OCV'
});

export const initOrchardState = () => (
  {
    orchardId: '',
    orchardName: '',
    additionalId: '',
    additionalName: '',
    femaleGametic: '',
    maleGametic: '',
    controlledCross: true,
    biotechProcess: true,
    noPollenContamination: true,
    breedingPercentage: '0',
    pollenMethodology: true
  }
);

const dropDownItem: DropDownObj = {
  label: '',
  code: '',
  description: ''
};

export const getDropDownList = (dataList: any) => {
  const resultList = [];
  const len = dataList.length;
  for (let i = 0; i < len; i += 1) {
    const data = dataList[i];
    const newItem = { ...dropDownItem };
    newItem.code = data.code;
    newItem.description = data.description;
    newItem.label = `${data.code} - ${data.description}`;
    resultList.push(newItem);
  }
  resultList.sort((a, b) => (
    a.label.toLocaleLowerCase() < b.label.toLocaleLowerCase()
      ? -1
      : 1
  ));
  return resultList;
};

export const initExtractionStorageState = (
  defaultAgency: string,
  defaultCode: string
) => (
  {
    extractoryAgency: defaultAgency,
    extractoryLocationCode: defaultCode,
    extractionStartDate: '',
    extractionEndDate: '',
    seedStorageAgency: defaultAgency,
    seedStorageLocationCode: defaultCode,
    seedStorageStartDate: '',
    seedStorageEndDate: ''
  }
);
