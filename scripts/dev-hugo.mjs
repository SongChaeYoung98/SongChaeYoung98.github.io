import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const viteBin = process.platform === "win32"
  ? path.join(rootDir, "node_modules", ".bin", "vite.cmd")
  : path.join(rootDir, "node_modules", ".bin", "vite");

const children = [];

function spawnChild(command, args, label) {
  const child = spawn(command, args, {
    cwd: rootDir,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`[${label}] stopped with signal ${signal}`);
      return;
    }

    if (code && code !== 0) {
      console.error(`[${label}] exited with code ${code}`);
      shutdown(code);
    }
  });

  child.on("error", (error) => {
    console.error(`[${label}] failed to start: ${error.message}`);
    shutdown(1);
  });

  children.push(child);
  return child;
}

function shutdown(exitCode = 0) {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(exitCode);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

spawnChild(viteBin, ["build", "--watch"], "vite");
spawnChild("hugo", ["server", "-D"], "hugo");
