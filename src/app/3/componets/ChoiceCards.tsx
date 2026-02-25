import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { plans } from '../lib';

export function RadioGroupChoiceCard() {
  return (
    <RadioGroup
      defaultValue='plus'
      className='max-w-sm p-4 bg-[#000d] rounded-3xl'
    >
      {plans.map(plan => (
        <FieldLabel key={plan.id} htmlFor={`${plan.id}-plan`}>
          <Field orientation='horizontal'>
            <FieldContent>
              <FieldTitle>{plan.title}</FieldTitle>
              <FieldDescription>{plan.description}</FieldDescription>
              <p className='text-sm font-semibold mt-1'>${plan.price}/month</p>
            </FieldContent>
            <RadioGroupItem value={plan.id} id={`${plan.id}-plan`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  );
}
