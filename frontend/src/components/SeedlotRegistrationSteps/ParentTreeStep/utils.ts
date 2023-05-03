import { useRef, useEffect } from 'react';
import {
  ConeAndPollenEntriesType,
  ConeAndPollenType,
  SMPMixEntriesType,
  SMPMixType,
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

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

// These functions will be either removed or altered once the real API is connected
const getRandomFloat = () => parseFloat((Math.random() * (10 - 1) + 1).toFixed(4));

export const createEmptyConeAndPollen = (parentTrees: Array<ParentTreesType>) => {
  const parentTreeEntries: ConeAndPollenEntriesType[] = [];
  parentTrees.forEach((element) => {
    const parentTreeEntry: ConeAndPollenEntriesType = {
      cloneNumber: +element.value,
      coneCount: 0,
      pollenCount: 0,
      smpSuccess: 0,
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
      wve: getRandomFloat(),
      meanDegreesLat: getRandomFloat(),
      meanMinutesLat: getRandomFloat(),
      meanDegreesLong: getRandomFloat(),
      meanMinutesLong: getRandomFloat(),
      meanElevation: getRandomFloat()
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

export const createEmptySMPMix = (parentTrees: Array<ParentTreesType>) => {
  const parentTreeEntries: SMPMixEntriesType[] = [];
  parentTrees.forEach(() => {
    const parentTreeEntry: SMPMixEntriesType = {
      cloneNumber: 0,
      volume: 0,
      proportion: 0,
      adClonal: 0,
      dfsClonal: 0,
      dfuClonal: 0,
      dfwClonal: 0,
      dsbClonal: 0,
      dscClonal: 0,
      dsgClonal: 0,
      gvoClonal: 0,
      iwsClonal: 0,
      wduClonal: 0,
      wwdClonal: 0,
      wveClonal: 0,
      adWeighted: 0,
      dfsWeighted: 0,
      dfuWeighted: 0,
      dfwWeighted: 0,
      dsbWeighted: 0,
      dscWeighted: 0,
      dsgWeighted: 0,
      gvoWeighted: 0,
      iwsWeighted: 0,
      wduWeighted: 0,
      wwdWeighted: 0,
      wveWeighted: 0
    };
    parentTreeEntries.push(parentTreeEntry);
  });

  const smpSuccessEmptyData: SMPMixType = {
    smpMixEntries: parentTreeEntries,
    totalParentTreesFromOutside: 0,
    totalVolume: 0,
    geneticWorth: {
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
      wve: getRandomFloat(),
      meanDegreesLat: getRandomFloat(),
      meanMinutesLat: getRandomFloat(),
      meanDegreesLong: getRandomFloat(),
      meanMinutesLong: getRandomFloat(),
      meanElevation: getRandomFloat()
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

export const createRandomSMPMix = (parentTrees: Array<ParentTreesType>) => {
  const parentTreeEntries: SMPMixEntriesType[] = [];
  parentTrees.forEach(() => {
    const parentTreeEntry: SMPMixEntriesType = {
      cloneNumber: getRandomFloat(),
      volume: getRandomFloat(),
      proportion: getRandomFloat(),
      adClonal: getRandomFloat(),
      dfsClonal: getRandomFloat(),
      dfuClonal: getRandomFloat(),
      dfwClonal: getRandomFloat(),
      dsbClonal: getRandomFloat(),
      dscClonal: getRandomFloat(),
      dsgClonal: getRandomFloat(),
      gvoClonal: getRandomFloat(),
      iwsClonal: getRandomFloat(),
      wduClonal: getRandomFloat(),
      wwdClonal: getRandomFloat(),
      wveClonal: getRandomFloat(),
      adWeighted: getRandomFloat(),
      dfsWeighted: getRandomFloat(),
      dfuWeighted: getRandomFloat(),
      dfwWeighted: getRandomFloat(),
      dsbWeighted: getRandomFloat(),
      dscWeighted: getRandomFloat(),
      dsgWeighted: getRandomFloat(),
      gvoWeighted: getRandomFloat(),
      iwsWeighted: getRandomFloat(),
      wduWeighted: getRandomFloat(),
      wwdWeighted: getRandomFloat(),
      wveWeighted: getRandomFloat()
    };
    parentTreeEntries.push(parentTreeEntry);
  });

  const smpSuccessEmptyData: SMPMixType = {
    smpMixEntries: parentTreeEntries,
    totalParentTreesFromOutside: getRandomFloat(),
    totalVolume: getRandomFloat(),
    geneticWorth: {
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
      wveTotal: 0
    }
  };

  return smpSuccessEmptyData;
};
