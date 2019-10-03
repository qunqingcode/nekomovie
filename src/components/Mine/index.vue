<template>
<div id="main" >
    <maoyanhead title="My Neko"></maoyanhead>
     <div id="content">
     <login></login>
    </div>
    <tabBar></tabBar>
    </div>
</template>

<script>
import header from '../Header'
import tabBar from '../TabBar'
import login  from '../subcomponents/login'
export default {
    name:'mine',
     components:{
   'maoyanhead':header,
   tabBar,
   login
  }
}
</script>

<style scoped>
    
</style>