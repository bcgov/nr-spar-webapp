export interface ComboBoxEvent {
  selectedItem: string;
}

export interface CollectionForm {
  collectorAgency: string,
  locationCode: string,
  startDate: string;
  endDate: string;
  numberOfContainers: string;
  volumePerContainers: string;
  volumeOfCones: string;
  comments: string;
}
export interface CollectionStepProps {
  state: CollectionForm,
  setStepData: Function,
  defaultAgency: string,
  defaultCode: string,
  agencyOptions: Array<string>
}

export type FormValidation = {
  isNameInvalid: boolean,
  isLocationCodeInvalid: boolean,
  isStartDateInvalid: boolean,
  isEndDateInvalid: boolean,
  isNumberOfContainersInvalid: boolean,
  isVolumePerContainersInvalid: boolean,
  isVolumeOfConesInvalid: boolean,
  isCollectionMethodsInvalid: boolean,
}
