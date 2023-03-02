const statusClass = (param: string) => {
  let complete = false;
  let current = false;
  let invalid = false;
  let disabled = false;
  switch (param) {
    case 'complete':
      complete = true;
      break;
    case 'current':
      current = true;
      break;
    case 'invalid':
      invalid = true;
      break;
    case 'disabled':
      invalid = true;
      break;
  }
  return {
    complete, current, invalid, disabled
  };
};

export default statusClass;
