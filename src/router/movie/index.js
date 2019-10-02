export default {
    path:'/movie',
    component:()=>import('@/components/Movie'),
    children:[
        {
            path:'/',
            redirect:'nowplaying'
        },
        {
            path:'city',
            component:()=>import('@/components/subcomponents/city')
        },
        {
            path:'nowplaying',
            component:()=>import('@/components/subcomponents/nowPlaying')
        },
        {
            path:'commingsoon',
            component:()=>import('@/components/subcomponents/commingSoon')
        },
        {
            path:'search',
            component:()=>import('@/components/subcomponents/search')
        },
       
    ]
}