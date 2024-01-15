import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { TypedSupabaseClient } from './useSupabaseClient';

interface User {
  id: number;
  name: string;
  email: string;
}

export const userQueryKey = ['users'];

function useUsersQuery(
  client: TypedSupabaseClient,
  queryOptions?: UseQueryOptions<User[], Error, User[], QueryKey>
) {
  const queryFn = async (): Promise<User[]> => {
    const users = await client.from('User').select('*').throwOnError();
    return users.data || [];
  };

  return { queryKey: userQueryKey, queryFn, ...queryOptions };
}

export default useUsersQuery;
