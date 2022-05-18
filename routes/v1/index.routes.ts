import { Router } from "express";
import { routes as userRoutes } from "./user/user.routes";

const routes = Router();

// User Controllers
routes.use("/user", userRoutes);

export { routes };
