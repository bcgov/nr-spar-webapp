import { useRef, useEffect } from 'react';
import {
  ConeAndPollenEntriesType,
  ConeAndPollenType,
  SMPSuccessEntriesType,
  SMPSuccessType
} from '../../../types/SeedlotTypes/ParentTree';
import { geneticTraits } from './constants';
import { GeneticTraitsType, ParentTreesType } from './definitions';

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
    case 'SS':
    case 'SX':
      genenticTraitsForSpecies.push(
        geneticTraits.iws
      );
      genenticTraitsForSpecies.push(
        geneticTraits.gvo
      );
      break;
    case 'DR':
    case 'EP':
    case 'FDI':
    case 'HW':
    case 'LW':
    case 'PY':
      genenticTraitsForSpecies.push(
        geneticTraits.gvo
      );
      break;
    default:
  }
  return genenticTraitsForSpecies;
};

export const createEmptyConeAndPollen = (parentTrees: Array<ParentTreesType>) => {
  const parentTreeEntries: ConeAndPollenEntriesType[] = [];
  parentTrees.forEach((element) => {
    const parentTreeEntry: ConeAndPollenEntriesType = {
      cloneNumber: +element.value,
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
    geneticWorth: {
      populationSize: 0,
      testedParentTree: 0,
      coancestry: 0,
      smpParents: 0,
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

export const createEmptySMPSuccess = (parentTrees: Array<ParentTreesType>) => {
  const parentTreeEntries: SMPSuccessEntriesType[] = [];
  parentTrees.forEach((element) => {
    const parentTreeEntry: SMPSuccessEntriesType = {
      cloneNumber: +element.value,
      successOnParent: 0,
      nonOrchardPollenContam: 0,
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

  const smpSuccessEmptyData: SMPSuccessType = {
    smpSuccessEntries: parentTreeEntries,
    totalParentTreesSMPSuccess: 0,
    averageNumberSMPSuccess: 0,
    averageNonOrchardPollenContam: 0,
    geneticWorth: {
      populationSize: 0,
      testedParentTree: 0,
      coancestry: 0,
      smpParents: 0,
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

  return smpSuccessEmptyData;
};

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

// These functions will be removed once the real API is connected
const getRandomFloat = () => parseFloat((Math.random() * (10 - 1) + 1).toFixed(4));
export const createRandomConeAndPollen = (
  parentTrees: Array<ParentTreesType>
) => {
  const parentTreeEntries: ConeAndPollenEntriesType[] = [];

  parentTrees.forEach((element: ParentTreesType) => {
    const parentTreeEntry: ConeAndPollenEntriesType = {
      cloneNumber: +element.value,
      coneCount: getRandomFloat(),
      pollenCount: getRandomFloat(),
      smpSuccess: getRandomFloat(),
      ad: getRandomFloat(),
      dfs: getRandomFloat(),
      dfu: getRandomFloat(),
      dfw: getRandomFloat(),
      dsb: getRandomFloat(),
      dsc: getRandomFloat(),
      dsg: getRandomFloat(),
      gvo: getRandomFloat(),
      iws: getRandomFloat(),
      wdu: getRandomFloat(),
      wwd: getRandomFloat(),
      wve: getRandomFloat()
    };
    parentTreeEntries.push(parentTreeEntry);
  });

  const coneAndPollenEmptyData: ConeAndPollenType = {
    coneAndPollenEntries: parentTreeEntries,
    totalParentTreesConeAndPollen: getRandomFloat(),
    totalConeCount: getRandomFloat(),
    totalPollenCount: getRandomFloat(),
    averageSMP: getRandomFloat(),
    geneticWorth: {
      populationSize: getRandomFloat(),
      testedParentTree: getRandomFloat(),
      coancestry: getRandomFloat(),
      smpParents: getRandomFloat(),
      adTotal: getRandomFloat(),
      dfsTotal: getRandomFloat(),
      dfuTotal: getRandomFloat(),
      dfwTotal: getRandomFloat(),
      dsbTotal: getRandomFloat(),
      dscTotal: getRandomFloat(),
      dsgTotal: getRandomFloat(),
      gvoTotal: getRandomFloat(),
      iwsTotal: getRandomFloat(),
      wduTotal: getRandomFloat(),
      wwdTotal: getRandomFloat(),
      wveTotal: getRandomFloat()
    }
  };

  return coneAndPollenEmptyData;
};

export const createRandomSMPSuccess = (parentTrees: Array<ParentTreesType>) => {
  const parentTreeEntries: SMPSuccessEntriesType[] = [];
  parentTrees.forEach((element) => {
    const parentTreeEntry: SMPSuccessEntriesType = {
      cloneNumber: +element.value,
      successOnParent: getRandomFloat(),
      nonOrchardPollenContam: getRandomFloat(),
      ad: getRandomFloat(),
      dfs: getRandomFloat(),
      dfu: getRandomFloat(),
      dfw: getRandomFloat(),
      dsb: getRandomFloat(),
      dsc: getRandomFloat(),
      dsg: getRandomFloat(),
      gvo: getRandomFloat(),
      iws: getRandomFloat(),
      wdu: getRandomFloat(),
      wwd: getRandomFloat(),
      wve: getRandomFloat()
    };
    parentTreeEntries.push(parentTreeEntry);
  });

  const smpSuccessEmptyData: SMPSuccessType = {
    smpSuccessEntries: parentTreeEntries,
    totalParentTreesSMPSuccess: getRandomFloat(),
    averageNumberSMPSuccess: getRandomFloat(),
    averageNonOrchardPollenContam: getRandomFloat(),
    geneticWorth: {
      populationSize: getRandomFloat(),
      testedParentTree: getRandomFloat(),
      coancestry: getRandomFloat(),
      smpParents: getRandomFloat(),
      adTotal: getRandomFloat(),
      dfsTotal: getRandomFloat(),
      dfuTotal: getRandomFloat(),
      dfwTotal: getRandomFloat(),
      dsbTotal: getRandomFloat(),
      dscTotal: getRandomFloat(),
      dsgTotal: getRandomFloat(),
      gvoTotal: getRandomFloat(),
      iwsTotal: getRandomFloat(),
      wduTotal: getRandomFloat(),
      wwdTotal: getRandomFloat(),
      wveTotal: getRandomFloat()
    }
  };

  return smpSuccessEmptyData;
};
