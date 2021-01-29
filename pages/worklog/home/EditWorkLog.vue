<template>
	<view class="editWorkLog">
		<uni-nav-bar :navText="navText" :showFlag="true" @back="back"></uni-nav-bar>
		<view class="editWorkLog_title border-color-uniform">
			<text>编辑日志</text>
		</view>
		<view class="editWorkLogForm">
			<uni-forms :value="formData" ref="editWorkLogForm">
				<uni-forms-item label="工号" name="username">
					<view class="lineHeight36px">{{formData.username}}</view>
					<!-- <uni-easyinput disabled="true" type="text" v-model="formData.username" /> -->
				</uni-forms-item>
				<uni-forms-item label="姓名" name="realname">
					<view class="lineHeight36px">{{formData.realname}}</view>
					<!-- <uni-easyinput disabled="true" type="text" v-model="formData.realname" /> -->
				</uni-forms-item>
				<uni-forms-item label="日期" name="workDate">
					<!-- <picker mode="date" :value="formData.workDate" @change="bindDateChange">
						<view class="uni-input">{{formData.workDate}}</view>
					</picker> -->
					<view class="lineHeight36px">{{formData.workDate}}</view>
					<!-- <uni-easyinput type="password" v-model="formData.workDate" /> -->
				</uni-forms-item>
				<uni-forms-item label="审批状态" name="onDutyDate">
					<view class="lineHeight36px">{{aduitStatusFormat(formData.auditStatus)}}</view>
				</uni-forms-item>
				<uni-forms-item label="工作时长" name="workTimeLength">
					<uni-easyinput type="number" v-model="formData.workTimeLength" placeholder="请输入工作时长(小时)" />
				</uni-forms-item>
				<uni-forms-item label="工作内容" name="workContent">
					<uni-easyinput type="textarea" v-model="formData.workContent" placeholder="请输入工作内容" />
				</uni-forms-item>
				<uni-forms-item label="需协调的问题" name="question">
					<uni-easyinput type="textarea" v-model="formData.question" placeholder="请输入需协调的问题,没有请写'无'" />
				</uni-forms-item>
				<uni-forms-item label="审批意见" name="auditAdvice">
					<view class="lineHeight36px">{{auditAdviceFormat(formData.auditAdvice)}}</view>
				</uni-forms-item>
				<uni-forms-item label="审批备注" name="auditComment">
					<uni-easyinput type="textarea" disabled="true" v-model="formData.auditComment" />
				</uni-forms-item>
				<view class="uni-btn-v">
					<button type="default" @click="submit" :loading="loading" :disabled="loadingDisable">确认编辑</button>
					<button type="warn" @click="deleteSubmit" :loading="deleteLoading" :disabled="deleteLoadingDisable">删除</button>
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
		dateFormat,
		aduitStatusFormat,
		auditAdviceFormat
	} from '@/common/util.js'
	export default {
		name: 'addWorkLog',
		props: {},
		components: {
			UniNavBar
		},
		mixins: [pageMixin],
		data() {
			return {
				navText: '编辑日志',
				loading: false,
				deleteLoading: false,
				loadingDisable: false,
				deleteLoadingDisable: false,
				rules: {
					workContent: {
						rules: [{
							required: true,
							errorMessage: "请输入工作内容"
						}, {
							trigger: 'submit'
						}, {
							validateFunction: this.$validateSpecialChar
						}]
					},
					workTimeLength: {
						rules: [{
							required: true,
							errorMessage: "请输入工作时长"
						}, {
							trigger: 'submit'
						}, {
							validateFunction: this.$validateSpecialChar
						}]
					},
					question: {
						rules: [{
							required: true,
							errorMessage: "请输入需协调的问题，没有请写'无'"
						}, {
							trigger: 'submit'
						}, {
							validateFunction: this.$validateSpecialChar
						}]
					}
				},
				formData: {
					username: '',
					realname: '',
					workDate: '',
					auditStatus: '',
					workTimeLength: '',
					workContent: '',
					question: '',
					auditAdvice: '',
					auditComment: ''
				}
			}
		},
		filters: {},
		computed: {
			auditAdviceFormat() {
				return (cb) => {
					return auditAdviceFormat(cb)
				}
			},
			aduitStatusFormat() {
				return (cb) => {
					return aduitStatusFormat(cb)
				}
			}
		},
		methods: {
			submit() {
				this.$refs.editWorkLogForm.submit().then(async (res) => {
					this.loading = true
					this.loadingDisable = true
					this.deleteLoadingDisable = true
					await this.$db.collection("worklog_log")
						.where({
							_id: this._id
						})
						.update({
							_coolcode_log_work_content: res.workContent,
							_coolcode_log_question: res.question,
							_coolcode_log_work_timelength: res.workTimeLength
						})
						.then(res => {
							uni.showToast({
								title: '日志编辑成功！',
								icon: 'success',
								duration: 1000,
								success: (result) => {
									setTimeout(() => {
										this.loading = false
										this.loadingDisable = false
										uni.switchTab({
											url: '/pages/worklog/home/Index'
										});
									}, 1000)
								}
							})
						}).catch(err => {
							uni.showModal({
								content: err.message || '编辑失败',
								showCancel: false
							})
							this.loading = false
							this.loadingDisable = false
						})
				})
			},
			async deleteSubmit() {
				this.loadingDisable = true
				this.deleteLoading = true
				this.deleteLoadingDisable = true
				await this.$db.collection("worklog_log")
					.doc(this._id)
					.remove()
					.then(res => {
						uni.showToast({
							title: '日志删除成功！',
							icon: 'success',
							duration: 1000,
							success: (result) => {
								setTimeout(() => {
									this.deleteLoading = false
									this.deleteLoadingDsiable = false
									uni.switchTab({
										url: '/pages/worklog/home/Index'
									});
								}, 1000)
							}
						})
					}).catch(err => {
						uni.showModal({
							content: err.message || '删除失败',
							showCancel: false
						})
						this.deleteLoading = false
						this.deleteLoadingDsiable = false
					})
			}
		},
		beforeCreate() {

		},
		onLoad() {
			this.formData.username = this.userInfo.username
			this.formData.realname = this.userInfo.realname
			this.formData.workDate = dateFormat('yyyy-mm-dd', new Date(this._coolcode_log_date))
			this.formData.auditStatus = this._coolcode_log_audit_status
			this.formData.workTimeLength = this._coolcode_log_work_timelength
			this.formData.workContent = this._coolcode_log_work_content
			this.formData.question = this._coolcode_log_question
			this.formData.auditAdvice = this._coolcode_log_audit_advice
			this.formData.auditComment = this._coolcode_log_audit_comment
		},
		beforeMount() {

		},
		onReady() {
			this.$refs.editWorkLogForm.setRules(this.rules)
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
	.editWorkLog {
		.editWorkLog_title {
			position: relative;
			top: 61px;
			font-size: 14px;
			color: $uni-color-subtitle;
			padding: 0 $uni-spacing-row-lg $uni-spacing-col-sm $uni-spacing-row-lg;
		}

		.editWorkLogForm {
			position: relative;
			top: 61px;

			.uni-forms {
				.lineHeight36px {
					line-height: 36px;
				}

				.uni-forms--top {
					padding: 0 15px 10px 15px;
				}

				.uni-forms-item {
					.uni-forms-item__label {}
				}

				.uni-input {
					background-color: rgba(153, 153, 153, 0.26);
					width: 136px;
					margin: 0 auto;
					color: #2a82e4;
					text-align: center;
				}

				.uni-btn-v {
					padding: unset;
					display: flex;
					justify-content: space-around;

					button {
						background-color: $custom-button-color;
						border-radius: $uni-border-radius-sm;
						font-size: 14px;
						color: #FFFFFF;
						height: 36px;
						line-height: 36px;
						width: 138px;
					}

					button+button {
						background-color: #e64340;
					}
				}
			}
		}
	}
</style>
