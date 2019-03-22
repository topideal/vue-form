<template>
    <el-form-item :label="widget.options.showLabel?widget.name:''" :prop="widget.model"
                  class="widget-view "
                  :class="{'is_req': widget.options.required}"
    >
        <template v-if="widget.type == 'separation'">
            <div :style="{paddingTop:widget.options.padding.top+'px',paddingBottom:widget.options.padding.bottom+'px'}">
                <div :style="{border:'0px',height:widget.options.size.height+'px' ,width:widget.options.size.width+'%',backgroundColor:widget.options.fontcolor,margin:'0 auto'}"
                     v-if="widget.options.fontalign== 'center'"/>
                <div :style="{border:'0px',height:widget.options.size.height+'px' ,width:widget.options.size.width+'%',backgroundColor:widget.options.fontcolor,float:widget.options.fontalign}"
                     v-if="widget.options.fontalign!= 'center'"/>
            </div>
        </template>
        <template v-if="widget.type == 'label'">
            <div>
                <div :style="{paddingTop:widget.options.padding.top+'px',paddingBottom:widget.options.padding.bottom+'px',color:widget.options.fontcolor,textAlign:widget.options.fontalign,fontSize:widget.options.fontsize+'px',lineHeight:1}">
                    {{widget.name}}
                </div>
            </div>
        </template>

        <template v-if="widget.type == 'button'">
            <div :style="{paddingTop:widget.options.padding.top+'px',paddingBottom:widget.options.padding.bottom+'px',color:widget.options.fontcolor,textAlign:widget.options.fontalign,fontSize:widget.options.fontsize+'px',lineHeight:1}">

                <el-button>{{widget.name}}</el-button>
            </div>
        </template>
        <template v-if="widget.type == 'link'">
            <div :style="{paddingTop:widget.options.padding.top+'px',paddingBottom:widget.options.padding.bottom+'px',color:widget.options.fontcolor,textAlign:widget.options.fontalign,fontSize:widget.options.fontsize+'px',lineHeight:1}">
                <el-button type="text" :click="widget.options.js">{{widget.name}}</el-button>
            </div>
        </template>
        <template v-if="widget.type == 'js'">
            <div v-html="widget.options.js"
                 :style="{paddingTop:widget.options.padding.top+'px',paddingBottom:widget.options.padding.bottom+'px',color:widget.options.fontcolor,textAlign:widget.options.fontalign,fontSize:widget.options.fontsize+'px',lineHeight:1}">
                {{widget.options.js}}
            </div>
        </template>

        <template v-if="widget.type == 'saveBtn'">
            <div align="center">
                <el-button type="primary" @click="widget.options.actionName" v-if="widget.options.action=='click'">保 存</el-button>
            </div>
        </template>

        <template v-if="widget.type == 'submitBtn'">
            <div align="center">
                <el-button type="primary" @click="widget.options.actionName" v-if="widget.options.action=='click'">提 交</el-button>
            </div>
        </template>
        <template v-if="widget.type == 'closeBtn'">
            <div align="center">
                <el-button type="primary" id="closeBtn" @click="handleCloseBtn">关 闭</el-button>
            </div>
        </template>
        <template v-if="widget.type == 'backBtn'">
            <div align="center">
                <el-button type="primary" @click="handleBackBtn">返 回</el-button>
            </div>
        </template>
        <template v-if="widget.type == 'passBtn'">
            <div>
                <el-button type="success" @click="handlePassBtn">同 意</el-button>
            </div>
        </template>
        <template v-if="widget.type == 'rejectBtn'">
            <div>
                <el-button type="danger" @click="handleRejectBtn">退 回</el-button>
            </div>
        </template>


        <template v-if="widget.type == 'org'">
            <div>
                <treeselect v-model="dataModel"
                            :disabled="widget.options.disabled"
                            :multiple="widget.options.multiple"
                            :clearable="widget.options.clearable"
                            :options="orgOptions"
                            :load-options="handleOrgRemoteFunc"
                            :value_consists_of="widget.options.valueConsistsOf"
                            :disable-branch-nodes="true"
                            :show-count="true"
                            :placeholder="widget.options.placeholder"
                            :default_expand_level="1">
                    <label slot="option-label"
                           slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }">
                        {{ node.label }} <span v-if="shouldShowCount">({{ count }})</span>
                    </label>
                </treeselect>
            </div>
        </template>
        <template v-if="widget.type == 'user'">
            <div>
                <treeselect :id="widget.model" :ref="widget.model" v-model="dataModel"
                            :disabled="widget.options.disabled"
                            :multiple="widget.options.multiple"
                            :clearable="widget.options.clearable"
                            :options="orgUserOptions"
                            :load-options="handleUserRemoteFunc"
                            :value_consists_of="widget.options.valueConsistsOf"
                            :disable-branch-nodes="true"
                            :show-count="true"
                            :placeholder="widget.options.placeholder"
                            :default_expand_level="1">
                    <label slot="option-label"
                           slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }">
                        {{ node.label }} <span v-if="shouldShowCount">({{ count }})</span>
                    </label>
                </treeselect>
            </div>
        </template>
        <template v-if="widget.type == 'eltable'">
            <div :style="{'width': widget.options.width}">
                <div align="right" style="width: 100%;padding-bottom: 10px;">
                    <el-button type="primary" @click="$refs.editable.insert({})">新增</el-button>
                    <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除选中</el-button>
                    <el-button type="danger" @click="$refs.editable.clear()">清空所有</el-button>
                    <el-button type="primary" @click="getAllTableData">保存</el-button>
                </div>
                <el-editable ref="editable" :data.sync="tableList">
                    <el-editable-column type="selection" width="55"></el-editable-column>
                    <el-editable-column type="index" width="55"></el-editable-column>
                    <el-editable-column v-for="(item, index) in widget.options.options" :key="index"
                                        :prop="item.value" :label="item.label"
                                        :editRender="{name: 'ElInput'}"></el-editable-column>
                    <el-editable-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="removeEvent(scope.row, scope.$index)">删除
                            </el-button>
                        </template>
                    </el-editable-column>
                </el-editable>


            </div>
        </template>
        <template v-if="widget.type == 'input'">
            <div>
            <el-input
                    v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
                    :type="widget.options.dataType"
                    :id="widget.model"
                    :ref="widget.model"
                    v-model.number="dataModel"
                    :placeholder="widget.options.placeholder"
                    :style="{width: widget.options.width}"
                    :readonly="widget.options.readonly"
            ></el-input>
            <el-input
                    v-else
                    :type="widget.options.dataType"
                    :id="widget.model"
                    :ref="widget.model"
                    v-model="dataModel"
                    :placeholder="widget.options.placeholder"
                    :style="{width: widget.options.width}"
                    :readonly="widget.options.readonly"
            ></el-input>
            </div>

        </template>

        <template v-if="widget.type == 'textarea'">

            <el-input type="textarea" :autosize="{minRows:2,maxRows:30}"
                      v-model="dataModel"
                      :id="widget.model"
                      :ref="widget.model"
                      :placeholder="widget.options.placeholder"
                      :style="{width: widget.options.width}"
                      :readonly="widget.options.readonly"
            ></el-input>
        </template>
        <template v-if="widget.type == 'tinymce'">
            <div>
                <tinymce-editor :id="widget.model" :ref="widget.model"  v-model="dataModel" :disabled="widget.options.disabled"></tinymce-editor>
            </div>

        </template>
        <template v-if="widget.type == 'number'">
            <el-input-number
                    :id="widget.model"
                    :ref="widget.model"
                    v-model="dataModel"
                    :style="{width: widget.options.width}"
                    :step="widget.options.step"
                    :readonly="widget.options.readonly"
                    controls-position="right"
            ></el-input-number>
        </template>

        <template v-if="widget.type == 'radio'">
            <el-radio-group v-model="dataModel"
                            :id="widget.model"
                            :ref="widget.model"
                            :style="{width: widget.options.width}"
                            :disabled="widget.options.disabled"
            >
                <el-radio
                        :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
                        :label="item.value"
                        v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
                        :key="index"
                >
                    <template v-if="widget.options.remote">{{item.label}}</template>
                    <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
                </el-radio>
            </el-radio-group>
        </template>

        <template v-if="widget.type == 'checkbox'">
            <el-checkbox-group v-model="dataModel"
                               :id="widget.model"
                               :ref="widget.model"
                               :style="{width: widget.options.width}"
                               :disabled="widget.options.disabled"
            >
                <el-checkbox

                        :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
                        :label="item.value"
                        v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
                        :key="index"
                >
                    <template v-if="widget.options.remote">{{item.label}}</template>
                    <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
                </el-checkbox>
            </el-checkbox-group>
        </template>

        <template v-if="widget.type == 'time'">
            <el-time-picker
                    v-model="dataModel"
                    :id="widget.model"
                    :ref="widget.model"
                    :is-range="widget.options.isRange"
                    :placeholder="widget.options.placeholder"
                    :start-placeholder="widget.options.startPlaceholder"
                    :end-placeholder="widget.options.endPlaceholder"
                    :readonly="widget.options.readonly"
                    :disabled="widget.options.disabled"
                    :editable="widget.options.editable"
                    :clearable="widget.options.clearable"
                    :arrowControl="widget.options.arrowControl"
                    :value-format="widget.options.format"
                    :style="{width: widget.options.width}"
            >
            </el-time-picker>
        </template>

        <template v-if="widget.type=='date'">
            <el-date-picker
                    v-model="dataModel"
                    :id="widget.model"
                    :ref="widget.model"
                    :type="widget.options.type"
                    :placeholder="widget.options.placeholder"
                    :start-placeholder="widget.options.startPlaceholder"
                    :end-placeholder="widget.options.endPlaceholder"
                    :readonly="widget.options.readonly"
                    :disabled="widget.options.disabled"
                    :editable="widget.options.editable"
                    :clearable="widget.options.clearable"
                    :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
                    :format="widget.options.format"
                    :style="{width: widget.options.width}"
            >
            </el-date-picker>
        </template>

        <template v-if="widget.type =='rate'">
            <el-rate v-model="dataModel"
                     :id="widget.model"
                     :ref="widget.model"
                     :max="widget.options.max"
                     :disabled="widget.options.disabled"
                     :allow-half="widget.options.allowHalf"
            ></el-rate>
        </template>

        <template v-if="widget.type == 'color'">
            <el-color-picker
                    v-model="dataModel"
                    :id="widget.model"
                    :ref="widget.model"
                    :disabled="widget.options.disabled"
                    :show-alpha="widget.options.showAlpha"
            ></el-color-picker>
        </template>

        <template v-if="widget.type == 'select'">
            <el-select
                    v-model="dataModel"
                    :id="widget.model"
                    :ref="widget.model"
                    :disabled="widget.options.disabled"
                    :multiple="widget.options.multiple"
                    :clearable="widget.options.clearable"
                    :placeholder="widget.options.placeholder"
                    :style="{width: widget.options.width}"
            >
                <el-option
                        v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
                        :key="item.value" :value="item.value"
                        :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
            </el-select>
        </template>

        <template v-if="widget.type=='switch'">
            <el-switch
                    v-model="dataModel"
                    :id="widget.model"
                    :ref="widget.model"
                    :disabled="widget.options.disabled"
            >
            </el-switch>
        </template>

        <template v-if="widget.type=='slider'">
            <el-slider
                    v-model="dataModel"
                    :id="widget.model"
                    :ref="widget.model"
                    :min="widget.options.min"
                    :max="widget.options.max"
                    :disabled="widget.options.disabled"
                    :step="widget.options.step"
                    :show-input="widget.options.showInput"
                    :range="widget.options.range"
                    :style="{width: widget.options.width}"
            ></el-slider>
        </template>


        <template v-if="widget.type=='imgupload'">
            <fm-upload
                    v-model="dataModel"
                    :id="widget.model"
                    :ref="widget.model"
                    :disabled="widget.options.disabled"
                    :style="{'width': widget.options.width}"
                    :width="widget.options.size.width"
                    :height="widget.options.size.height"
            >
            </fm-upload>
        </template>

        <template v-if="widget.type == 'dictionary'">
            <div>
                <el-input
                        v-model="dataModel"
                        :id="widget.model"
                        :ref="widget.model"
                        :placeholder="widget.options.placeholder"
                        :style="{width: widget.options.width}"
                        :readonly="widget.options.readonly"
                >
                    <el-button slot="append" icon="el-icon-more"
                               @click="handleOpenDicDialog(widget.options.props.id,widget.model)"></el-button>
                </el-input>
            </div>
            <dictionary-diaglog
                    :visible="dicVisible"
                    @on-close="dicVisible = false"
                    ref="dicPreview"
                    width="80%"
                    append-to-body
            >

            </dictionary-diaglog>
        </template>


    </el-form-item>
