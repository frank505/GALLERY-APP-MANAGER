
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const Auth = new AuthController();

const router = Router();
//Login route
router.post("/login", Auth.Login);
router.post("/register", Auth.Register);

export default router;

