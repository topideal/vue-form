<template>
    <el-container>
        <el-aside :width="'120px'">

            <div class="components-list">
                <div class="widget-cate">基础控件</div>
                <draggable element="ul" :list="basicComponents"
                           :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                           @end="handleMoveEnd"
                           @start="handleMoveStart"
                           :move="handleMove"
                >

                    <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
                        <a>
                            <icon class="icon" :name="item.icon"></icon>
                            <span>{{item.name}}</span>
                        </a>
                    </li>
                </draggable>

                <!--<div class="widget-cate">高级控件</div>
                <draggable element="ul" :list="advanceComponents"
                           :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                           @end="handleMoveEnd"
                           @start="handleMoveStart"
                           :move="handleMove"
                >

                    <li class="form-edit-widget-label" v-for="(item, index) in advanceComponents" :key="index">
                        <a>
                            <icon class="icon" :name="item.icon"></icon>
                            <span>{{item.name}}</span>
                        </a>
                    </li>
                </draggable>-->

                <div class="widget-cate">布局控件</div>
                <draggable element="ul" :list="layoutComponents"
                           :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                           @end="handleMoveEnd"
                           @start="handleMoveStart"
                           :move="handleMove"
                >

                    <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
                        <a>
                            <icon class="icon" :name="item.icon"></icon>
                            <span>{{item.name}}</span>
                        </a>
                    </li>
                </draggable>

                <div class="widget-cate">自定义控件</div>
                <draggable element="ul" :list="layoutBySelfComponents"
                           :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                           @end="handleMoveEnd"
                           @start="handleMoveStart"
                           :move="handleMove"
                >

                    <li class="form-edit-widget-label" v-for="(item, index) in layoutBySelfComponents" :key="index">
                        <a>
                            <icon class="icon" :name="item.icon"></icon>
                            <span>{{item.name}}</span>
                        </a>
                    </li>
                </draggable>

            </div>

        </el-aside>
        <el-container class="center-container" direction="vertical">
            <el-header class="btn-bar" style="height: 45px;">

                <!--<el-select v-model="widgetForm.config.templateId" size="mini" @change="handleOpenTemplate" placeholder="选择需要打开的表单">
                    <el-option v-for="(item, index) in templateList" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select> &nbsp; &nbsp;
                <el-button type="text" size="medium" icon="el-icon-edit-outline" @click="handleNew">新建</el-button>-->
                <!-- <el-button type="text" size="medium" icon="el-icon-import" @click="handleOpenTemplate">打开表单</el-button>-->

               <!-- <el-button type="text" size="medium" icon="el-icon-import" @click="handleImportJson">导入样式</el-button>-->
                <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
                <!--<el-button type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成样式</el-button>-->
                <el-button type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">VUE源码</el-button>
                <el-button type="text" size="medium" icon="el-icon-tickets" @click="handleSave">保存模板</el-button>

            </el-header>
            <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
                <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
            </el-main>
        </el-container>

        <el-aside class="widget-config-container" :width="'180px'">
            <el-container>
                <el-header height="45px">
                    <div class="config-tab" :class="{active: configTab=='widget'}"
                         @click="handleConfigSelect('widget')">字段属性
                    </div>
                    <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">
                        表单属性
                    </div>
                </el-header>
                <el-main class="config-content">
                    <widget-config v-show="configTab=='widget'" :data="widgetFormSelect" :widgetFormConfig="widgetForm.config"></widget-config>
                    <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
                </el-main>
            </el-container>

        </el-aside>

        <cus-dialog
                :visible="previewVisible"
                @on-close="previewVisible = false"
                ref="widgetPreview"
                width="1000px"
                form
        >
            <generate-form v-if="previewVisible" :data="widgetForm" :remote="remoteFuncs" :value="widgetModels"
                           ref="generateForm" >

                <!--<template slot="blank" slot-scope="scope">
                    宽度：
                    <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
                    高度：
                    <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
                </template>-->
            </generate-form>
        </cus-dialog>

        <!--<cus-dialog
                :visible="jsonVisible"
                @on-close="jsonVisible = false"
                ref="jsonPreview"
                width="800px"
                form
        >
            <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>

            <template slot="action">
                <el-button id="copybtn" data-clipboard-target=".ace_text-input">双击复制</el-button>
            </template>
        </cus-dialog>-->

        <!--<cus-dialog
                :visible="codeVisible"
                @on-close="codeVisible = false"
                ref="codePreview"
                width="800px"
                form
                :action="false"
        >
            <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
        </cus-dialog>-->


        <!--<cus-dialog
                :visible="importJsonVisible"
                @on-close="importJsonVisible = false"
                ref="importJsonPreview"
                width="800px"
                form
        >
            <div id="importJsoneditor" style="height: 400px;width: 100%;">{{importJsonTemplate}}</div>

            <template slot="action">
                <el-button @click="importJson">导入样式</el-button>
            </template>
        </cus-dialog>-->

        <cus-dialog
                :visible="codeVisible"
                @on-close="codeVisible = false"
                ref="codePreview"
                width="800px"
                form
                :action="false"
        >
           <!-- <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>-->
            <vuep-form :data="htmlTemplate" ></vuep-form>
        </cus-dialog>

    </el-container>
</template>