</template>

<script>
    import FmUpload from './UploadFiles'
    import request from '../util/request.js'
    // import the component
    import Treeselect from '@riophae/vue-treeselect'
    import TinymceEditor from './TinymceEditor'
    import {MessageBox} from 'element-ui'
    import ElEditable from './Editable.vue'
    import ElEditableColumn from './EditableColumn.vue'
    import DictionaryDiaglog from './DictionaryDialog'
    // import Bus from '../util/bus.js'

    // Vue.component(Editable.name, Editable)
    //   Vue.component(EditableColumn.name, EditableColumn)
    export default {
        props: ['widget', 'models', 'rules', 'remote', 'widgetFormConfig'],
        components: {
            FmUpload,
            Treeselect,
            TinymceEditor,
            ElEditable,
            ElEditableColumn,
            DictionaryDiaglog

        },
        data() {
            return {
                innerVisible: true,
                dicVisible: false,
                tableList: [],
                dataModel: this.models[this.widget.model],
                orgOptions: null,
                orgUserOptions: null,
                content: '' // 富文本编辑器双向绑定的内容
            }
        },
        inject: ['getData'],
        created() {
            if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
                this.remote[this.widget.options.remoteFunc]((data) => {
                    if (this.widget.widgetType == '2') {
                        this.widget.options.remoteOptions = data.map(item => {
                            return {
                                id: item[this.widget.options.props.id],
                                value: item[this.widget.options.props.value],
                                label: item[this.widget.options.props.label]
                            }
                        })
                    } else {
                        this.widget.options.remoteOptions = data
                    }
                })
            }

            /*if (this.widget.type === 'imgupload') {
                this.remote[this.widget.options.tokenFunc]((data) => {
                    this.widget.options.token = data
                })
            }*/
        },
        mounted: function () {
            let vm = this
            // 用$on事件来接收参数
            vm.$root.Bus.$on('listen-to-child-event', (data) => {
                // alert(data.key)
                vm.models[data.key] = data.data
                vm.$emit('update:models', {
                    ...vm.models,
                    [data.key]: data.data
                })
            })
        },

        methods: {

            async handleOrgRemoteFunc({action}) {
                let _this = this
                await request({
                    method: 'get',
                    url: '/formdata/getOrgList/0'
                })
                    .then(function (response) {

                        if (response.flag == 200) {
                            // 获取到远端数据后执行回调函数

                            _this.orgOptions = response.data
                        }

                        //  console.log(response);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            async handleUserRemoteFunc({action}) {
                let _this = this
                await request({
                    method: 'get',
                    url: '/formdata/getOrgUserList/0'
                })
                    .then(function (response) {

                        if (response.flag == 200) {
                            // 获取到远端数据后执行回调函数
                            _this.orgUserOptions = response.data
                        }

                        //  console.log(response);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            },
            handleOpenDicDialog(id, key) {
                // alert(key)
                this.$refs.dicPreview.getTreeData(id, key)
                this.dicVisible = true

            },
            getAllTableData() {
                let tableRecords = this.$refs.editable.getRecords()
                this.models["tableDataList"] = tableRecords
                //  this.models[this.models.length]=tableRecords
                //  console.log(this.models)
            },
            removeEvent(row, index) {
                MessageBox.confirm('确定删除该数据?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.editable.removeRow(index)
                }).catch(e => e)
            },
            /*  editors(content) { // editor组件传过来的值赋给content
                  console.log(content)
                  this.content = content
              },
              onEditorReady(ins, ina) { // 上传失败的函数
                  console.log('ins')
                  console.log(ins)
                  console.log(ina)
              },
              onEditorUploadComplete(json) { // 处理上传图片后返回数据，添加img标签到编辑框内
                  console.log('json')
                  console.log(json)
                  console.log(json[0].data.filePath)
                  this.content = this.content + '<img src=' + json[0].data.filePath + '>'
              },*/

            handleSaveBtn() {
                //   alert('保存数据...')
                let that = this

                that.getData().then(data => {
                    // alert(JSON.stringify(data))
                    //    alert('提交数据...'+that.widgetFormConfig.billId)
                    data.billId = that.widgetFormConfig.billId
                    //   alert(JSON.stringify(data))
                    console.log("传递参数===>", data)
                    request({
                        method: 'post',
                        /* headers: {'Content-Type':'application/json; charset=UTF-8'},*/
                        url: '/formdata/saveFormDesignData',
                        data: JSON.stringify(data)

                    })
                        .then(function (response) {
                            alert('保存成功!')

                            //   console.log(response);
                        })
                        .catch(function (err) {
                            alert('保存失败!')
                            console.log(err);
                        })
                    // 数据校验成功
                    // data 为获取的表单数据
                }).catch(e => {
                    // 数据校验失败
                })
            },
            handleSubmitBtn() {
                this.handleSaveBtn()
            }, handleCloseBtn() {
              //  console.log("root==>",)
              //  console.log("$parent==>",this.$parent.$parent.$parent)
                this.$root.$children[0].$children[0].$children[0].$refs.widgetPreview.close()
            }, handleBackBtn() {
                history.go(-1)
            },handlePassBtn() {
                alert('努力开发中,敬请期待...')
            }, handleRejectBtn() {
                alert('努力开发中,敬请期待...')
            }
        },
        watch: {
            dataModel: {
                deep: true,
                handler(val) {
                    this.models[this.widget.model] = val
                    this.$emit('update:models', {
                        ...this.models,
                        [this.widget.model]: val
                    })
                }
            },
            models: {
                deep: true,
                handler(val) {
                    //  console.log('--------')
                    this.dataModel = val[this.widget.model]
                }
            }
        }
    }
</script>
