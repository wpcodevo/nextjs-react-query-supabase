import { useMutation } from '@tanstack/react-query';
import useSupabase from './useSupabase';

function useInsertUserMutation() {
  const client = useSupabase();

  const mutationFn = async ({
    name,
    email,
  }: {
    name: string;
    email: string;
  }) => {
    return client
      .from('User')
      .upsert([{ name, email }])
      .throwOnError()
      .select(`*`)
      .throwOnError()
      .single()
      .then((result) => result.data);
  };

  return useMutation({ mutationFn });
}

export default useInsertUserMutation;
