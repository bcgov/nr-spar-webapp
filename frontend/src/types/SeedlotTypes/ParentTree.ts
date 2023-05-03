export type ConeAndPollenEntriesType = {
  cloneNumber: number;
  coneCount: number;
  pollenCount: number;
  smpSuccess: number;
  [genTrait: string]: number;
};

export type SMPSuccessEntriesType = {
  cloneNumber: number;
  successOnParent: number;
  nonOrchardPollenContam: number;
  [genTrait: string]: number;
};

export type SMPMixEntriesType = {
  cloneNumber: number;
  volume: number;
  proportion: number;
  [genTrait: string]: number;
};

export type GeneticWorthType = {
  populationSize: number;
  testedParentTree: number;
  coancestry: number;
  smpParents: number;
  [genTraitTotal: string]: number;
}

export type SMPMixGenTraitType = {
  [genTraitTotal: string]: number;
}

export type ConeAndPollenType = {
  coneAndPollenEntries: ConeAndPollenEntriesType[];
  totalParentTreesConeAndPollen: number;
  totalConeCount: number;
  totalPollenCount: number;
  averageSMP: number;
  geneticWorth: GeneticWorthType;
};

export type SMPSuccessType = {
  smpSuccessEntries: SMPSuccessEntriesType[];
  totalParentTreesSMPSuccess: number;
  averageNumberSMPSuccess: number;
  averageNonOrchardPollenContam: number;
  geneticWorth: GeneticWorthType;
};

export type SMPMixType = {
  smpMixEntries: SMPMixEntriesType[];
  totalParentTreesFromOutside: number;
  totalVolume: number;
  geneticWorth: SMPMixGenTraitType
};

export type ParentTreeType = {
  coneAndPollen: ConeAndPollenType;
  smpSuccess?: SMPSuccessType;
  smpMix?: SMPMixType;
};
