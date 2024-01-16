'use client';

import useUsersQuery from '@/hooks/use-users-query';
import useSupabaseClient from '@/hooks/useSupabaseClient';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function ListUsers() {
  const client = useSupabaseClient();

  const { data } = useQuery(useUsersQuery(client));

  return (
    <>
      {
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 20,
          }}
        >
          {data?.map((user) => (
            <div
              key={user.id}
              className='flex flex-col justify-center items-center border-gray-200 border'
            >
              <Image
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                width={180}
                height={180}
                className='block'
              />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      }
    </>
  );
}
