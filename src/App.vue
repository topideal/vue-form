<template>
    <div id="app">
        <!--<div class="fm-header">
          <img class="fm-logo" src="./assets/logo.png">
          <div class="fm-title">表单设计器</div>

          <div style="color: #fff; font-size: 13px; position: absolute; top: 24px; left: 200px;">
            QQ交流群：902048874
          </div>

          <div class="fm-link">
            <a href="https://github.com/GavinZhuLei/vue-form-making">GitHub</a>
            <a href="https://gitee.com/gavinzhulei/vue-form-making">码云</a>
            <a href="http://www.xiaoyaoji.cn" target="_blank">小幺鸡接口文档</a>
          </div>
        </div>-->
        <div class="fm-container">
            <router-view/>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app'
    }
</script>

<style lang="scss">
    .fm-container {
       /* height: calc(100% - 50px);*/
        height:100%;
    }

    *, :after, :before {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
    }

    #app {
        font-family: '宋体', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        min-height: 100%;
        height: 100%;
    }
</style>
