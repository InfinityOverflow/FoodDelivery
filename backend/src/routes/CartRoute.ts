import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateCartUpdationRequest, validateMyUserRequest } from "../middleware/validation";
import CartController from "../controllers/CartController";

const router = express.Router();

// /api/my/cart
router.get("/", jwtCheck, jwtParse,CartController.getCartDetails );
router.put(
    "/",
    jwtCheck,
    jwtParse,
    validateCartUpdationRequest,
    CartController.updateCart
  );
router.delete("/",jwtCheck,jwtParse,CartController.deleteCart)
export default router;