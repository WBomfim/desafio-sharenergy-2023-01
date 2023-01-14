import { Router } from "express";
import UserService from "../../services/User";
import UserController from "../../controllers/User";
import auth from "../../utils/authentication/auth";

const router = Router();

const userServices = new UserService();
const userController = new UserController(userServices);

router.get("/page/:page", auth, (req, res) => userController.readPage(req, res));
router.get("/search", auth, (req, res) => userController.seachUser(req, res));

export default router;
