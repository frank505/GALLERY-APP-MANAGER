
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { RegisterUserErr, RegisterUserRules } from "../middleware/validators/RegisterUserValidator";

const Auth = new AuthController();

const router = Router();
//Login route
router.post("/login", Auth.Login);
router.post("/register", RegisterUserRules(),RegisterUserErr, Auth.Register);

export default router;