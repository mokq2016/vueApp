/*
target:接口请求地址
current:当前项目部署地址
 */
//生产环境配置
/*export default {
    target:'http://dzswj.szgs.gov.cn',
    current:'http://app.dzswj.szgs.gov.cn',
    proAddr:'/MobileWeb/static/dist/index.html?cityid=440300',
    wxReq:'/api/thirdInterf/getWxConfig'
}*/
//测试环境配置
export default{
    target:'',
    current:'http://servyouwx.applinzi.com',
    proAddr:'/irs-shenz.git/www/index.html',
    wxReq:'/api/wxHtRz'
}
/*
测试环境地址：http://app.xiaochina.net
生产环境接口请求地址：http://dzswj.szgs.gov.cn
生产部署地址：http://app.dzswj.szgs.gov.cn
生产环境ionic项目路径:/MobileWeb/static/dist/index.html
本地环境配置  ''
测试环境部署地址：http://servyouwx.applinzi.com
测试环境ionic项目路径：/irs-shenz.git/www/index.html
 */
