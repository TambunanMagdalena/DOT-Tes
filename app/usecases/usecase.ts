// app/usecase/usecase.ts

import { MainRepository } from "../repositories";
import { Config } from "../../pkg/config/config";

/* =========================
   OPTIONS
========================= */
export interface UsecaseOptions {
  repository: MainRepository;
  config: Config;
}

/* =========================
   BASE USECASE
========================= */
export class BaseUsecase {
  protected repo: MainRepository;
  protected config: Config;

  constructor(options: UsecaseOptions) {
    this.repo = options.repository;
    this.config = options.config;
  }
}
