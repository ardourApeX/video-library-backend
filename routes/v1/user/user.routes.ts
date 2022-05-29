//Packages and Modules

import { Router } from "express";
import {
	signup,
	verifyOTP,
	requestOTP,
} from "../../../controllers/user/user.controllers";

const routes = Router();
routes.put("/signup", signup);
routes.post("/verifyotp", verifyOTP);
routes.post("/requestOTP", requestOTP);
export { routes };
