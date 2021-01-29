<template>
	<view class="work_log_homeIndex">
		<uni-nav-bar :navText="navText" :showFlag="true" @back="back"></uni-nav-bar>
		<uni-list>
			<uni-list-item clickable="true" @click="editWorkLog(worklog)" v-for="(worklog,index) in worklogList" :key="index"
			 :border="false" :title="titleComputed(worklog._coolcode_log_date)" :note="noteComputed(worklog._coolcode_log_work_content)"
			 :rightText="rightTextComputed(worklog._coolcode_log_audit_status)"></uni-list-item>
		    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</uni-list>
		<view class="fab" @click="addWorkLog"></view>
	</view>
</template>

<script>
	import UniNavBar from '@/pages/worklog/UniNavBar.vue'
	import {
		indexMixin
	} from '@/common/mixin.js'
	import {
		dateFormat,
		aduitStatusFormat
	} from '@/common/util.js'
	export default {
		name: 'homeIndex',
		props: {},
		components: {
			UniNavBar,
		},
		mixins: [indexMixin],
		data() {
			return {
				navText: '前端工作日志',
				worklogList: [],
				loadMoreText: '加载列表中...',
				showLoadMore: true,
				currentPage : 1,
				total : 0
			}
		},
		filters: {},
		computed: {
			titleComputed() {
				return (res) => {
					let fmt = dateFormat('yyyy-mm-dd', res)
					return `日志时间:${fmt}`
				}
			},
			noteComputed() {
				return (res) => {
					return `工作内容:${res}`
				}
			},
			rightTextComputed() {
				return (res) => {
					let result = aduitStatusFormat(res)
					return result
				}
			}
		},
		methods: {
			async getAllDataCount(){
				const dbRes = await this.$db.collection("worklog_log").aggregate()
					.match({
						_coolcode_log_employeeno: this.$db.command.aggregate.eq(this.userInfo.username)
					})
					.count('total')
					.end();
				if(dbRes.result.data.length == 0){
					uni.showToast({
						title: '暂无数据！',
						icon: 'none',
						duration: 1000,
					})
				} else {
					this.total = dbRes.result.data[0].total
				}
			},
			async getLogData() {
				const dbRes = await this.$db.collection("worklog_log").aggregate()
					.match({
						_coolcode_log_employeeno: this.$db.command.aggregate.eq(this.userInfo.username)
					})
					.sort({
						_coolcode_log_date: -1
					})
					.limit(10 * this.currentPage)
					.end();
				this.worklogList = dbRes.result.data
				this.showLoadMore = false
			},
			editWorkLog(data) {
				this.SETLOG(data)
				uni.redirectTo({
					url : '/pages/worklog/home/EditWorkLog'
				})
			},
			addWorkLog(){
				uni.redirectTo({
					url : '/pages/worklog/home/AddWorkLog'
				})
			}
		},
		beforeCreate() {

		},
		onLoad() {
			this.getAllDataCount()
			this.getLogData()
		},
		onReachBottom() {
			if(this.worklogList.length < this.total){
				this.showLoadMore = true
				setTimeout(()=>{
					this.currentPage++
					this.getLogData()
				},350)
			} else if(this.worklogList.length == this.total) {
				this.showLoadMore = true
				this.loadMoreText = '已无更多数据！'
			}
		},
		onPageScroll(e) {
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
	.position50{
		position: absolute;
		left: 50%;
		transform: translate(-50%,-50%);
		top: 50%;
	}
	.work_log_homeIndex {
		/deep/ .uni-list {
			position: absolute !important;
			top: 61px;

			&::before {
				content: unset;
			}

			&::after {
				content: unset;
			}

			.uni-list--border-top {
				height: unset;
			}

			.uni-list--border-bottom {
				height: unset;
			}
		}

		.uni-loadmore {
			position: relative !important;
			text-align:center;
			padding-bottom: unset;
		}
		.fab{
			position: fixed;
			right: 15px;
			bottom: 60px;
			width: 48px;
			height: 48px;
			border-radius: 50%;
			border: 1px solid #999999;
			background-color: #FFFFFF;
			&::before{
				content: '';
				width: 26px;
				height: 26px;
				border-radius: 50%;
				border: 3px solid #2a82e4;
				@extend .position50
			}
			&::after{
				content: '';
				background: url(@/static/add.png) 0 0 no-repeat;
				width: 24px;
				height: 24px;
				@extend .position50
			}
		}
	}
</style>
