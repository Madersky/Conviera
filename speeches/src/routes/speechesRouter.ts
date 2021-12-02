import express from "express";

import { requireAuth } from "@conviera/common";

const speechesController = require("../controllers/speechesController");

const router = express.Router();

module.exports = router;
