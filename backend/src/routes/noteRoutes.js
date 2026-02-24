import express from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;

