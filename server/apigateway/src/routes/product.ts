import { Router } from "express";

const router = Router();

router.get("/products", (req, res) => {
  res.json({ message: "List of products" });
});

export default router;
