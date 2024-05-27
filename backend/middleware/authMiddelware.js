const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.send({ error: "Access denied. Token not found." }, 401);
    }
    jwt.verify(token, "secret123", async (err, verifiedUser) => {
      if (err) {
        return res.send(
          { error: "Access denied. Token verification failed." },
          401
        );
      }
      const user = await UserModel.findById(verifiedUser.id);
      if (!user) {
        return res.send({ error: "Access denied. User not found." }, 401);
      }
      console.log("userVerification")
      // res.send({ user: { id: user._id, username: user.username } }, 200);  
      next();
    });
  } catch (err) {
    console.log(err);
    res.send({ error: "Server error" }, 500);
  }
};
