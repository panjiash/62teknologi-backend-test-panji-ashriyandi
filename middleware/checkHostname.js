const allowedHostnames = ["localhost", "localhost:3000"];
export const checkHostname = (req, res, next) => {
  const requestHostname = req.hostname;
  if (allowedHostnames.includes(requestHostname)) {
    next();
  } else {
    res.status(403).send("Forbidden: Hostname not allowed");
  }
};
