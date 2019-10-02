<template>
<div id="main" >
    <maoyanhead title="My Neko"></maoyanhead>
    <div>
        hello mine
    </div>
     <div id="content">
    <tabBar></tabBar>
    </div>
    </div>
</template>

<script>
import header from '../Header'
import tabBar from '../TabBar'
export default {
    name:'mine',
     components:{
   'maoyanhead':header,
   tabBar
  }
}
</script>

<style scoped>
    
</style>