'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function InputSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const updateQuery = (val: string) => {
    const params = new URLSearchParams();
    if (val) params.set('query', val);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateQuery(val), 300);
  };

  const handleSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    updateQuery(query);
  };

  return (
    <Field orientation="horizontal" className="max-w-[45%]">
      <Input type="search" placeholder="Search..." value={query} onChange={handleChange} />
      <Button onClick={handleSearch}>Search</Button>
    </Field>
  );
}