import {
	mapState,
	mapMutations
} from 'vuex'
export const indexMixin = {
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		...mapMutations(['logout']),
		...mapMutations('log', ['SETLOG']),
		back() {
			this.logout()
			uni.reLaunch({
				url: '/pages/worklog/Login'
			})
		}
	}
}
export const pageMixin = {
	computed: {
		...mapState(['userInfo', 'role', 'status']),
		...mapState('log', ['_id', '_coolcode_log_employeeno', '_coolcode_log_employeename', '_coolcode_log_date',
			'_coolcode_log_on_duty', '_coolcode_log_off_duty', '_coolcode_log_work_content', '_coolcode_log_work_timelength',
			'_coolcode_log_question', '_coolcode_log_audit_advice', '_coolcode_log_audit_comment',
			'_coolcode_log_audit_status'
		])
	},
	methods: {
		back() {
			uni.switchTab({
				url: '/pages/worklog/home/Index'
			});
		}
	}
}
