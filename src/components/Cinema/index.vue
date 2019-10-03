<template>
<div id="main">
    <maoyanhead title="Neko Cinema"></maoyanhead>
     <div id="content">
       <div class="cinema_menu">
				<div class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</div>
			</div>
     <clist></clist>
    </div>
      <tabBar></tabBar>
    </div>
</template>

<script>
import header from '../Header'
import tabBar from '../TabBar'
import clist  from '../subcomponents/clist'
export default {
     components:{
   'maoyanhead':header,
   tabBar,
   clist
  }
}
</script>

<style scoped>
    #content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
</style>