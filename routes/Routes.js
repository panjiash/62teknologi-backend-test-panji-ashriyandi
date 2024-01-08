import express from "express";
import {
  deleteBusiness,
  getAllBusiness,
  getBusiness,
  postBusiness,
  updateBusiness,
} from "../controllers/businesses.js";
import { checkHostname } from "../middleware/checkHostname.js";

const Routes = express.Router();
Routes.get("/business", checkHostname, getAllBusiness);
Routes.get("/business/:id", checkHostname, getBusiness);
Routes.post("/business", checkHostname, postBusiness);
Routes.put("/business/:id", checkHostname, updateBusiness);
Routes.delete("/business/:id", checkHostname, deleteBusiness);
export default Routes;
