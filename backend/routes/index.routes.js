import { Router } from "express";
import { createStripe } from "../service/index.js";

export const router = Router();

router.post("/api/checkout", createStripe);

router.get("/success", (req, res) => res.redirect("/success.html"));

router.get("/cancel", (req, res) => res.redirect("/cancel.html"));
