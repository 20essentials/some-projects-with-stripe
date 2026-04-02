import { CustomerItem } from './customer-item';
import { InputSearch } from './input-search';
import { getCustomers, searchCustomersByEmail } from './lib';
import { Customer } from './types';

export async function ListOfCustomers({
  searchParams
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const readOnlySearchParams = await searchParams;
  const query = readOnlySearchParams.query;
  const customers = query
    ? await searchCustomersByEmail({
        query: `email~"${query}"`
      })
    : await getCustomers();

  return (
    <div className='flex flex-col gap-4 w-full h-screen z-20 place-items-center p-[1.2vmax]'>
      <h2 className='text-amber-50 font-black uppercase'>
        List of Clients (Example)
      </h2>
      <InputSearch />

      {
        customers.length === 0 && <h2>Without results 🙃</h2>
      }
      {(customers as Customer[]).map(({ id, ...rest }: Customer, index) => (
        <CustomerItem key={id} customer={{ id, ...rest }} index={index} />
      ))}
    </div>
  );
}
