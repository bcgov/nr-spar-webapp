import ApiConfig from './ApiConfig';
import api from './api';

const getVegCodes = () => {
  const url = ApiConfig.vegetationCode;
  return api.get(url).then((res) => {
    const vegCodeOptions: Array<string> = [];
    if (res.data) {
      res.data.forEach((vegCode: any) => {
        vegCodeOptions.push(vegCode.description);
      });
    }
    vegCodeOptions.sort((a, b) => (
      a.toLocaleLowerCase() < b.toLocaleLowerCase()
        ? -1
        : 1
    ));
    return vegCodeOptions;
  });
};

export default getVegCodes;
