const User = require("../models/user");

module.exports.signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Login failed after registration" });

      res.json({
        message: "Registration successful",
        user: { id: registeredUser._id, username: registeredUser.username },
      });
    });
  } catch (e) {
    console.error("Error registering user:", e);
    res.status(500).json({ error: e.message });
  }
};

module.exports.login = (req, res) => {
  res.json({
    message: "Login successful",
    user: { id: req.user._id, username: req.user.username },
  });
};

module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ error: "Logout failed" });

    res.json({ message: "Logout successful" });
  });
};
