<template>
    <div class="city_body">
				<div class="city_list">
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="item in hotListover" :key="item.nm">{{item.nm}}</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="item in cityListover" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="itemList in item.list" :key="itemList.id" >{{itemList.nm}}</li>
							</ul>
						</div>	
					</div>
				</div>
				<div class="city_index">
					<ul>
					<li v-for="(item,index) in cityListover" :key="item.index"
					@click="handleToIndex(index)"
					>{{item.index}}</li>		
					</ul>
				</div>
				</div>
</template>
<script>
export default {
    data() {
		return {
			cityListover:[],
			hotListover:[]
		}
	},
	mounted(){
		this.axios.get('/api/cityList').then(result=>{
			let msg = result.data.msg;
			if(msg=='ok'){
				let citys=result.data.data.cities;
				//改造数据为[{index:'A',list:[{nm:'xxx',id:123}]}]的格式
				let {cityList,hotList}=this.formatCitylist(citys)
				this.cityListover=cityList
				this.hotListover=hotList
			}
		})
	},
	methods: {
		formatCitylist(citys){
			var cityList=[]
			var hotList=[]
			for (let i = 0; i < citys.length; i++) {
				if (citys[i].isHot===1) {
					hotList.push(citys[i])
				}
				
			}
			citys.forEach(item => {
				let firstLetter=item.py.substr(0,1).toUpperCase()
				if(toCom(firstLetter)){//新添加索引
					cityList.push({index:firstLetter,list:[{
						nm:item.nm,
						id:item.id
						}]})
				}else{//累加到已有索引中
					for(let i=0;i<cityList.length;i++){
						if (cityList[i].index===firstLetter) {
							cityList[i].list.push({nm:item.nm,id:item.id});
						}
					}	
				cityList.sort((n1,n2)=>{//给咱格式化出来的数据进行排序
					if (n1.index<n2.index) {
						return -1
					} else{
						return 1
					}
				})
				}
			});
			function toCom(firstLetter){
				for (let index = 0; index < cityList.length; index++) {
					if (cityList[index].index===firstLetter) {
						return false
					}
				}
				return true
			}
			return {
				cityList,
				hotList
			}
		},
		handleToIndex(index){
			let h2=this.$refs.city_sort.getElementsByTagName('h2');
			this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
		}
	},
}
</script>

<style scoped>
    #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>