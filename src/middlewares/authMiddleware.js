const authMiddleware = (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

export default authMiddleware;
