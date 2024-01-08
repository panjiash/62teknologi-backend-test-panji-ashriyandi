import crypto from "crypto";

export const generateSHA256Hash = (data) => {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
};

export const generateId = (input) => {
  function generateTimestamp() {
    const date = new Date();
    return date.toISOString();
  }

  // Function to encrypt a string using SHA256
  function encryptToSHA256(input) {
    const hash = crypto.createHash("sha256");
    hash.update(input);
    return hash.digest("hex");
  }

  // Generate timestamp with milliseconds
  const timestamp = generateTimestamp();

  // Encrypt timestamp using SHA256
  const encryptedTimestamp = encryptToSHA256(timestamp);

  return encryptedTimestamp;
};
