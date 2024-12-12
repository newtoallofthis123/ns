'use client';

import Image from 'next/image';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

export interface Props {
  title?: string;
  options?: string[];
  bg?: string;
}

export default function NavBar({
  title = 'NoobScience',
  options = ['Short', 'Paste', 'Github'],
  bg = '#ffffff',
}: Props) {
  const formSchema = z.object({
    search: z.string().nonempty(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <nav
      style={{
        backgroundColor: bg,
      }}
      className={'flex flex-row px-5 py-2 justify-center items-center'}
    >
      <Link href="/" className="w-1/3">
        <div className="flex flex-row items-center">
          <Image src="/icon.png" alt="icon" width={32} height={32} />
          <span className="ml-2 text-2xl font-bold">{title}</span>
        </div>
      </Link>
      <div className="w-2/3 flex flex-row justify-around items-center">
        <ul className="flex flex-row justify-around text-lg">
          {options.map((option, index) => (
            <li key={index} className="mx-4">
              <Link href={`/${option.toLowerCase()}`}>{option}</Link>
            </li>
          ))}
        </ul>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-row"
            >
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Search" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="ml-4" type="submit">
                Search
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </nav>
  );
}
