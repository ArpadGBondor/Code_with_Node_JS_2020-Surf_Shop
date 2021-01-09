const User = require('../models/user');
const debug = require('debug')('surf-shop:controllers/index');

module.exports = {
  async postRegister(req,res,next) {
    const newUser = new User({
      username: req.body.username,
      email:    req.body.email,
      image:    req.body.image
    });
    await User.register(newUser,req.body.password);
    res.redirect('/');

    // User.register(newUser,req.body.password,(err,user)=>{
    //   if (err) {
    //     debug(err);
    //     return next(err);
    //   } else {
    //     debug('User registered: ' + user.username);
    //     debug(user);
    //     res.redirect('/');
    //   }
    // })
    // res.send('POST REGISTER');
  },
}
