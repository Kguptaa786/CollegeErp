const passport = require("passport");
const Admin = require("../models/admin");
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};

const secretOrKey = process.env.SECRET_OR_KEY;

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload);
    const admin = await Admin.findById(jwt_payload.id);
    const student = await Student.findById(jwt_payload.id);
    const faculty = await Faculty.findById(jwt_payload.id);
    if (admin) {
      return done(null, admin);
    } else if (student) {
      return done(null, student);
    } else if (faculty) {
      return done(null, faculty);
    } else {
      return done(null, false);
    }
  })
);
