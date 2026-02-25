'use client';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { plans, Pricing } from '../lib';
import { PayButton } from '@/app/3/componets/PayButton';
import { useState } from 'react';

export function RadioGroupChoiceCard() {
  const [pricing, setPricing] = useState<Pricing>(plans[0]);

  return (
    <>
      <RadioGroup
        defaultValue={plans[0].id}
        onValueChange={value => {
          const selectedPlan = plans.find(plan => plan.id === value);
          if (selectedPlan) {
            setPricing(selectedPlan);
          }
        }}
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

      <PayButton pricing={pricing} />
    </>
  );
}
