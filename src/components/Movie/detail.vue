<template>
    <div id="detailContrainer" class="slide-enter-active">
		<maoyanhead title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i><h1>影片详情</h1>
        </maoyanhead>
		   <Loading v-if="isLoading" />
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
					<img :src="detailMovie.img | setWH('148.208')" >
					</div>
					<div class="detail_list_info">
						<h2>{{detailMovie.nm}}</h2>
						<p>{{detailMovie.enm}}</p>
						<p>{{detailMovie.sc}}</p>
						<p>{{detailMovie.cat}}</p>
						<p>{{detailMovie.src}}/{{detailMovie.dur}}</p>
						<p>{{detailMovie.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
					<p>{{detailMovie.dra}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
					<ul class="swiper-wrapper">
					<li v-for="(item,index) in detailMovie.photos" :key="index" class="swiper-slide">
						<div>
							<img :src="item | setWH('140.127')" alt="">
						</div>
						
					</li>
				</ul>
			</div>
			
		</div>
	</div>
</template>

<script>
import header from '../Header'
export default {
	name:'detail',
	data() {
		return {
			detailMovie:{},
			isLoading:true
		}
	},
    components:{
        'maoyanhead':header
    },
    methods: {
        handleToBack(){
            this.$router.back()
        }
    },
    props:['movieid'],
	mounted(){
		this.axios.get('/api/detailmovie?movieId='+this.movieid)
		.then(result=>{
			let msg = result.data.msg
			if (msg==='ok') {
				this.detailMovie=result.data.data.detailMovie;
				this.isLoading=false;//注意这里得先加载了那块else再触发下面才能让Swiper生效
				this.$nextTick(()=>{
					new Swiper(this.$refs.detail_player  , {
		slidesPerView : 'auto',
		freeMode : true,
		freeModeSticky: true
	});
				})
			}
		})
	}
}
</script>


<style scoped>
    #detailContrainer{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        z-index: 100;
        min-height: 100%;
        background: white;
    }
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: url('/static/public/images/movie_1.jpg') 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#detailContrainer.slide-enter-active{
    animation: 0.5s sliderMove;
    
}
@keyframes sliderMove {
        0%{transform: translateX(100%)};
        100%{transform: translateX(0)}
        }
    #content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>