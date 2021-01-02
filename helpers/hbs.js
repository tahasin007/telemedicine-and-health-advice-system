const moment = require('moment');
const dateFormat = require('dateformat');

module.exports = {
  formatDate: function(date, format){
    return moment(date).format(format);
  },
  iff:function (friends, userName, opts) {
    
    if(friends != null){
      for(var i=0; i<friends.length; i++){
        if(friends.friendName == userName){
          return opts.inverse(this);
        }
      }
    }
  return opts.fn(this);
  },
  formatDateSub: function(date, format){
    return moment(date).subtract(6, 'hours').format(format);
  },
  forLoop:function(from,to,block){
    var accum = '';
    for(var i = from; i < to; i ++)
    accum += block.fn(i);
    return accum;
  }
}
