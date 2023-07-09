import express from "express"
import {createTicketController,getAllTicketController} from "../controllers/tambolaController.js";
const router = express.Router()

router.post('/create-ticket',createTicketController); //for create ticket api
router.get('/get-ticket',getAllTicketController); //for fatch api

export default  router;