export interface SingleOwnerForm {
  id: number,
  ownerAgency: string,
  ownerCode: string,
  ownerPortion: string,
  reservedPerc: string,
  surplusPerc: string,
  fundingSource: string,
  methodOfPayment: string,
  isAgencyInvalid: boolean,
  isPortionInvalid: boolean,
  isOwnerCodeInvalid: boolean,
  isReservedInvalid: boolean,
  isSurplusInvalid: boolean,
  isSourceInvalid: boolean,
  isPaymentInvalid: boolean,
}

export interface ComboBoxEvent {
  selectedItem: string;
}

const ownerTemplate = {
  id: -1,
  ownerAgency: '',
  ownerPortion: '0.00',
  ownerCode: '',
  reservedPerc: '100.00',
  surplusPerc: '0.00',
  fundingSource: '',
  methodOfPayment: '',
  isAgencyInvalid: false,
  isPortionInvalid: false,
  isOwnerCodeInvalid: false,
  isReservedInvalid: false,
  isSurplusInvalid: false,
  isSourceInvalid: false,
  isPaymentInvalid: false
};

const getNextId = (currentArray: Array<SingleOwnerForm>) => {
  let max = -1;
  currentArray.forEach((obj) => {
    if (obj.id > max) {
      max = obj.id;
    }
  });
  return max + 1;
};

export const insertOwnerForm = (currentArray: Array<SingleOwnerForm>) => {
  const newForm = { ...ownerTemplate };
  newForm.id = getNextId(currentArray);
  return [...currentArray, newForm];
};

export const deleteOwnerForm = (id: number, currentArray: Array<SingleOwnerForm>) => {
  if (id === 0) {
    return currentArray;
  }
  const newForm = currentArray.filter((obj) => obj.id !== id);
  return newForm;
};

// Assume the fullString is in the form of '0032 - Strong Seeds Orchard - SSO'
// Returns the middle string, e.g. 'Strong Seeds Orchard'
export const getAgencyName = (fullString: string | null) => {
  if (fullString === null || !fullString.includes('-')) {
    return 'Owner agency name';
  }

  const splitArr = fullString.split(' - ');
  if (splitArr.length === 3) {
    return splitArr[1];
  }
  return '';
};

export const formatPortionPerc = (value: string) => {
  if (value === null || value === '' || Number(value) === 0) {
    return '--';
  }
  // If the value is an integer return the whole number
  if (Number(value) % 1 === 0) {
    return Number(value).toFixed(0);
  }
  return value;
};

// export const validateInput = (inputName: string, inputValue: string) => {

// };
