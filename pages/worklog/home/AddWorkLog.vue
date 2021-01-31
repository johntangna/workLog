<template>
	<view class="addWorkLog">
		<uni-nav-bar :navText="navText" :showFlag="true" @back="back"></uni-nav-bar>
		<view class="addWorkLog_title border-color-uniform">
			<text>添加日志</text>
		</view>
		<view class="addWorkLog_form">
			<uni-forms :value="formData" ref="addWorkLogForm">
				<uni-forms-item label="工号" name="username">
					<view class="lineHeight36px">{{formData.username}}</view>
					<!-- <uni-easyinput disabled="true" type="text" v-model="formData.username" /> -->
				</uni-forms-item>
				<uni-forms-item label="姓名" name="realname">
					<view class="lineHeight36px">{{formData.realname}}</view>
					<!-- <uni-easyinput disabled="true" type="text" v-model="formData.realname" /> -->
				</uni-forms-item>
				<uni-forms-item label="日期" name="workDate">
					<picker mode="date" :value="formData.workDate" @change="bindDateChange">
						<view class="uni-input">{{formData.workDate}}</view>
					</picker>
					<!-- <uni-easyinput type="password" v-model="formData.workDate" /> -->
				</uni-forms-item>
				<uni-forms-item label="上班时间" name="onDutyDate">
					<picker mode="time" :value="formData.onDutyDate" @change="bindOnDutyTimeChange">
						<view class="uni-input">{{formData.onDutyDate}}</view>
					</picker>
					<!-- <uni-easyinput type="password" v-model="formData.onDutyDate" /> -->
				</uni-forms-item>
				<uni-forms-item label="下班时间" name="offDutyTime">
					<picker mode="time" :value="formData.offDutyTime" @change="bindOffDutyTimeChange">
						<view class="uni-input">{{formData.offDutyTime}}</view>
					</picker>
					<!-- <uni-easyinput type="password" v-model="formData.offDutyTime" /> -->
				</uni-forms-item>
				<uni-forms-item label="工作内容" name="workContent">
					<uni-easyinput type="textarea" v-model="formData.workContent" placeholder="请输入工作内容"/>
				</uni-forms-item>
				<uni-forms-item label="工作时长" name="workTimeLength">
					<uni-easyinput type="digit" v-model="formData.workTimeLength" placeholder="请输入工作时长(小时)"/>
				</uni-forms-item>
				<uni-forms-item label="需协调的问题" name="question">
					<uni-easyinput type="textarea" v-model="formData.question" placeholder="请输入需协调的问题,没有请写'无'"/>
				</uni-forms-item>
				<view class="uni-btn-v">
					<button type="default" @click="submit" :loading="loading" :disabled="loading">提交</button>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import UniNavBar from '@/pages/worklog/UniNavBar.vue'
	import {
		pageMixin
	} from '@/common/mixin.js'
	import {
		dateFormat
	} from '@/common/util.js'
	export default {
		name: 'addWorkLog',
		props: {},
		components: {UniNavBar},
		mixins:[pageMixin],
		data() {
			return {
				navText : '添加日志',
				loading : false,
				rules: {
					workContent: {
						rules: [{
							required: true,
							errorMessage: "请输入工作内容"
						}, {
							trigger: 'submit'
						},{
							validateFunction : this.$validateSpecialChar
						}]
					},
					workTimeLength: {
						rules: [{
							required: true,
							errorMessage: "请输入工作时长"
						}, {
							trigger: 'submit'
						},{
							validateFunction : this.$validateSpecialChar
						}]
					},
					question: {
						rules: [{
							required: true,
							errorMessage: "请输入需协调的问题，没有请写'无'"
						}, {
							trigger: 'submit'
						},{
							validateFunction : this.$validateSpecialChar
						}]
					}
				},
				formData: {
					username: '',
					realname: '',
					workDate: '',
					onDutyDate: '',
					offDutyTime: '',
					workContent : '',
					workTimeLength : '',
					question : ''
				}
			}
		},
		filters: {},
		computed: {},
		methods: {
			bindDateChange(e){
				this.formData.workDate = e.detail.value
			},
			bindOnDutyTimeChange(e){
				this.formData.onDutyDate = e.detail.value
			},
			bindOffDutyTimeChange(e){
				this.formData.offDutyTime = e.detail.value
			},
			submit(){
				this.$refs.addWorkLogForm.submit().then((res)=>{
					this.loading = true
					let onDuty = new Date(dateFormat('yyyy/mm/dd',res.workDate) + ' ' + res.onDutyDate).getTime()
					let offDuty = new Date(dateFormat('yyyy/mm/dd',res.workDate) + ' ' + res.offDutyTime).getTime()
					uni.showModal({
					    content: onDuty,
					    showCancel: false
					})
					this.$db.collection("worklog_log").add({
						_coolcode_log_employeeno : res.username,
						_coolcode_log_employeename : res.realname,
						_coolcode_log_date : new Date(res.workDate).getTime(),
						_coolcode_log_on_duty : onDuty,
						_coolcode_log_off_duty : offDuty,
						_coolcode_log_work_content : res.workContent,
						_coolcode_log_work_timelength : res.workTimeLength,
						_coolcode_log_question : res.question,
						_coolcode_log_audit_advice : '0',
						_coolcode_log_audit_comment : '',
						_coolcode_log_audit_status : '0'
					}).then(res=>{
						uni.showToast({
							title: '日志新增成功！',
							icon: 'success',
							duration: 1000,
							success :(result)=> {
								setTimeout(()=>{
									this.loading = false
									uni.switchTab({
										url: '/pages/worklog/home/Index'
									});
								},1000)
							}
						})
					}).catch(err=>{
						uni.showModal({
						    content: err.message || '新增失败',
						    showCancel: false
						})
						this.loading = false
					})
				})
			}
		},
		beforeCreate() {

		},
		onLoad() {
			this.formData.username = this.userInfo.username
			this.formData.realname = this.userInfo.realname
			this.formData.workDate = dateFormat('yyyy-mm-dd',new Date())
			this.formData.onDutyDate = '08:30'
			this.formData.offDutyTime = '17:30'
		},
		beforeMount() {

		},
		onReady() {
			this.$refs.addWorkLogForm.setRules(this.rules)
		},
		beforeUpdate() {

		},
		updated() {

		},
		beforeDestroy() {

		},
		destroyed() {

		},
		beforeRouteUpdate() {

		},
		beforeRouteLeave() {

		},
		beforeRouteEnter() {

		}
	}
</script>

<style lang="scss" scoped="scoped">
	.addWorkLog{
		.addWorkLog_title{
			position: relative;
			top: 61px;
			font-size: 14px;
			color: $uni-color-subtitle;
			padding: 0 $uni-spacing-row-lg $uni-spacing-col-sm $uni-spacing-row-lg;
		}
		.addWorkLog_form{
			position: relative;
			top: 61px;
			.uni-forms {
				.lineHeight36px{
					line-height: 36px;
				}
				.uni-forms--top {
					padding: 0 15px 10px 15px;
				}

				.uni-forms-item {
					.uni-forms-item__label {}
				}
				.uni-input{
					background-color: rgba(153, 153, 153, 0.26);
				    width: 136px;
				    margin: 0 auto;
				    color: #2a82e4;
				    text-align: center;
				}

				.uni-btn-v {
					padding: unset;

					button {
						background-color: $custom-button-color;
						border-radius: $uni-border-radius-sm;
						font-size: 14px;
						color: #FFFFFF;
						height: 36px;
						line-height: 36px;
					}
				}
			}
		}
	}
</style>
