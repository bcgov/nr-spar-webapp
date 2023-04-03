import InterimForm from '../../../components/SeedlotRegistrationProgress/InterimStorage/definitions';
import { SingleOwnerForm } from '../../../components/SeedlotRegistrationSteps/OwnershipStep/definitions';
import { SeedlotOrchard } from '../../../types/SeedlotTypes/SeedlotOrchard';

export type AllStepData = {
  interimStep: InterimForm,
  ownershipStep: Array<SingleOwnerForm>
  orchardStep: SeedlotOrchard
}
