<template>
<div class="movie_body" ref="movie_body">
	<Loading v-if="isLoading"/>
			<Scroller v-else :handleToScroll="handleToScroll" :handleToEnd="handleToEnd">
				<ul>
					<li class="pulldown">{{pullDownMsg}}</li>
					<li v-for="item in movieList" :key="item.id">
						<div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
						<div class="info_list">
							<h2  @tap="handleToDetail(item.id)">{{item.nm}} <img v-show="item.version.includes('v3d imax')" src="@/assets/maxs.png"> </h2>
							<p>观众评分<span class="grade">{{item.sc}}</span></p>
							<p>主演: {{item.star}}</p>
							<p>{{item.showInfo}}</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li>
				</ul>
				</Scroller>
			</div>
</template>
<script>

export default {
	data() {
		return {
			movieList:[],
			pullDownMsg:'',
			isLoading:true,
			preCityId:-1//因为初始值和state的初始id不一样所以一开始一定会执行一次ajax请求然后去改变这个值变为state里的id值---只有发起了这个请求的时候才会改变这个preCityId变为state里的id值
			//当我们改变了state里的id的时候这个preCityId存的还是上一次请求的时候的state的id的值，这时候产生这两个值不一样的现象
			//当这两个值不一样了,我们就发起一次Ajax请求 这样就达到了动态渲染列表与城市id联动的效果 而不是每次切换都会发起一次请求 
			//---而是只有state里的id和preCityId不一样的时候才会发起Ajax请求
		}
	},
	methods: {
		handleToDetail(movieid){
			this.$router.push(`/movie/detail/1/${movieid}`)
		},
		handleToScroll(pos){
				if(pos.y>30){
						this.pullDownMsg='正在更新中'
					}
		},
		handleToEnd(pos){
			
					if(pos.y>30){
					this.axios.get('/api/movieOnInfoList?cityId='+this.$store.state.city.id)
		.then(result=>{
			let msg = result.data.msg
			if (msg==='ok') {
				this.pullDownMsg='更新成功'
				setTimeout(()=>{
		this.movieList=result.data.data.movieList
		this.pullDownMsg=''
				},1000)
			}
		})
					
				}
		}

	},
	activated(){//由于引用了keepalive来缓存组件所以mounted周期在切换组件的时候并不会触发
	//所以我们使用vue提供的和keepalive相关的生命周期activated 当组件激活的时候就会触发这个周期
		let cityid=this.$store.state.city.id
		if(this.preCityId===cityid){return;}//pre存的是之前的城市id,如果不等才执行下面的ajax请求
		this.isLoading=true
		this.axios.get('/api/movieOnInfoList?cityId='+cityid)
		.then(result=>{
			let msg = result.data.msg
			if (msg==='ok') {
				this.movieList=result.data.data.movieList
				this.isLoading=false
				this.preCityId=cityid
		// 		this.$nextTick(()=>{
		// 		let scroll=new BScroll(this.$refs.movie_body,{
		// 			tap:true,
		// 			probeType:1
		// 		});
		// 		scroll.on('scroll',(pos)=>{
		// 			if(pos.y>30){
		// 				this.pullDownMsg='正在更新中'
		// 			}
					
		// 		})
		// 		scroll.on('touchEnd',(pos)=>{
		// 			if(pos.y>30){
		// 			this.axios.get('/api/movieOnInfoList?cityId=11')
		// .then(result=>{
		// 	let msg = result.data.msg
		// 	if (msg==='ok') {
		// 		this.pullDownMsg='更新成功'
		// 		setTimeout(()=>{
		// this.movieList=result.data.data.movieList
		// this.pullDownMsg=''
		// 		},1000)
		// 	}
		// })
					
		// 		}
		// 		})
		// 		});
				
			}
		})
	}
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall,.movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pulldown{margin: 0;padding: 0;border: none}
</style>