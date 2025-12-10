import os from "os";
import crypto from "crypto";

export function generateDeterministicSessionId() {
  const info = {
    cpuModel: os.cpus()[0]?.model || "",
    cpuCount: os.cpus().length,
    totalMem: os.totalmem(),
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    hostname: os.hostname(),
    homeDir: os.homedir(),
  };

  const raw = JSON.stringify(info);

  return crypto.createHash("sha256").update(raw).digest("hex");
}
