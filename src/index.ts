import express, { Request, Response } from "express";

const app = express();
const server = express.json();
const routerApi = express.Router();
const routerUsers = express.Router();

routerApi.get("/users", routerUsers);

app.use(server);
app.use("/users", routerUsers);

app.get("/", function (req: Request, res: Response) {
  return res.send("Hello World!");
});

app.use("/api", routerApi);

app.listen(3000, function () {
  console.log("Server is running on http://localhost:3000");
});
