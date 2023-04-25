import { ConeAndPollenEntriesType, ConeAndPollenType } from '../../../types/SeedlotTypes/ParentTree';
import { geneticTraits } from './constants';
import { GeneticTraitsType, ParentTreesIdType } from './definitions';

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

export const createEmptyConeAndPollen = (parentTrees: Array<ParentTreesIdType>) => {
  const parentTreeEntries: ConeAndPollenEntriesType[] = [];

  parentTrees.forEach((element) => {
    const parentTreeEntry: ConeAndPollenEntriesType = {
      cloneNumber: +element.id,
      coneCount: 0,
      pollenCount: 0,
      smpSuccess: 0,
      ad: 0,
      dfs: 0,
      dfu: 0,
      dfw: 0,
      dsb: 0,
      dsc: 0,
      dsg: 0,
      gvo: 0,
      iws: 0,
      wdu: 0,
      wwd: 0,
      wve: 0
    };
    parentTreeEntries.push(parentTreeEntry);
  });

  const coneAndPollenEmptyData: ConeAndPollenType = {
    coneAndPollenEntries: parentTreeEntries,
    totalParentTreesConeAndPollen: 0,
    totalConeCount: 0,
    totalPollenCount: 0,
    averageSMP: 0,
    populationSize: 0,
    testedParentTree: 0,
    coancestry: 0,
    smpParents: 0,
    genTraitTotal: {
      adTotal: 0,
      dfsTotal: 0,
      dfuTotal: 0,
      dfwTotal: 0,
      dsbTotal: 0,
      dscTotal: 0,
      dsgTotal: 0,
      gvoTotal: 0,
      iwsTotal: 0,
      wduTotal: 0,
      wwdTotal: 0,
      wveTotal: 0
    }
  };

  return coneAndPollenEmptyData;
};
