var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');

var ControllerPrototype = require('../controller.prototype');
var Supplement = require('../../models/Supplement');

module.exports = (function() {
  var controller = ControllerPrototype.create({
    path:'/api/supplement'
  });
  var router = controller.router;

  router.get('/', function(req,res){
    //DUMMY DATA
    res.send(
      JSON.stringify([
        {supplement:'preWorkout',amount:'5 scoops+3scoops'}
      ])
    );
  });
  return controller;
})()
