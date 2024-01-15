create-app:
	pnpm create next-app nextjs-react-query-supabase
install-dependencies:
	pnpm add @supabase/supabase-js @tanstack/react-query @supabase/ssr
	pnpm add -D @tanstack/eslint-plugin-query
	pnpm add -D @tanstack/react-query-devtools

	pnpm add @prisma/client
	pnpm add -D prisma
	pnpm add -D ts-node

commands:
	pnpm prisma init --datasource-provider postgresql
	pnpm prisma format
	pnpm prisma migrate dev --name init