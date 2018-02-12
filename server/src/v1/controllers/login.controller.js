const UserService = require('../../services/user.service');

function login(req, res, next) {
  UserService.findOne({role: 'admin'})
    .then(user => {
      if (user.username == req.body.username && user.password == req.body.password) {
        res.send({
          message: 'Login Successfully!',
          success: true
        })
      } else {
        throw new Error("Mismatch email/username and password.")
      }
    })
    .catch(err => {
      next(err);
    })
}


module.exports = {
  login
};