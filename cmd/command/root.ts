// cmd/command/root.ts

import { Command } from "commander";
import { MainApp } from "../../app/app";

const program = new Command();

/* =========================
   ROOT COMMAND
========================= */
program
  .name("backend-test-service")
  .description(
    "The backend-test-service is a service to handle the backend test domain.",
  )
  .version("1.0.0")
  .action(async () => {
    const app = new MainApp();

    try {
      await app.init();
      await app.run();
    } catch (err) {
      console.error("❌ Error in running the application:", err);
      process.exit(1);
    }
  });

/* =========================
   EXECUTE
========================= */
export function execute(): void {
  program.parse(process.argv);
}
