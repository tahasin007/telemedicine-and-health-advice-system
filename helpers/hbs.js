const moment = require('moment');
const dateFormat = require('dateformat');

module.exports = {
formatDate: function(date, format){
    return moment(date).format(format);
  },
formatDateSub: function(date, format){
	return moment(date).subtract(6, 'hours').format(format);
}
}