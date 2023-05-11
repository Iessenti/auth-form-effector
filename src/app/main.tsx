import ReactDOM from "react-dom/client";

import { App } from "./app";
import { started } from "~/shared/init/init";

import "./index.sass";
import "~/shared/styles/AuthPage.sass"

const container = document.querySelector("#root") as HTMLElement;
const root = ReactDOM.createRoot(container);

started();
root.render(<App />);
