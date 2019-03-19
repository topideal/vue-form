<script type="text/javascript">
    // 定义一些公共的属性和方法
    const httpUrl = 'http://192.168.101.137:8090/api'
    //const httpUrl = 'http://127.0.0.1:8090/api'
    function commonFun() {
        console.log("公共方法")
    }
    // 暴露出这些属性和方法
    export default {
        httpUrl,
        commonFun
    }
</script>