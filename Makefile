create-app:
	pnpm create next-app nextjs-react-query-supabase

install-dependencies:
	pnpm add @supabase/supabase-js @tanstack/react-query @supabase/ssr
	pnpm add -D @tanstack/eslint-plugin-query
	pnpm add -D @tanstack/react-query-devtools
	pnpm add -D supabase

commands:
	# https://supabase.com/dashboard/account/tokens
	pnpm supabase init
	pnpm supabase migration new init_user
	pnpm supabase link --project-ref <project_reference>
	pnpm supabase db reset --db-url ""
	pnpm supabase gen types typescript --linked --schema=public > utils/database.types.ts