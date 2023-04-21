import { geneticTraits } from './constants';
import { GeneticTraitsType } from './definitions';

export const getGeneticWorths = (seedlotSpecies: string):Array<GeneticTraitsType> => {
  const genenticTraitsForSpecies:Array<GeneticTraitsType> = [];
  switch (seedlotSpecies) {
    case 'CW':
      genenticTraitsForSpecies.push(
        geneticTraits.ad,
        geneticTraits.dfu,
        geneticTraits.gvo,
        geneticTraits.wdu
      );
      break;
    case 'PLI':
      genenticTraitsForSpecies.push(
        geneticTraits.dfs,
        geneticTraits.dsc,
        geneticTraits.dsg,
        geneticTraits.gvo
      );
      break;
    case 'FDC':
      genenticTraitsForSpecies.push(
        geneticTraits.dfw,
        geneticTraits.gvo,
        geneticTraits.wwd
      );
      break;
    case 'PW':
      genenticTraitsForSpecies.push(
        geneticTraits.dsb
      );
      break;
    case 'DR':
    case 'EP':
    case 'FDI':
    case 'HW':
    case 'LW':
    case 'PY':
    case 'SS':
    case 'SX':
      genenticTraitsForSpecies.push(
        geneticTraits.gvo
      );
      break;
    default:
  }
  return genenticTraitsForSpecies;
};

export const generateKey = (prefix: string) => `${prefix}-${new Date().getTime()}`;
