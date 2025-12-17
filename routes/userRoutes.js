import express from "express";
import {
    getUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", saveUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
