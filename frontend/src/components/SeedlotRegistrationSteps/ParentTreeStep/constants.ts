export const MAX_ROWS = 500;

export const pageTexts = {
  tabTitles: {
    coneTab: 'Cone and pollen count',
    smpTab: 'SMP success on parent',
    mixTab: 'Calculation of SMP mix'
  },
  coneAndPollen: {
    subtitle: 'Enter the cone and pollen count manually or upload a spreadsheet file with the template for the cone and pollen count table. Remember to keep your orchard updated, you can go to orchard\'s management page to edit the listed parent trees in your orchard.',
    tableSubtitle: 'Enter the estimative of cone and pollen count for the orchard\'s seedlot (*required)',
    notification: {
      title: 'Upload spreadsheet to table',
      subtitle: 'You can import one spreadsheet file for the cone and pollen count table with the data you want to use. For further guidance on how to organize the data, do use the SPAR\'s spreadsheet template.',
      templateLink: 'Download cone and pollen count template',
      actionButtonLabel: 'Close notification'
    },
    summary: {
      title: 'Summary',
      subtitle: 'Check the parent tree contribution summary',
      fieldLabels: {
        totalParentTrees: 'Total number of parent trees',
        totalConeCount: 'Total number of cone count',
        totalPollenCount: 'Total number of pollen count',
        averageSMP: 'Average number of SMP success %'
      }
    },
    geneticWorth: {
      title: 'Genetic worth and diversity',
      subtitle: 'Check the genetic worth and diversity of your seedlot',
      defaultFieldsLabels: {
        populationSize: 'Effective population size (Ne)',
        testedParentTree: 'Tested parent tree contribution (%)',
        coancestry: 'Coancestry (Sum PiPj * Cij)',
        smpParents: 'Number of SMP parents from outside'
      }
    }
  }
};

export const geneticTraits = {
  ad: {
    code: 'ad',
    description: 'Genetic worth AD',
    filterLabel: 'Deer browse (AD)'
  },
  dfs: {
    code: 'dfs',
    description: 'Genetic worth DFS',
    filterLabel: 'Dothistroma needle blight (DFS)'
  },
  dfu: {
    code: 'dfu',
    description: 'Genetic worth DFU',
    filterLabel: 'Cedar leaf blight (DFU)'
  },
  dfw: {
    code: 'dfw',
    description: 'Genetic worth DFW',
    filterLabel: 'Swiss needle cast (DFW)'
  },
  dsb: {
    code: 'dsb',
    description: 'Genetic worth DSB',
    filterLabel: 'White pine blister rust (DSB)'
  },
  dsc: {
    code: 'dsc',
    description: 'Genetic worth DSC',
    filterLabel: 'Comandra blister rust (DSC)'
  },
  dsg: {
    code: 'dsg',
    description: 'Genetic worth DSG',
    filterLabel: 'Western gall rust (DSG)'
  },
  gvo: {
    code: 'gvo',
    description: 'Genetic worth GVO',
    filterLabel: 'Volume growth (GVO)'
  },
  iws: {
    code: 'iws',
    description: 'Genetic worth IWS',
    filterLabel: 'White pine terminal weevil (IWS)'
  },
  wdu: {
    code: 'wdu',
    description: 'Genetic worth WDU',
    filterLabel: 'Durability (WDU)'
  },
  wwd: {
    code: 'wwd',
    description: 'Genetic worth WWD',
    filterLabel: 'Wood density (WWD)'
  },
  wve: {
    code: 'wve',
    description: 'Genetic worth WVE',
    filterLabel: 'Wood velocity measures (WVE)'
  }
};
