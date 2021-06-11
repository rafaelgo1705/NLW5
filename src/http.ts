import express, { Request, Response } from "express";
import "./database";
import { routes } from "./routes";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req: Request, res: Response) => {
  return res.render("html/client.html");
});

app.get("/pages/admin", (req: Request, res: Response) => {
  return res.render("html/admin.html");
});

const http = createServer(app); // Criando protocolo HTTP
const io = new Server(http); // Criando procolo WS

io.on("connection", (socket: Socket) => {
//   console.log("Se conectou: ", socket.id);
});

app.use(express.json());
app.use(routes);

export { http, io };
