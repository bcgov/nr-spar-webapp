import CollectionMethods from './CollectionMethods';
import CollectorAgency from './CollectorAgency';

type CollectionInformation = {
    applicant?: CollectorAgency;
    startDate?: string;
    endDate?: string;
    numberOfContainers?: number;
    volumePerContainer?: number;
    locationCode?: string;
    collectionMethod?: CollectionMethods;
    comments?: string;
}

export default CollectionInformation;