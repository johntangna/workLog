<template>
	<view class="uni-nav-bar">
		<view>
			<view class="status-btn"></view>
			<view class="uni-nav-bar-bottom">
				<image src="@/static/back.png" @click="backEmit" v-if="showFlag"/>
				<text>{{navText}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniNavBar',
		props: {
			navText: {
				type: String,
				default: ""
			},
			showFlag: {
				type : Boolean,
				default: ""
			}
		},
		components: {},
		data() {
			return {

			}
		},
		filters: {},
		computed: {},
		methods: {
			backEmit() {
				this.$emit('back')
			}
		},
		beforeCreate() {

		},
		created() {

		},
		beforeMount() {

		},
		mounted() {

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
	.uni-nav-bar {
		text-align: center;
	    position: fixed;
	    width: 100%;
	    height: 61px;
	    z-index: 1;
	    background: #fff;
		.status-btn {
			height: var(--status-bar-height);
			width: 100%;
		}

		text {
			font-size: 20px;
			font-weight: bold;
		}

		.uni-nav-bar-bottom {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		image{
			width: 20px;
			height: 20px;
			position: absolute;
			left: 15px;
		}
	}
</style>
