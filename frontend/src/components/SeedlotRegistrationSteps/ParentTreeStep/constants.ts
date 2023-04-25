import { TableHeaders } from './definitions';

export const MAX_ROWS = 500;

export const pageTexts = {
  tabTitles: {
    coneTab: 'Cone and pollen count',
    smpTab: 'SMP success on parent',
    mixTab: 'Calculation of SMP mix'
  },
  sharedTabTexts: {
    notification: {
      title: 'Upload spreadsheet to table',
      actionButtonLabel: 'Close notification'
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
    },
    modal: {
      title: 'Upload from file',
      label: 'Seedlot registration',
      description: 'Select the spreadsheet file for the cone and pollen count table with the data you want to import. The supported file format is .csv.',
      uploadFile: 'Click to upload or drag and drop the file here',
      uploadedFileErrorType: 'File size exceeds limit',
      uploadedFileErrorMessage: '500kb max file size. Select a new file and try again.',
      uploadedFileIconDesc: 'Delete file',
      notification: {
        title: 'Note:',
        description: 'When uploading a file all previously filled data within the table will be replaced'
      },
      buttons: {
        cancel: 'Cancel',
        confirm: 'Import file and continue'
      }
    }

  },
  coneAndPollen: {
    subtitle: 'Enter the cone and pollen count manually or upload a spreadsheet file with the template for the cone and pollen count table. Remember to keep your orchard updated, you can go to orchard\'s management page to edit the listed parent trees in your orchard.',
    tableSubtitle: 'Enter the estimative of cone and pollen count for the orchard\'s seedlot (*required)',
    notification: {
      subtitle: 'You can import one spreadsheet file for the cone and pollen count table with the data you want to use. For further guidance on how to organize the data, do use the SPAR\'s spreadsheet template.',
      templateLink: 'Download cone and pollen count template'
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
    }
  },
  smpSuccess: {
    subtitle: 'Enter the SMP success on parent manually or upload a spreadsheet file with the template for the cone and pollen count table. Remember to keep your orchard updated, you can go to orchard\'s management page to edit the listed parent trees in your orchard.',
    tableSubtitle: 'Enter the estimative of SMP success for the orchard\'s seedlot',
    notification: {
      subtitle: 'You can import one spreadsheet file for the SMP success on parent table with the data you want to use. For further guidance on how to organize the data, do use the SPAR\'s spreadsheet template.',
      templateLink: 'Download SMP success on parent template'
    },
    bulkCheckboxLabel: 'Enter the same SMP success on parent or Non-orchard pollen contaminant to all parent trees',
    bulkSuccessInputLabel: 'SMP Success on parent (%)',
    bulkNonOrchardInputLabel: 'Non-orchard pollen contaminant (%)',
    summary: {
      title: 'Summary',
      subtitle: 'Check the SMP success on parent summary',
      fieldLabels: {
        totalParentTrees: 'Total number of parent trees',
        averageSMPSuccess: 'Average number of SMP success %',
        averageNonOrchard: 'Average number of non-orchard pollen contam. (%)'
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

export const coneAndPollenFixedHeaders:Array<TableHeaders> = [
  {
    key: '1',
    header: 'Clone number'
  },
  {
    key: '2',
    header: 'Cone count'
  },
  {
    key: '3',
    header: 'Pollen count'
  },
  {
    key: '4',
    header: 'SMP success (%)'
  }
];
