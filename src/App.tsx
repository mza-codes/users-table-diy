import TableV2 from "./components/TableV2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
    return (
        <main className="min-h-screen col center gap-2 bg-slate-50">
            <QueryClientProvider client={queryClient}>
                <TableV2 />
            </QueryClientProvider>
        </main>
    );
}
