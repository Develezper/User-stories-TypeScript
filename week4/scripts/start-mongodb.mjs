import { mkdirSync, openSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(rootDir, ".mongodb-data");
const logPath = join(dataDir, "mongod.log");
const pidPath = join(dataDir, "mongod.pid");

mkdirSync(dataDir, { recursive: true });

function isMongoRunning() {
  const check = spawnSync(
    "mongosh",
    [
      "mongodb://127.0.0.1:27017/admin",
      "--quiet",
      "--eval",
      "db.runCommand({ ping: 1 })",
    ],
    { stdio: "ignore" },
  );

  return check.status === 0;
}

if (isMongoRunning()) {
  console.log("MongoDB is already running on 127.0.0.1:27017.");
  process.exit(0);
}

const child = spawn(
  "mongod",
  [
    "--dbpath",
    dataDir,
    "--bind_ip",
    "127.0.0.1",
    "--port",
    "27017",
    "--pidfilepath",
    pidPath,
    "--logpath",
    logPath,
  ],
  {
    detached: true,
    stdio: ["ignore", openSync(logPath, "a"), openSync(logPath, "a")],
  },
);

child.unref();

for (let attempt = 0; attempt < 20; attempt += 1) {
  await delay(250);

  if (isMongoRunning()) {
    console.log("MongoDB start requested.");
    console.log(`Data directory: ${dataDir}`);
    console.log(`Log file: ${logPath}`);
    process.exit(0);
  }
}

console.error("MongoDB did not become ready in time.");
process.exit(1);
