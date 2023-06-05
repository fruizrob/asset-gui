"use client"; // This is a client component 👈🏽

import { trpc } from '../../utils/trpc';

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div>{children}</div>
			</body>
		</html>
	)
}

export default trpc.withTRPC(Layout);
