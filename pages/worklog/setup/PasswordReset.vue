<template>
	<view class="work_log_passwordreset">
		<uni-nav-bar :navText="navText" :showFlag="true" @back="back"></uni-nav-bar>
		<view class="work_log_passwordreset_title border-color-uniform">
			<text>修改密码</text>
		</view>
		<view class="work_log_passwordreset_form">
			<uni-forms :rules="rules" :value="formData" ref="passwordresetForm">
				<uni-forms-item label="工号" name="username">
					<uni-easyinput disabled="true" type="text" v-model="formData.username" />
				</uni-forms-item>
				<uni-forms-item label="姓名" name="realname">
					<uni-easyinput disabled="true" type="text" v-model="formData.realname" />
				</uni-forms-item>
				<uni-forms-item label="原密码" name="oldPassword">
					<uni-easyinput type="password" v-model="formData.oldPassword" />
				</uni-forms-item>
				<uni-forms-item label="新密码" name="newPassword">
					<uni-easyinput type="password" v-model="formData.newPassword" />
				</uni-forms-item>
				<uni-forms-item label="确认密码" name="confirmPassword">
					<uni-easyinput type="password" v-model="formData.confirmPassword" />
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
	export default {
		name: 'PasswordReset',
		props: {},
		components: {
			UniNavBar
		},
		mixins: [pageMixin],
		data() {
			return {
				navText: "修改密码",
				loading : false,
				rules: {
					oldPassword: {
						rules: [{
							required: true,
							errorMessage: "请输入原密码"
						}, {
							trigger: 'submit'
						},{
							validateFunction : this.$validateSpecialChar
						}]
					},
					newPassword: {
						rules: [{
							required: true,
							errorMessage: "请输入新密码"
						}, {
							trigger: 'submit'
						},{
							validateFunction : this.$validateSpecialChar
						}]
					},
					confirmPassword: {
						rules: [{
							required: true,
							errorMessage: "请输入确认密码"
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
					oldPassword: '',
					newPassword: '',
					confirmPassword: ''
				}
			}
		},
		filters: {},
		computed: {},
		methods: {
			async oldPasswordCompare(res){
				const dbRes = await this.$db.collection("worklog_user").where({
					"_coolcode_username": this.$db.command.eq(res.username)
				}).get()
				if(dbRes.result.data[0]._coolcode_password != res.oldPassword){
					return true
				} else {
					return false
				}
			},
			submit() {
				this.$refs.passwordresetForm.submit().then(async res => {
					this.loading = true
					if(res.oldPassword){
						const dbRes = await this.$db.collection("worklog_user").where({
							"_coolcode_username": this.$db.command.eq(res.username)
						}).get()
						.catch(err=>{
							uni.showModal({
								content: err.message || '查询旧密码失败',
								showCancel: false
							})
						})
						if(dbRes.result.data[0]._coolcode_password != res.oldPassword){
							uni.showToast({
								title: '原密码输入错误！',
								icon: 'none',
								duration: 2000
							});
							this.loading = false
							return
						}
					}
					setTimeout(async ()=>{
						if(res.newPassword != res.confirmPassword){
							uni.showToast({
								title: '新密码与确认密码不一致！',
								icon: 'none',
								duration: 2000
							});
							this.loading = false
							return
						}
						const dbRes = await this.$db.collection("worklog_user").where({
							"_coolcode_username": this.$db.command.eq(res.username)
						}).update({
							"_coolcode_password": res.confirmPassword
						})
						.catch(err=>{
							uni.showModal({
								content: err.message || '修改密码失败',
								showCancel: false
							})
						})
						uni.showToast({
							title: '修改成功！',
							icon: 'none',
							duration: 1000,
							success() {
								setTimeout(()=>{
									uni.navigateBack()
								},1000)
							}
						});
						this.loading = false
					},0)
				})
			}
		},
		beforeCreate() {

		},
		onLoad() {
			this.formData.username = this.userInfo.username
			this.formData.realname = this.userInfo.realname
		},
		beforeMount() {

		},
		onReady() {

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
	.work_log_passwordreset {
		.work_log_passwordreset_title {
			position: relative;
			top: 61px;
			font-size: 14px;
			color: $uni-color-subtitle;
			padding: $uni-spacing-row-lg $uni-spacing-row-lg $uni-spacing-col-sm;
		}

		.work_log_passwordreset_form {
			position: relative;
			top: 61px;
			.uni-forms {
				.uni-forms--top {
					padding: 0 15px 10px 15px;
				}

				.uni-forms-item {
					.uni-forms-item__label {}
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
