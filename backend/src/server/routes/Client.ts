import { Router } from "express";
import ClientModel from "../../datebase/models/Client";
import ClientService from "../../services/Client";
import ClientController from "../../controllers/Client";

const router = Router();

const clientModel = new ClientModel();
const clientService = new ClientService(clientModel);
const clientController = new ClientController(clientService);

router.post("/", (req, res) => clientController.create(req, res));
router.get("/", (req, res) => clientController.read(req, res));
router.get("/:id", (req, res) => clientController.readOne(req, res));
router.put("/:id", (req, res) => clientController.update(req, res));
router.delete("/:id", (req, res) => clientController.delete(req, res));

export default router;
