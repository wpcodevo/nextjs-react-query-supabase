import {
  useQuery,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import useSupabase from './useSupabase';

interface User {
  id: number;
  name: string;
  email: string;
}

export const userQueryKey = ['users'];

function useUsersQuery(
  queryOptions?: UseQueryOptions<User[], Error, User[], QueryKey>
): UseQueryResult<User[], Error> {
  const client = useSupabase();

  const queryFn = async (): Promise<User[]> => {
    const users = await client.from('User').select('*').throwOnError();
    return users.data || [];
  };

  return useQuery({ queryKey: userQueryKey, queryFn, ...queryOptions });
}

export default useUsersQuery;
