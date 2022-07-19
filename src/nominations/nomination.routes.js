import express from "express";
import * as NominationController from "./nomination.controller";
const nominationRoutes = express.Router();

nominationRoutes
  .route("")
  .get(NominationController.nominationList)
  .post(NominationController.nominationAdd);
nominationRoutes
  .route("/:nominationId")
  .get(NominationController.nominationDetail)
  .put(NominationController.nominationUpdate)
  .delete(NominationController.nominationDelete);
nominationRoutes
  .route("/:nominationId/action/approve")
  .put(NominationController.nominationApprove);

nominationRoutes
  .route("/:nominationId/action/:status")
  .put(NominationController.nominationStatus);

export default nominationRoutes;
