import { CustomerItem } from './customer-item';
import { getCustomers } from './lib';
import { Customer } from './types';
export async function ListOfCustomers() {
  const customers = await getCustomers();

  return (
    <div className='flex flex-col gap-4 w-full h-screen z-20 place-items-center p-[1.2vmax]'>
      
      {(customers as Customer[]).map(({ id, ...rest }: Customer) => (
        <CustomerItem key={id} customer={{ id, ...rest }} />
      ))}
    </div>
  );
}
