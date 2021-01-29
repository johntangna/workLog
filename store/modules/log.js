export default {
	state : {
		_id : '',
		_coolcode_log_employeeno : '',
		_coolcode_log_employeename : '',
		_coolcode_log_date : null,
		_coolcode_log_on_duty : null,
		_coolcode_log_off_duty : null,
		_coolcode_log_work_content : '',
		_coolcode_log_work_timelength : '',
		_coolcode_log_question : '',
		_coolcode_log_audit_advice : '',
		_coolcode_log_audit_comment : '',
		_coolcode_log_audit_status : ''
	},
	mutations : {
		SETLOG(state,provider){
			state._id = provider._id
			state._coolcode_log_employeeno = provider._coolcode_log_employeeno
			state._coolcode_log_employeename = provider._coolcode_log_employeename
			state._coolcode_log_date = provider._coolcode_log_date
			state._coolcode_log_on_duty = provider._coolcode_log_on_duty
			state._coolcode_log_off_duty = provider._coolcode_log_off_duty
			state._coolcode_log_work_content = provider._coolcode_log_work_content
			state._coolcode_log_work_timelength = provider._coolcode_log_work_timelength
			state._coolcode_log_question = provider._coolcode_log_question
			state._coolcode_log_audit_advice = provider._coolcode_log_audit_advice
			state._coolcode_log_audit_comment = provider._coolcode_log_audit_comment
			state._coolcode_log_audit_status = provider._coolcode_log_audit_status
		}
	},
	getters : {
	},
	actions : {}
}
