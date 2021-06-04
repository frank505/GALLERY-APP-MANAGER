
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { 
    RegisterUserErr,
     RegisterUserRules,
     LoginUserRules,
     LoginUserErr 
    } from "../middleware/validators/AllValidators";

const Auth = new AuthController();

const router = Router();
//Login route
router.post("/login",LoginUserRules(),LoginUserErr,  Auth.Login);
router.post("/register", RegisterUserRules(),RegisterUserErr, Auth.Register);

export default router;