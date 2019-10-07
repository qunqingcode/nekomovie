import Vue from 'vue'
import messageBox from '../js/messagebox'

export let MessageBox=(function(){
    let defaults={//默认值
        title:'',
        content:'',
        cancel:'',
        def:'',
        ok:'',
        handleCancel:null,
        handledef:null,
        handleOk:null
    }
    return function(opts){//配置参数
            for(let attr in defaults){
                defaults[attr]=opts[attr];
            }
            let Mycomponent =Vue.extend(messageBox);

           let vm=new Mycomponent({
               el:document.createElement('div'),
               data:{
                   title:defaults.title,
                   content:defaults.content,
                   cancel:defaults.cancel,
                   def:defaults.def,
                   ok:defaults.ok
               },
               methods:{
                   handleCancel(){
                       defaults.handleCancel && defaults.handleCancel.call(this)
                       document.body.removeChild(vm.$el)
                   },
                   handledef(){
                    defaults.handledef && defaults.handledef.call(this)
                    document.body.removeChild(vm.$el)
                },
                   handleOk(){
                       defaults.handleOk && defaults.handleOk.call(this)
                       document.body.removeChild(vm.$el)
                   }
               }
           }) 
           document.body.appendChild(vm.$el)
    } 
})()