<script>

    import Draggable from 'vuedraggable'
    import WidgetConfig from './WidgetConfig'
    import FormConfig from './FormConfig'
    import WidgetForm from './WidgetForm'
    import CusDialog from './CusDialog'
    import GenerateForm from './GenerateForm'
    import {advanceComponents, basicComponents, layoutBySelfComponents, layoutComponents} from './componentsConfig.js'
    import request from '../util/request.js'
    import generateCode from './generateCode.js'

    import VuepForm from './VuepForm'


    export default {
        name: 'fm-making-form',
        components: {
            Draggable,
            WidgetConfig,
            FormConfig,
            WidgetForm,
            CusDialog,
            GenerateForm,
            VuepForm
        },
        data() {
            return {
                basicComponents,
                layoutComponents,
                advanceComponents,
                layoutBySelfComponents,
                widgetForm: {
                    list: [],
                    config: {
                        fontFamily:'SimSun',
                        labelWidth: 100,
                        labelPosition: 'top',
                        billId:null,
                        templateId:null
                    }
                },
                configTab: 'form',
                widgetFormSelect: {},
                previewVisible: false,
                importJsonVisible: false,
                jsonVisible: false,
                codeVisible: false,
                remoteFuncs: {
                },
                widgetModels: {},
                blank: '',
                htmlTemplate: '',
                jsonTemplate: '',
                importJsonTemplate: '',
                templateList: []
            }
        },
        mounted() {
            this.handleOpenTemplate()
        },
        methods: {
            handleConfigSelect(value) {
                this.configTab = value
            },
            handleMoveEnd(evt) {
                console.log('end', evt)
            },
            handleMoveStart({oldIndex}) {
                console.log('start', oldIndex, this.layoutBySelfComponents)
            },
            handleMove() {
                return true
            },
            handlePreview() {
                this.previewVisible = true
            },
           /* handleTest() {
                this.$refs.generateForm.getData().then(data => {
                    this.$alert(data, '').catch(e => {
                    })
                    this.$refs.widgetPreview.end()
                }).catch(e => {
                    this.$refs.widgetPreview.end()
                })
            }, handleImportJson() {
                //  alert(JSON.stringify(this.widgetForm.widgetModels))
                this.importJsonVisible = true
                this.importJsonTemplate = this.widgetForm
                this.$nextTick(() => {
                    const editor = ace.edit('importJsoneditor')
                    editor.session.setMode("ace/mode/json")

                })
            }, importJson() {
                this.importJsonVisible = false
                this.$nextTick(() => {
                    const editor = ace.edit('importJsoneditor')
                    let tmpData = JSON.parse(editor.getValue())
                    if (tmpData != null && tmpData.list != null && tmpData.list.length > 0) {
                        this.widgetForm = tmpData
                        this.widgetFormSelect = (this.widgetForm.list)[0]
                    }
                })

            },
            handleGenerateJson() {
                this.jsonVisible = true
                this.jsonTemplate = this.widgetForm
                this.$nextTick(() => {

                    const editor = ace.edit('jsoneditor')
                    editor.session.setMode("ace/mode/json")

                   /!* const btnCopy = new Clipboard('#copybtn')*!/
                })
            },*/
            handleGenerateCode() {
                this.codeVisible = true
                this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
                /*this.$nextTick(() => {
                    const editor = ace.edit('codeeditor')
                    editor.session.setMode("ace/mode/html")
                })*/
            },
            handleSave() {
                let parms={}
                let config=this.widgetForm.config
                let workflowId=this.$route.query.workflowId
                let id=this.$route.query.id
                let nodeId=this.$route.query.nodeId
                parms.id=workflowId
                parms.templateId=id
                parms.nodeId=nodeId
                parms.formdesignJson = JSON.stringify(this.widgetForm)
                parms.formdesignHtml = generateCode(parms.formdesignJson)
               /* parms.formdesignJson = JSON.stringify({fromuser:'david'})
                parms.formdesignHtml = '<html><body>测试</body></html>'*/
              //  console.log("template===>",parms);
                if(workflowId) {
                    request({
                        method: 'post',
                       /* headers: {'Content-Type':'application/json; charset=UTF-8'},*/
                        url: '/formdesign/saveFormDesignTemplate' ,
                        data:JSON.stringify(parms)

                    })
                        .then(function (response) {
                            console.log(response);
                            alert('模板保存成功.')
                        })
                        .catch(function (err) {
                            console.log(err);
                            alert('模板保存失败.')
                        })
                }
            },handleOpenTemplate() {
                let that=this
                let workflowId=that.$route.query.workflowId
                let id=that.$route.query.id
                if (id) {
                    request({
                        method: 'get',
                        url: '/formdesign/getFormTemplate/' + id+"/"+workflowId
                    }).then(function (response) {
                        if (response.flag == 200) {
                            let data = response.data
                            that.$nextTick(() => {
                                let tmpData = JSON.parse(data.formdesignJson)
                                if (tmpData != null && tmpData.list != null && tmpData.list.length > 0) {
                                    that.widgetForm = tmpData
                                  //  console.log("打开模板==>", that.widgetForm)
                                    that.widgetFormSelect = (that.widgetForm.list)[0]
                                }
                            })
                        }
                    })
                        .catch(function (err) {
                            alert('模板打开存失败.')
                            console.log(err);
                        })
                }

            },handleNew() {
                location.href="/"
            }
        },
        watch: {
            widgetForm: {
                deep: true,
                handler: function (val) {
                    // alert(val)
                    console.log(this.$refs.widgetForm)
                }
            },
            widgetFormSelect: {
                handler: function (val) {
                    //  alert(JSON.stringify(val))

                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../styles/cover.scss';
    @import '../styles/index.scss';
    .widget-empty {
        background: url('../assets/form_empty.png') no-repeat;
        background-position: 50%;
    }

</style>
