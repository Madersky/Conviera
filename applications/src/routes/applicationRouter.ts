import express from "express";

import { requireAuth } from "@conviera/common";
const applicationController = require("../controllers/applicationController");

const router = express.Router();

router.route("/").get(requireAuth, applicationController.getAllApplications);

router
  .route("/user/id/:_id")
  .get(requireAuth, applicationController.getUserApplications);

router.route("/new").post(requireAuth, applicationController.createApplication);
module.exports = router;
