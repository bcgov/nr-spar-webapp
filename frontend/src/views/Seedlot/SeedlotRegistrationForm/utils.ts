import { ownerTemplate } from '../../../components/SeedlotRegistrationSteps/OwnershipStep/constants';

export const initOwnershipState = (
  defaultAgency: string,
  defaultCode: string,
  defaultPayment: string
) => {
  const initialOwnerState = { ...ownerTemplate };
  initialOwnerState.id = 0;
  initialOwnerState.ownerAgency = defaultAgency;
  initialOwnerState.ownerCode = defaultCode;
  initialOwnerState.ownerPortion = '100';
  initialOwnerState.methodOfPayment = defaultPayment;
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
