import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className='text-4xl font-bold'>Hello, Next.js 14 App Directory!</h1>
      <p>
        <Link className='text-blue-500 underline' prefetch href='/client-side'>
          Using Supabase in a Client Component
        </Link>
      </p>
      <p>
        <Link prefetch href='/server-side' className='text-blue-500 underline'>
          Using Supabase in a Server Component with Hydration
        </Link>
      </p>
    </div>
  );
}
