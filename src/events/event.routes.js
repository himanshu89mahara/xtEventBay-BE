import express from "express";
import { checkAuth } from "../user/user.middleware";
import { addEvent, addInterestedUserInEvent, approveEvent, deleteEvent, deleteInterestUserFromEvent, getEvent, listEvent, statusChangeEvent, updateEvent } from "./event.controller";
const eventRoutes = express.Router();
eventRoutes.use(checkAuth);

eventRoutes.route("/").get(listEvent).post(addEvent);
eventRoutes.route("/:eventID").get(getEvent).put(updateEvent).delete(deleteEvent);
eventRoutes.route("/:eventID/action/approve").put(approveEvent);
eventRoutes.route("/:eventID/action/:status").put(statusChangeEvent);
eventRoutes.route("/:eventID/interested-user/").post(addInterestedUserInEvent);
eventRoutes.route("/:eventID/interested-user/:userID").delete(deleteInterestUserFromEvent);




export default eventRoutes;