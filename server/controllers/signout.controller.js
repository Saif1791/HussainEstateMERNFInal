export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(201).json("Logged Out Successfully!");
  } catch (error) {
    next(error);
  }
};
