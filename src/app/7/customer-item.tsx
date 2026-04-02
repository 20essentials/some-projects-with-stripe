'use client';

import { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Customer } from './types';

export function CustomerItem({ customer, index }: { customer: Customer; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const { id, name, email, description, currency, balance, created } = customer;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`flex w-[350px] flex-col gap-2 border rounded-lg p-2 ${index % 2 === 0 ? 'bg-card' : 'bg-muted/50'}`}
    >
      <div className='flex items-center justify-between gap-4 px-4 py-2 bg-muted rounded-md'>
        <h4 className='text-sm font-semibold'>
          {name || 'No name'} ({id})
        </h4>

        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='icon' className='size-8'>
            <ChevronsUpDown />
            <span className='sr-only'>Toggle details</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <div className='flex items-center justify-between rounded-md border bg-muted px-4 py-2 text-sm'>
        <span className='text-muted-foreground'>Email</span>
        <span className='font-medium'>{email}</span>
      </div>

      <CollapsibleContent className='flex flex-col gap-2'>
        <div className='rounded-md border bg-muted px-4 py-2 text-sm'>
          <p className='font-medium'>Description</p>
          <p className='text-muted-foreground'>
            {description || 'No description'}
          </p>
        </div>

        <div className='rounded-md border bg-muted/50 px-4 py-2 text-sm'>
          <p className='font-medium'>Currency</p>
          <p className='text-muted-foreground'>{currency || 'Not defined'}</p>
        </div>

        <div className='rounded-md border bg-muted px-4 py-2 text-sm'>
          <p className='font-medium'>Balance</p>
          <p className='text-muted-foreground'>{balance}</p>
        </div>

        <div className='rounded-md border bg-muted/50 px-4 py-2 text-sm'>
          <p className='font-medium'>Created</p>
          <p className='text-muted-foreground'>
            {new Date(created * 1000).toLocaleString()}
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
