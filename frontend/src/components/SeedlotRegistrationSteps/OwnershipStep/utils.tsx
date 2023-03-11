export interface SingleOwnerForm {
  id: number,
  ownerAgency: string,
  ownerCode: string,
  ownerPortion: number,
  reservedPerc: number,
  surplusPerc: number,
  fundingSource: string,
  methodOfPayment: string
}

const ownerTemplate = {
  id: -1,
  ownerAgency: '',
  ownerPortion: 0,
  ownerCode: '',
  reservedPerc: 100,
  surplusPerc: 0,
  fundingSource: '',
  methodOfPayment: ''
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

// Assume the fullString is in the form of '0032 - Strong Seeds Orchard - SSO'
// returns the middle string, e.g. 'Strong Seeds Orchard'
export const getAgencyName = (fullString: string) => {
  // TODO: remove this if statement later before PR
  if (!fullString.includes('-')) {
    return fullString;
  }

  const splitArr = fullString.split(' - ');
  if (splitArr.length === 3) {
    return splitArr[1];
  }
  return '';
};
