import { CustomerItem } from './customer-item';
import { getCustomers } from './lib';
import { Customer } from './types';
export async function ListOfCustomers() {
  const customers = await getCustomers();

  return (
    <div className='flex flex-col gap-4 w-full h-screen z-20 place-items-center p-[1.2vmax]'>
      <h2 className='text-amber-50 font-black uppercase'>List of Clients (Example)</h2>
      {(customers as Customer[]).map(({ id, ...rest }: Customer, index) => (
        <CustomerItem key={id} customer={{ id, ...rest }} index={index} />
      ))}
    </div>
  );
}
