import { Router, Request, Response } from "express";
import { checkJwt } from "../middleware/jwt/checkjwt";
import auth from "./auth";
import user from "./user";

const routes = Router();

routes.use("/auth",  auth);
routes.use("/user", [checkJwt], user);

export default routes;


