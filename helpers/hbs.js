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
  timeDiff:function(then){
    const current = moment();
    const diff = current.diff(then);
    const diffDuration = moment.duration(diff);
    const days = diffDuration.days();
    const hours = diffDuration.hours();
    const minutes = diffDuration.minutes();
    var daystr, hourstr, minstr;
    daystr = (days > 1)? ' days ' :  ' day ';
    hourstr = (hours > 1)? ' hours ' :  ' hour ';
    minstr = (minutes > 1)? ' minutes ' :  ' minute ';
    if(days == 0 && hours == 0)return minutes + minstr + "ago";
    else if(days == 0)return hours + hourstr + minutes + minstr +"ago";
    else return days + daystr + hours + hourstr + minutes + minstr +"ago";


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
