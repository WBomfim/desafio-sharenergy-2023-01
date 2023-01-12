import { Router } from "express";
import UserModel from "../../datebase/models/User";
import LoginService from "../../services/Login";
import LoginController from "../../controllers/Login";

const router = Router();

const userModel = new UserModel();
const loginService = new LoginService(userModel);
const loginController = new LoginController(loginService);

router.post("/", (req, res) => loginController.login(req, res));

export default router;
