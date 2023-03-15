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

// The sum of reserved and surplus should be 100, if one is changed, auto calc the other one
export const calcResvOrSurp = (
  index: number,
  field: string,
  value: string,
  currentArray: Array<SingleOwnerForm>
) => {
  const theOther = field === 'reservedPerc' ? 'surplusPerc' : 'reservedPerc';
  let theOtherValue = String((100 - Number(value)).toFixed(2));
  // If the other value is an int then show a whole number
  if (Number(theOtherValue) % 1 === 0) {
    theOtherValue = Number(theOtherValue).toFixed(0);
  }
  const newArr = [...currentArray];
  newArr[index] = {
    ...newArr[index],
    [theOther]: theOtherValue
  };
  return newArr;
};

// export const validateInput = (inputName: string, inputValue: string) => {

// };
