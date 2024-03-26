import express from "express";
import {
  createListing,
  deleteListing,
  editListing,
  getListing,
  getListings,
} from "../controllers/createListing.controller.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/edit/:id", verifyToken, editListing);
router.get("/getListing/:id", getListing);
router.get("/get", getListings);
export default router;
