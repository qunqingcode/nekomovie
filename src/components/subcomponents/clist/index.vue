<template>
    <div class="cinema_body">
		<Loading v-if="isLoading" />
		<Scroller v-else>
				<ul>
					<li v-for="item in cinemaList" :key="item.id">
						<div>
							<span>{{item.nm}})</span>
							<span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
						</div>
						<div class="address">
							<span>{{item.addr}}</span>
							<span>{{item.distance}}</span>
						</div>
						<div class="card">
                			<div v-for="(num,key) in item.tag" :key="key" v-show="num===1"
							:class="key | classCard">{{key | formatCard }}</div>
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
		cinemaList:[],
		isLoading:true,
		preCityId:-1
		}
	},
	name:'clist',
	activated(){
		let cityid=this.$store.state.city.id
		if (this.preCityId===cityid) {return;}
		this.isLoading=true
		this.axios.get('/api/cinemaList?cityId='+cityid)
		.then(result=>{
			let msg =result.data.msg
			if(msg==='ok'){
				this.isLoading=false
				this.cinemaList=result.data.data.cinemas
			}
		})
	},
	filters:{
		formatCard(key){
			let card = [
				{key:'allowRefund',value:'可改签'},
				{key:'endorse',value:'可退'},
				{key:'snack',value:'小吃'},
				{key:'sell',value:'折扣卡'}
			];
			for (let i = 0; i < card.length; i++) {//匹配传入的key来返回渲染上去的字
				if (card[i].key===key) {
					return card[i].value
				}
			}
				return ''
		},
		classCard(key){
			let card = [
				{key:'allowRefund',value:'bl'},
				{key:'endorse',value:'bl'},
				{key:'snack',value:'or'},
				{key:'sell',value:'or'}
			];
			for (let i = 0; i < card.length; i++) {//匹配传入的key来返回渲染上去的字
				if (card[i].key===key) {
					return card[i].value
				}
			}
				return ''
		}
	}
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right;  }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>