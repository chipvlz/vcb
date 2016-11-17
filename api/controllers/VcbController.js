/**
 * VcbController
 *
 * @description :: Server-side logic for managing vcbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
module.exports = {
	getname: (req,res) => {
    if (!req.isSocket) {
      return res.badRequest('Bạn làm gì có khả năng chôm được chức năng này, đừng cố thể hiện nữa nhe , IP của bạn đã được lưu lại là :'+req.ip);}
    let params = req.allParams();

    request.get({
      url: 'https://santienao.com/api/v1/bank_accounts/'+params.number_vcb
    },function(error,response,body){
      if(error) {
        sails.log.error(error);
      } else {
        var data = JSON.parse(body);
        sails.sockets.join(req, params.number_vcb);
        sails.sockets.broadcast(params.number_vcb, 'vcb_number/check',{msg:data.account_name});
      }
    })
  }
};

