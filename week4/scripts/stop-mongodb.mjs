import { existsSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(rootDir, ".mongodb-data");
const pidPath = join(dataDir, "mongod.pid");

function isMongoRunning() {
  const ping = spawnSync(
    "mongosh",
    [
      "mongodb://127.0.0.1:27017/admin",
      "--quiet",
      "--eval",
      "db.runCommand({ ping: 1 })",
    ],
    { stdio: "ignore" },
  );

  return ping.status === 0;
}

spawnSync(
  "mongosh",
  [
    "mongodb://127.0.0.1:27017/admin",
    "--quiet",
    "--eval",
    "db.adminCommand({ shutdown: 1, force: true })",
  ],
  { encoding: "utf8" },
);

for (let attempt = 0; attempt < 20; attempt += 1) {
  if (!isMongoRunning()) {
    if (existsSync(pidPath)) {
      rmSync(pidPath, { force: true });
    }

    console.log("MongoDB stop requested.");
    process.exit(0);
  }

  await delay(250);
}

if (!isMongoRunning()) {
  if (existsSync(pidPath)) {
    rmSync(pidPath, { force: true });
  }

  console.log("MongoDB stop requested.");
  process.exit(0);
}

if (existsSync(pidPath)) {
  const pid = Number(readFileSync(pidPath, "utf8").trim());

  if (Number.isFinite(pid)) {
    try {
      process.kill(pid, "SIGTERM");
      rmSync(pidPath, { force: true });
      console.log(`MongoDB process ${pid} terminated with SIGTERM.`);
      process.exit(0);
    } catch {
      // Fall through to the final error below.
    }
  }
}

console.error(
  "MongoDB does not appear to be running, or it could not be stopped.",
);
process.exit(1);
