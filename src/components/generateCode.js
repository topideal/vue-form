function findRemoteFunc(list, funcList,fixedFuncList) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].type == 'grid') {
            list[i].columns.forEach(item => {
                findRemoteFunc(item.list, funcList,fixedFuncList)
            })
        } else {
            /* if (list[i].type == 'blank') {
               if (list[i].model) {
                 blankList.push({
                   name: list[i].model,
                   label: list[i].name
                 })
               }
             } else if (list[i].type == 'imgupload') {
               if (list[i].options.tokenFunc) {
                 tokenFuncList.push({
                   func: list[i].options.tokenFunc,
                   label: list[i].name,
                   model: list[i].model
                 })
               }
             } */
            if (list[i].options.remote && list[i].options.remoteFunc && list[i].widgetType==3) {
                fixedFuncList.push({
                    func: list[i].options.remoteFunc
                })
            }
            if (list[i].options.remote && list[i].options.remoteFunc && list[i].widgetType==2) {
                funcList.push({
                    id: list[i].options.props.id,
                    func: list[i].options.remoteFunc,
                    label: list[i].name,
                    model: list[i].model
                })
            }

        }
    }
}

export default function (data) {

    const funcList = []

    const fixedFuncList = []



    findRemoteFunc(JSON.parse(data).list, funcList, fixedFuncList)

    let funcTemplate = ''

    let blankTemplate = ''

    for (let i = 0; i < funcList.length; i++) {
        funcTemplate += `
            ${funcList[i].func}(resolve) {
             request({
                method: 'get',
                url: '/formdata/getCommonDicData/${funcList[i].id}'

            }).then(function (response) {
                let returnData=response.data
                if (returnData.flag == 200) {
                      // 获取到远端数据后执行回调函数
                    resolve(returnData.data)
                }
                   // console.log(response);
            }).catch(function (err) {
             //       console.log(err);
            })
             
            },
    `
    }

      for(let i = 0; i < fixedFuncList.length; i++) {
        funcTemplate += `
                ${fixedFuncList[i].func} (resolve) {
                    request({
                            method: 'get',
                            url: '/formdata/getOrgList/0'
                        })
                            .then(function (response) {
                                let returnData=response.data
                                if (returnData.flag == 200) {
                                    // 获取到远端数据后执行回调函数
                                    resolve(returnData.data)
                                }
                            })
                            .catch(function (err) {
                                console.log(err);
                            })
                },
        `
      }

    /*  for (let i = 0; i < blankList.length; i++) {

        blankTemplate += `
            <template slot="${blankList[i].name}" slot-scope="scope">
              <!-- ${blankList[i].label} -->
              <!-- 通过 v-model="scope.model.${blankList[i].name}" 绑定数据 -->
            </template>
        `
      }*/

    return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="lib/theme-chalk/index.css">
    <link rel="stylesheet" href="lib/form-marking/css/vue-treeselect.min.css">
    <link rel="stylesheet" href="lib/form-marking/css/FormMaking.css">
    
  </head>
  <body>
    <div id="app">
      <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">
        ${blankTemplate}
      </fm-generate-form>
      <!--<el-button type="primary" @click="handleSubmit">提交</el-button>-->
    </div>
    <script src="lib/form-marking/js/vue.js"></script>
    <script src="lib/form-marking/js/index.js"></script>
    <script src="lib/form-marking/js/vue-treeselect.min.js"></script>
    <script src="lib/form-marking/js/axios.min.js"></script>
    <script src="lib/form-marking/js/FormMaking.umd.js"></script>
    <script>
    var request = axios.create({
      baseURL: 'http://192.168.12.119:8090/api',
      timeout: 10000,
      headers: {'Content-Type':'application/json; charset=UTF-8'}
    });
      new Vue({
        el: '#app',
        data: {
          jsonData: ${data},
          editData: {},
          remoteFuncs: {
            ${funcTemplate}
          }
        },
        methods: {
         
         }
      })
    </script>
  </body>
  </html>`
}