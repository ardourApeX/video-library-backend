//Packages and Modules

import { Router } from "express";
import {
	signup,
	verifyOTP,
	requestOTP,
	login,
} from "../../../controllers/user/user.controllers";

const routes = Router();
routes.put("/signup", signup);
routes.post("/verifyotp", verifyOTP);
routes.get("/requestOTP", requestOTP);
routes.post("/login", login);
export { routes };
