import express from "express";
import {
  deleteUser,
  test,
  getListings,
  getLandlord,
} from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getListings);
router.get("/:id", verifyToken, getLandlord);

export default router;
