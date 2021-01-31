function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};
function isSpecialChar(s){
	let regEn = /[`~!@#$^&*()_+<>?"{}\/'[\]]/im
	let regCn = /[！#￥（——）“”‘、|《》？、【】[\]]/im

	if(regEn.test(s) || regCn.test(s)){
		return true
	} else {
		return false
	}
}
export function dateFormat(fmt,dateT){
	let ret
	let date = new Date(dateT)
	let options = {
		'y+' : date.getFullYear().toString(),
		'm+' : (date.getMonth() + 1).toString(),
		'd+' : date.getDate().toString(),
		'H+' : date.getHours().toString(),
		'M+' : date.getMinutes().toString(),
		'S+' : date.getSeconds().toString()
	}
	for(let opt in options){
		ret = new RegExp('(' + opt + ')').exec(fmt)
		if(ret){
			fmt = fmt.replace(ret[1],ret[1].length <= 1 ? options[opt] : options[opt].padStart(ret[1].length,'0'))
		}
	}
	return fmt
}
export function auditAdviceFormat(res){
	let result
	switch (res){
		case '0':
		    result = '审核未通过'
			break;
		case '1':
		    result = '审核已通过'
			break;
	}
	return result
}
export function aduitStatusFormat(res){
	let result
	switch (res){
		case '0':
		    result = '未审批'
			break;
		case '1':
		    result = '已审批'
			break;
	}
	return result
}
export function validateSpecialChar(rule,value,data,callback){
	if(!value){
		callback()
	} else {
		if(isSpecialChar(value)){
			callback('请不要输入特殊符号')
		} else if(!value.trim().length) {
			callback('请不要输入空格')
		} else {
			callback()
		}
	}
}
