import { Router } from "express";
import ClientModel from "../../datebase/models/Client";
import ClientService from "../../services/Client";
import ClientController from "../../controllers/Client";

const router = Router();

const clientModel = new ClientModel();
const clientService = new ClientService(clientModel);
const clientController = new ClientController(clientService);

router.post("/", clientController.create);
router.get("/", clientController.read);
router.get("/:id", clientController.readOne);
router.put("/:id", clientController.update);
router.delete("/:id", clientController.delete);

export default router;
