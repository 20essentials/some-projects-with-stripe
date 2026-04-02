import { CustomerItem } from './customer-item';
import { getCustomers } from './lib';
import { Customer } from './types';
export async function ListOfCustomers() {
  const customers = await getCustomers();

  return (
    <div className='flex flex-col gap-4'>
      {(customers as Customer[]).map(({ id, ...rest }: Customer) => (
        <CustomerItem key={id} customer={{ id, ...rest }} />
      ))}
    </div>
  );
}
