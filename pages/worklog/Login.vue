<template>
	<view class="work_log_login">
		<uni-nav-bar :navText="navText" :showFlag="false"></uni-nav-bar>
		<view class="work_log_login_title border-color-uniform">
			<text>登录</text>
		</view>
		<view class="work_log_login_form">
			<uni-forms :value="formData" ref="loginForm">
				<uni-forms-item label="工号" name="username">
					<uni-easyinput type="text" v-model="formData.username" placeholder="请输入工号" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="passwordSecret">
					<uni-easyinput type="password" v-model="formData.passwordSecret" placeholder="请输入密码" />
				</uni-forms-item>
				<view class="uni-btn-v">
					<button type="default" @click="submit" :loading="loading" :disabled="loading">登录</button>
				</view>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import UniNavBar from '@/pages/worklog/UniNavBar.vue'
	export default {
		name: 'WorkLogLogin',
		props: {},
		components: {
			UniNavBar
		},
		data() {
			return {
				navText: "工号登录",
				formData: {
					username: "",
					passwordSecret: ""
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: "请输入工号"
						}, {
							trigger: 'submit'
						},{
							validateFunction : this.$validateSpecialChar
						}]
					},
					passwordSecret: {
						rules: [{
							required: true,
							errorMessage: "请输入密码"
						}, {
							trigger: 'submit'
						},{
							validateFunction : this.$validateSpecialChar
						}]
					}
				},
				loading: false
			}
		},
		filters: {},
		computed: {
		},
		methods: {
			...mapMutations(['login']),
			submit() {
				this.$refs.loginForm.submit().then(async res => {
					this.loading = true
					const dbRes = await this.$db.collection("worklog_user").where({
						"_coolcode_username": this.$db.command.eq(res.username),
						"_coolcode_password": this.$db.command.eq(res.passwordSecret)
					}).get()
					if (dbRes.result.data.length) {
						if(dbRes.result.data[0]._coolcode_status == '0'){
							uni.showToast({
								title: '账户已被禁用，请联系管理员！',
								icon: 'none',
								duration: 2000,
								success: (result) => {
									setTimeout(()=>{
										this.loading = false
									},2000)
								}
							})
						} else {
							uni.showToast({
								title: '登录成功！',
								icon: 'success',
								duration: 1000,
								success : (result)=> {
									setTimeout(()=>{
										const assignObject = {
											"username" : res.username,
											"realname" : dbRes.result.data[0]._coolcode_realname,
											"_coolcode_role" : dbRes.result.data[0]._coolcode_role,
											"_coolcode_status" : dbRes.result.data[0]._coolcode_status
										}
										this.login(assignObject)
										uni.switchTab({
											url: '/pages/worklog/home/Index',
										})
										this.loading = false
									},1000)
								}
							});
						}
					} else {
						uni.showToast({
							title: '用户名或密码错误！',
							icon: 'none',
							duration: 2000,
							success : (result)=> {
								setTimeout(()=>{
									this.loading = false
								},2000)
							}
						});
					}
				})
			}
		},
		beforeCreate() {

		},
		created() {

		},
		beforeMount() {

		},
		onReady() {
			this.$refs.loginForm.setRules(this.rules)
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

<style lang="scss" scoped>
	.work_log_login {
		.work_log_login_title {
			position: relative;
			top: 61px;
			font-size: 14px;
			color: $uni-color-subtitle;
			padding: 0 $uni-spacing-row-lg $uni-spacing-col-sm $uni-spacing-row-lg;
		}

		.work_log_login_form {
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
