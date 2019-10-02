<template>
 <div id="main">
    <maoyanhead></maoyanhead>
    <keep-alive>
      <!-- keep-alive 缓存组件提高性能 -->
    <router-view/>
    </keep-alive>
   
   <div id="content">
    <tabBar></tabBar>
    </div>
   </div>
</template>

<script>
import header from './components/Header'
import tabBar from './components/TabBar'
export default {
  name: 'App',
  components:{
   'maoyanhead':header,
   tabBar
  }
}
</script>

<style>

</style>
