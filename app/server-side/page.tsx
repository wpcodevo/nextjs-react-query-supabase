import useUsersQuery from '@/hooks/use-users-query';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { useSupabaseServer } from '@/hooks/useSupabaseServer';
import { cookies } from 'next/headers';
import ListUsers from '@/components/list-users';

export default async function Hydation() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await queryClient.prefetchQuery(useUsersQuery(supabase));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListUsers />
    </HydrationBoundary>
  );
}
