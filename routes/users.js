const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

// ✅ Register Route (Fixes 404 error)
router.post("/register", async (req, res) => {
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
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: "Server error" });
    if (!user)
      return res.status(401).json({ error: "Invalid username or password" });

    req.login(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Login failed after authentication" });

      const userData = {
        id: user._id,
        username: user.username,
      };

      return res.json({ message: "Login successful", user: userData });
    });
  })(req, res, next);
});

router.get("/current-user", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid", {
        sameSite: "none", // Required for cross-origin
        secure: true, // Required for HTTPS
      });

      return res.json({ message: "Logout successful" });
    });
  });
});

module.exports = router;
