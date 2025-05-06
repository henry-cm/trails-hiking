if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./util/ExpressError");
const methodOverride = require("method-override");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const userRoutes = require("./routes/users");
const trailgroundRoutes = require("./routes/trailgrounds");
const reviewRoutes = require("./routes/reviews");
const aboutRoutes = require("./routes/about");

mongoose.connect(process.env.MONGODB_URI, {}); //first change

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.0.130:5173",
      "https://trails-hiking.com",
      "https://www.trails-hiking.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const sessionConfig = {
  secret: "shouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Check if input looks like an email
      const query = username.includes("@") ? { email: username } : { username };

      const user = await User.findOne(query);
      if (!user) return done(null, false, { message: "User not found" });

      const result = await user.authenticate(password);
      if (!result.user)
        return done(null, false, { message: "Incorrect password" });

      return done(null, result.user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(null, false);

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use((req, res, next) => {
  // console.log(req.session);
  res.locals.currentUser = req.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);

app.use("/trailgrounds", trailgroundRoutes);
app.use("/trailgrounds/:id/reviews", reviewRoutes);
app.use("/about", aboutRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";

  res.status(statusCode).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
