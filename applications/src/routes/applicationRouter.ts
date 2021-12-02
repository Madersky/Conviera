import express from "express";

import { requireAuth } from "@conviera/common";
const applicationController = require("../controllers/applicationController");

const router = express.Router();

router
  .route("/")
  .get(requireAuth, applicationController.getAllApplications)
  .post(requireAuth, applicationController.createApplication);

router
  .route("/user/id/:_id")
  .get(requireAuth, applicationController.getUserApplications);

router
  .route("/id/:_id")
  .patch(requireAuth, applicationController.manageApplication);

module.exports = router;
