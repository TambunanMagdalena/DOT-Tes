// cmd/main.ts

import { MainApp } from "../app/app";

async function bootstrap() {
  try {
    const app = new MainApp();
    await app.init();
  } catch (err) {
    console.error("❌ Failed to start application", err);
    process.exit(1);
  }
}

bootstrap();
