import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormExample } from "@/components/form-example";
import { Toaster } from "@/components/ui/sonner";

/**
 * TanStack Query client instance.
 * Manages server state, caching, and synchronization.
 */
const queryClient = new QueryClient();

/**
 * Root application component.
 * Provides QueryClient context and renders the main form component.
 */
export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<FormExample />
			<Toaster />
		</QueryClientProvider>
	);
}

export default App;
