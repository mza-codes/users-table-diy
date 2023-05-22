import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if (import.meta.env.PROD) {
    console = {
        ...console,
        log: (...data: any[]) => {},
    };
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
