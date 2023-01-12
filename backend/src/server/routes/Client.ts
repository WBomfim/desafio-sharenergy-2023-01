import { Router } from "express";
import ClientModel from "../../datebase/models/Client";
import ClientService from "../../services/Client";
import ClientController from "../../controllers/Client";
import auth from '../../utils/authentication/auth';

const router = Router();

const clientModel = new ClientModel();
const clientService = new ClientService(clientModel);
const clientController = new ClientController(clientService);

router.post("/", auth, (req, res) => clientController.create(req, res));
router.get("/", auth, (req, res) => clientController.read(req, res));
router.get("/:id", auth, (req, res) => clientController.readOne(req, res));
router.put("/:id", auth, (req, res) => clientController.update(req, res));
router.delete("/:id", auth, (req, res) => clientController.delete(req, res));

export default router;
