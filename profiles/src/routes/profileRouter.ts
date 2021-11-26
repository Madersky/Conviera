import express from "express";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
} from "@conviera/common";

const validator = require("../controllers/profileValidator");
// const {
//   getAllProfiles,
//   createProfile,
//   getProfileByUserId,
//   patchProfile,
//   getProfileByEmail,
//   deleteProfileProperty,
// } = require('../controllers/profileController');
const profileController = require("../controllers/profileController");
const router = express.Router();
// getAllProfiles, createProfile, getProfileByUserId, patchProfile, getProfileByEmail

//ZABEZPIECZYC!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.route("/").get(requireAuth, profileController.getAllProfiles);
// .post(
//   validator.validateProfile,
//   validateRequest,
//   profileController.createProfile
// );

router
  .route("/id/:_id")
  .get(requireAuth, profileController.getProfileByUserId)
  .patch(
    requireAuth,
    validator.validateProfile,
    validateRequest,
    profileController.patchProfile
  );
// .put(requireAuth, profileController.deleteValueFromArrayProfile);

router
  .route("/id/:_id/photo")
  .patch(requireAuth, profileController.patchProfilePhoto);

router
  .route("/id/:_id/publications")
  .post(requireAuth, validateRequest, profileController.createPublication);
// .delete(requireAuth, validateRequest, profileController.deletePublication);

// router
//   .route("/email/:email")
//   .get(requireAuth, profileController.getProfileByEmail);

module.exports = router;
