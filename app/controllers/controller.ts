// app/controllers/controller.ts

import { MainUsecase } from "../usecases";
import { Config } from "../../pkg/config/config";

/* =========================
   OPTIONS
========================= */
export interface ControllerOptions {
  config: Config;
  usecases: MainUsecase;
}

/* =========================
   BASE CONTROLLER
========================= */
export class BaseController {
  protected config: Config;
  protected usecases: MainUsecase;

  constructor(options: ControllerOptions) {
    this.config = options.config;
    this.usecases = options.usecases;
  }
}
