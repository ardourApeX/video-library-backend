//Packages and Modules

import { Router } from "express";
import { signup } from "../../../controllers/user/user.controllers";

const routes = Router();
routes.post("/signup", signup);
export { routes };
