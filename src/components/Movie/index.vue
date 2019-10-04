<template>
<div id="main">
    <maoyanhead title="Neko Movie" ></maoyanhead>
     <div id="content">
       <div class="movie_menu">
				<router-link to="/movie/city" tag="div" class="city_name">
					<span>{{this.$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link to="/movie/nowplaying" tag="div" class="hot_item ">正在热映</router-link>
					<router-link to="/movie/commingsoon"  tag="div" class="hot_item">即将上映</router-link>
				</div>
				<router-link to="/movie/search" tag="div" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
       <keep-alive>
          <router-view></router-view>
        </keep-alive>
    </div>
     <tabBar></tabBar>
    </div>
</template>

<script>
import header from '../Header'
import tabBar from '../TabBar'
import { MessageBox } from '../js'

export default {
     components:{
   'maoyanhead':header,
   tabBar
  },
  mounted(){
    //获取定位
    this.axios.get('/api/getLocation')
    .then(result=>{
      let msg = result.data.msg
      if(msg==='ok'){
        let nm = result.data.data.nm
        let id = result.data.data.id||1
        console.log
        if(this.$store.state.city.id==id){return}
        setTimeout(()=>{
          MessageBox({
            title: '定位',
            content:result.data.data.nm||'定位失败',
            cancel:'取消',
            def:'默认',
            ok:'切换',
            handleCancel(){
            },
            handledef(){
              window.localStorage.setItem('nownm','北京')
              window.localStorage.setItem('nowid',1)
              window.location.reload()
            },
            handleOk(){
              window.localStorage.setItem('nownm',nm)
              window.localStorage.setItem('nowid',id)
              window.location.reload()
            }
          });
        },3000)
      
      }
 
    })
    
  }
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.router-link-exact-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.router-link-exact-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.router-link-exact-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}.router-link-active
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>