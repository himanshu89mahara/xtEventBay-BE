import express from "express";
import { addEvent, addInterestedUserInEvent, approveEvent, deleteEvent, getEvent, listEvent, statusChangeEvent, updateEvent } from "./event.controller";
const eventRoutes = express.Router();

eventRoutes.route("/").get(listEvent).post(addEvent);
eventRoutes.route("/:eventID").get(getEvent).put(updateEvent).delete(deleteEvent);
eventRoutes.route("/:eventID/action/approve").put(approveEvent);
eventRoutes.route("/:eventID/action/:status").put(statusChangeEvent);
eventRoutes.route("/:eventID/interested-user/").post(addInterestedUserInEvent);




export default eventRoutes;