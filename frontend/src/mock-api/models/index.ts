/* eslint-disable import/no-unresolved */
import { Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';

import CardType from '../../types/Card';
import GeneticClassesType from '../../types/GeneticClasses';
import ApplicantInfo from '../../types/ApplicantInfo';
import SeedlotRegistration from '../../types/SeedlotRegistration';
import Seedlot from '../../types/Seedlot';
import OrchardType from '../../types/OrchardType';
import { MockSeedlotOrchard } from '../../types/SeedlotTypes/SeedlotOrchard';

const FavouriteModel: ModelDefinition<CardType> = Model.extend({});
const GeneticClassesModel: ModelDefinition<GeneticClassesType> = Model.extend({});
const ApplicantInfoModel: ModelDefinition<ApplicantInfo> = Model.extend({});
const SeedlotRegistrationModel: ModelDefinition<SeedlotRegistration> = Model.extend({});
const SeedlotInfoModel: ModelDefinition<SeedlotRegistration> = Model.extend({});
const SeedlotModel: ModelDefinition<Seedlot> = Model.extend({});
const OrchardModel: ModelDefinition<OrchardType> = Model.extend({});
const SeedlotOrchardModel: ModelDefinition<MockSeedlotOrchard> = Model.extend({});

const models = {
  favourites: FavouriteModel,
  geneticClasses: GeneticClassesModel,
  applicantInfo: ApplicantInfoModel,
  seedlotRegistration: SeedlotRegistrationModel,
  seedlotInfos: SeedlotInfoModel,
  seedlotData: SeedlotModel,
  orchards: OrchardModel,
  seedlotOrchard: SeedlotOrchardModel
};

export default models;
