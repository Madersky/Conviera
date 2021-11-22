import express from "express";

import { requireAuth, validateRequest } from "@conviera/common";
import { roleAssign } from "../middlewares/roleAssign";

const router = express.Router();
const conferenceController = require("../controllers/conferenceController");

router.route("/").get(requireAuth, conferenceController.getAllConferences);

router
  .route("/:discipline")
  .get(requireAuth, conferenceController.getAllConferencesByDiscipline);

router
  .route("/id/:_id")
  .get(requireAuth, roleAssign, conferenceController.getConference);

router
  .route("/id/:_id/join")
  .patch(requireAuth, conferenceController.addUserToConference);
router
  .route("/create")
  .post(requireAuth, conferenceController.createConference);

module.exports = router;
