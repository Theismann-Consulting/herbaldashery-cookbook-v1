const User = require('../models/user');

module.exports = {
    index,
    new: newUser,
    create,
    edit,
    update,
    show,
    delete: deleteUser,
};

function index(req, res, next) {
    User.find({}, function (err, users){
        res.render('users/index', {
          users,
          contributor: req.user,
          name: req.query.name,
      });
    });
};

function show(req, res) {
    User.findById(req.params.id, function(err, user) {
          res.render('users/show', { 
          user,
        });
    });
};

function newUser(req, res) {
    res.render('users/new', {
        contributor: req.user,
      });
}

function create(req, res, next){
    const user = new User(req.body);
    user.save(function(err) {
        if (err) {return res.render('users/new', {
            contributor: req.user
        })};
        res.render('users/',{
        contributor: req.user,
        });
    });
};

function edit(req, res){
    User.findById({ _id: req.params.id }, function(err, user){
      res.render('user/edit', {
        user,
        contributor: req.user,
      });
    });
  }

  function update(req, res) {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, function(err, user){
        res.render(`recipes/ingredients/index`,{
        contributor: req.user,
        });
    });
  };

  function deleteUser(req, res, next) {
    User.findByIdAndDelete(req.params.id, function(err) {
        res.render('user/index');
    });
  };