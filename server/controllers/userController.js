const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    let resUser = {
      _id: user._id,
      email: user.email,
      username: user.username
    };
    // res.cookie("Chat-app-user", JSON.stringify(user), {httpOnly: false});
    return res.json({ status: true, user: resUser });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ msg: "Username not found", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    //   const hashedPassword = await bcrypt.compare(password, user.password);
    //   if(!hashedPassword) return res.json({msg: "Incorrect password", status: false});
    
    // res.cookie("Chat-app-user", JSON.stringify(user), {httpOnly: false});
    let resUser = {
      _id: user._id,
      email: user.email,
      username: user.username
    };
    return res.json({ status: true, user: resUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    const currUserid = req.params.id;
    const allusers = users.filter((user) => user._id.toString() !== currUserid);
    const resUsers = allusers.map((user)=>{
      return {
        _id: user._id,
        email: user.email,
        username: user.username
      }
    });

    return res.json(resUsers);
    // return res.json(users);
  } catch (err) {
    next(err);
  }
};

// module.exports.getAllUsers = async (req, res, next) => {
//     try {
//       const users = await User.find({ _id: { $ne: req.params.id } }).select([
//         "email",
//         "username",
//         "_id",
//       ]);
//       return res.json(users);
//     } catch (ex) {
//       next(ex);
//     }
//   };
