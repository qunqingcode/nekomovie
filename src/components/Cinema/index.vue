<template>
<div id="main">
    <maoyanhead title="Neko Cinema"></maoyanhead>
    <div>
        hello cinema
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
     components:{
   'maoyanhead':header,
   tabBar
  }
}
</script>

<style scoped>
    
</style>