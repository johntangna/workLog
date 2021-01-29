<template>
	<view class="work_log_setupIndex">
		<uni-nav-bar :navText="navText" :showFlag="true" @back="back"></uni-nav-bar>
		<view class="work_log_content">
			<view class="work_log_content_top border-color-uniform">
				<image src="@/static/setup.png" />
				<text>{{userInfo.realname}}</text>
			</view>
			<view class="work_log_content_bottom border-color-uniform">
				<view class="work_log_content_bottom_password border-color-uniform" @click="resetPassword">
					<text>修改密码</text>
					<image src="@/static/back.png"/>
				</view>
				<view class="work_log_content_bottom_exit" @click="exit">
					<text>退出登录</text>
					<image src="@/static/back.png"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UniNavBar from '@/pages/worklog/UniNavBar.vue'
	import {
		indexMixin
	} from '@/common/mixin.js'
	export default {
		name: 'setupIndex',
		props: {},
		components: {
			UniNavBar
		},
		mixins: [indexMixin],
		data() {
			return {
				navText: '前端工作日志'
			}
		},
		filters: {},
		computed: {},
		methods: {
			resetPassword(){
				uni.navigateTo({
					url : '/pages/worklog/setup/PasswordReset'
				})
			},
			exit(){
				this.logout()
				uni.reLaunch({
					url : '/pages/worklog/Login'
				})
			}
		},
		beforeCreate() {

		},
		onLoad() {},
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
	.work_log_setupIndex {
		.work_log_content {
			position: relative;
			top: 61px;
			.work_log_content_top {
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 129px;
				justify-content: space-around;
				padding: 20px;

				image {
					width: 66px;
					height: 66px;
					border: 3px solid #999999;
					border-radius: 50%;
				}

				text {
					font-size: 14px;
					color: #505050;
				}
			}

			.work_log_content_bottom {
				padding-left: 15px;
				image{
					transform: rotate(180deg);
					width: 15px;
					height: 15px;
					margin-right: 5px;
				}
				view{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5px 0;
				}
				text{
					font-size: 14px;
					color: #000000;
				}
			}
		}
	}
</style>
