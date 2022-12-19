import { config } from "dotenv";
import { App } from "./src/app";




config()

const NAME = "Learn TLU APIs";
const PORT = parseInt(process.env.BACKEND_PORT as string) || 8000;
const app = new App(NAME, PORT);


// app.publicFile()
app.listen()

