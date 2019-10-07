<template>
    <div class="messageBox">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div>
            <div @touchstart="handleCancel">{{cancel}}</div>
            <div @touchstart="handledef" v-if="content=='定位失败'" >{{def}}</div>
            <div @touchstart="handleOk" v-else>{{ok}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'messageBox'
}
</script>

<style scoped>
    .messageBox{
        background: white;
        width: 200px;
        height: 120px;
        border: 1px #ccc solid;
        border-radius: 4px;
        box-shadow: 3x 3x 3x 3x #ccc;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -60px 0 0 -100px;
    }
    .messageBox h2{
        text-align: center;
        line-height: 40px;
        font-size: 18px
    }
    .messageBox p{
        text-align: center;
        line-height: 40px;
    }
    .messageBox >div{
        display: flex;
        position: absolute;
        bottom: 0;
        width: 100%;
        border-top: 1px #ccc solid;
    }
    .messageBox >div div{
        flex: 1;
        text-align: center;
        line-height: 30px;
        border-right: 1px #ccc solid;
    }
     .messageBox >div div:last-of-type{
         border: none
     }
</style>