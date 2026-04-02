import { getCustomers } from './lib';
export async function ListOfCustomers() {
  const customers = await getCustomers();
  console.log({ customers });
  return 
}
