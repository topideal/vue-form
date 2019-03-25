<template>
    <el-form-item class="widget-view " :label-width="(element.options.showLabel?(widgetConfig.labelWidth?widgetConfig.labelWidth:0):0) +'px'"
                  :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
                  @click.native="handleSelectWidget(index)"
    >
        <span slot="label" v-if="element.options.showLabel">{{element.name}}</span>
        <template v-if="element.type == 'separation'">

                <div :style="{paddingTop:element.options.padding.top+'px',paddingBottom:element.options.padding.bottom+'px'}">
                    <div :style="{border:'0px',height:element.options.size.height+'px' ,width:element.options.size.width+'%',backgroundColor:element.options.fontcolor,margin:'0 auto'}"
                         v-if="element.options.fontalign== 'center'"/>
                    <div :style="{border:'0px',height:element.options.size.height+'px' ,width:element.options.size.width+'%',backgroundColor:element.options.fontcolor,float:element.options.fontalign}"
                         v-if="element.options.fontalign!= 'center'"/>
                </div>
        </template>

        <template v-if="element.type=='label'">
            <div>
                <div :style="{paddingTop:element.options.padding.top+'px',paddingBottom:element.options.padding.bottom+'px',color:element.options.fontcolor,textAlign:element.options.fontalign,fontSize:element.options.fontsize+'px',lineHeight:1}">
                    {{element.name}}
                </div>
            </div>
        </template>
        <template v-if="element.type=='button'">
            <div :style="{paddingTop:element.options.padding.top+'px',paddingBottom:element.options.padding.bottom+'px',color:element.options.fontcolor,textAlign:element.options.fontalign,fontSize:element.options.fontsize+'px',lineHeight:1}">
                <el-button>{{element.name}}</el-button>
            </div>


        </template>
        <template v-if="element.type == 'link'">
            <div :style="{paddingTop:element.options.padding.top+'px',paddingBottom:element.options.padding.bottom+'px',color:element.options.fontcolor,textAlign:element.options.fontalign,fontSize:element.options.fontsize+'px',lineHeight:1}">
                <el-button type="text" @click="element.options.js">{{element.name}}</el-button>
            </div>
        </template>
        <template v-if="element.type == 'js'">
            <div :style="{paddingTop:element.options.padding.top+'px',paddingBottom:element.options.padding.bottom+'px',color:element.options.fontcolor,textAlign:element.options.fontalign,fontSize:element.options.fontsize+'px',lineHeight:1}">
                {{element.options.js}}
            </div>
        </template>


        <template v-if="element.type == 'saveBtn'">
            <div>
                <el-button type="primary" @click="handleSaveBtn">保 存</el-button>
            </div>
        </template>
        <template v-if="element.type == 'submitBtn'">
            <div>
                <el-button type="primary" @click="handleSubmitBtn">提 交</el-button>
            </div>
        </template>
        <template v-if="element.type == 'closeBtn'">
            <div>
                <el-button type="primary" @click="handleCloseBtn">关 闭</el-button>
            </div>
        </template>
        <template v-if="element.type == 'backBtn'">
            <div>
                <el-button type="primary" @click="handleBackBtn">返 回</el-button>
            </div>
        </template>
        <template v-if="element.type == 'passBtn'">
            <el-button type="success" @click="handlePassBtn">同 意</el-button>
        </template>
        <template v-if="element.type == 'rejectBtn'">
            <el-button type="danger" @click="handleRejectBtn">退 回</el-button>
        </template>

        <template v-if="element.type == 'org'">
            <div>
                <treeselect v-model="element.options.defaultValue"
                            :disabled="element.options.disabled"
                            :multiple="element.options.multiple"
                            :clearable="element.options.clearable"
                            :options="orgOptions"
                            :load-options="handleOrgRemoteFunc"
                            :value_consists_of="element.options.valueConsistsOf"
                            :disable-branch-nodes="true"
                            :show-count="true"
                            :placeholder="element.options.placeholder"
                            :default_expand_level="1">
                    <label slot="option-label"
                           slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }">
                        {{ node.label }} <span v-if="shouldShowCount">({{ count }})</span>
                    </label>
                </treeselect>
            </div>
        </template>
        <template v-if="element.type == 'user'">
            <div>
                <treeselect v-model="element.options.defaultValue"
                            :disabled="element.options.disabled"
                            :multiple="element.options.multiple"
                            :clearable="element.options.clearable"
                            :options="orgUserOptions"
                            :load-options="handleUserRemoteFunc"
                            :value_consists_of="element.options.valueConsistsOf"
                            :disable-branch-nodes="true"
                            :show-count="true"
                            :placeholder="element.options.placeholder"
                            :default_expand_level="1">
                    <label slot="option-label"
                           slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }">
                        {{ node.label }} <span v-if="shouldShowCount">({{ count }})</span>
                    </label>
                </treeselect>
            </div>
        </template>
        <template v-if="element.type == 'eltable'">
            <div :style="{'width': element.options.width+'%'}">
                <div align="right" style="width: 100%;padding-bottom: 10px;">
                    <el-button type="primary" @click="$refs.editable.insert({})">新增</el-button>
                    <el-button type="danger" @click="$refs.editable.removeSelecteds()">删除选中</el-button>
                    <el-button type="danger" @click="$refs.editable.clear()">清空所有</el-button>
                    <el-button type="primary" @click="getAllTableData">保存</el-button>
                </div>
                <el-editable ref="editable" :data.sync="tableList">
                    <el-editable-column type="selection" width="55"></el-editable-column>
                    <el-editable-column type="index" width="55"></el-editable-column>
                    <el-editable-column v-for="(item, index) in (element.options.options)" :key="index"
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
        <template v-if="element.type == 'input'">
            <el-input
                    v-model="element.options.defaultValue"
                    :style="{width: element.options.width+'%'}"
                    :placeholder="element.options.placeholder"
                    :readonly="element.options.readonly"
            ></el-input>
        </template>

        <template v-if="element.type == 'textarea'">
            <el-input type="textarea" :autosize="{minRows:2,maxRows:30}"
                      v-model="element.options.defaultValue"
                      :style="{width: element.options.width+'%'}"
                      :placeholder="element.options.placeholder"
                      :readonly="element.options.readonly"
            ></el-input>
        </template>
        <template v-if="element.type == 'tinymce'">
            <div>
                <tinymce-editor v-model="element.options.defaultValue"
                                :disabled="element.options.disabled"></tinymce-editor>
            </div>

        </template>
        <template v-if="element.type == 'number'">
            <el-input-number
                    v-model="element.options.defaultValue"
                    :disabled="element.options.disabled"
                    :controls-position="element.options.controlsPosition"
                    :style="{width: element.options.width+'%'}"
                    :readonly="element.options.readonly"
            ></el-input-number>
        </template>

        <template v-if="element.type == 'radio'">
            <el-radio-group v-model="element.options.defaultValue"
                            :style="{width: element.options.width+'%'}"
                            :disabled="element.options.disabled"
            >
                <el-radio
                        :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                        :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
                >
                    {{element.options.showLabel ? item.label : item.value}}
                </el-radio>
            </el-radio-group>
        </template>

        <template v-if="element.type == 'checkbox'">
            <el-checkbox-group v-model="element.options.defaultValue"
                               :style="{width: element.options.width+'%'}"
                               :disabled="element.options.disabled"
            >
                <el-checkbox
                        :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                        :label="item.value" v-for="(item, index) in element.options.options" :key="item.value + index"
                >
                    {{element.options.showLabel ? item.label : item.value}}
                </el-checkbox>
            </el-checkbox-group>
        </template>

        <template v-if="element.type == 'time'">
            <el-time-picker
                    v-model="element.options.defaultValue"
                    :is-range="element.options.isRange"
                    :placeholder="element.options.placeholder"
                    :start-placeholder="element.options.startPlaceholder"
                    :end-placeholder="element.options.endPlaceholder"
                    :readonly="element.options.readonly"
                    :disabled="element.options.disabled"
                    :editable="element.options.editable"
                    :clearable="element.options.clearable"
                    :arrowControl="element.options.arrowControl"
                    :style="{width: element.options.width+'%'}"
            >
            </el-time-picker>
        </template>

        <template v-if="element.type == 'date'">
            <el-date-picker
                    v-model="element.options.defaultValue"
                    :type="element.options.type"
                    :is-range="element.options.isRange"
                    :placeholder="element.options.placeholder"
                    :start-placeholder="element.options.startPlaceholder"
                    :end-placeholder="element.options.endPlaceholder"
                    :readonly="element.options.readonly"
                    :disabled="element.options.disabled"
                    :editable="element.options.editable"
                    :clearable="element.options.clearable"
                    :style="{width: element.options.width+'%'}"
            >
            </el-date-picker>
        </template>

        <template v-if="element.type == 'rate'">
            <el-rate v-model="element.options.defaultValue"
                     :max="element.options.max"
                     :disabled="element.options.disabled"
                     :allow-half="element.options.allowHalf"
            ></el-rate>
        </template>

        <template v-if="element.type == 'color'">
            <el-color-picker
                    v-model="element.options.defaultValue"
                    :disabled="element.options.disabled"
                    :show-alpha="element.options.showAlpha"
            ></el-color-picker>
        </template>

        <template v-if="element.type == 'select'">
            <el-select
                    v-model="element.options.defaultValue"
                    :disabled="element.options.disabled"
                    :multiple="element.options.multiple"
                    :clearable="element.options.clearable"
                    :placeholder="element.options.placeholder"
                    :style="{width: element.options.width+'%'}"
            >
                <el-option v-for="item in element.options.options" :key="item.value" :value="item.value"
                           :label="element.options.showLabel?item.label:item.value"></el-option>
            </el-select>
        </template>

        <template v-if="element.type=='switch'">
            <el-switch
                    v-model="element.options.defaultValue"
                    :disabled="element.options.disabled"
            >
            </el-switch>
        </template>

        <template v-if="element.type=='slider'">
            <el-slider
                    v-model="element.options.defaultValue"
                    :min="element.options.min"
                    :max="element.options.max"
                    :disabled="element.options.disabled"
                    :step="element.options.step"
                    :show-input="element.options.showInput"
                    :range="element.options.range"
                    :style="{width: element.options.width+'%'}"
            ></el-slider>
        </template>


        <template v-if="element.type=='imgupload'">
            <fm-upload
                    v-model="element.options.defaultValue"
                    :disabled="element.options.disabled"
                    :style="{'width': element.options.width+'%'}"
                    :width="element.options.size.width"
                    :height="element.options.size.height"

            >

            </fm-upload>
        </template>


        <template v-if="element.type == 'dictionary'">
            <div>
                <el-input
                        v-model="element.options.defaultValue"
                        :placeholder="element.options.placeholder"
                        :style="{width: element.options.width+'%'}"
                        :readonly="element.options.readonly"

                >
                    <el-button slot="append" icon="el-icon-more"
                               @click="handleOpenDicDialog(element.options.props.id)"></el-button>
                </el-input>
            </div>
        </template>


        <template v-if="element.type=='blank'">
            <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">自定义区域</div>
        </template>

        <el-button title="删除" @click.stop="handleWidgetDelete(index)" class="widget-action-delete"
                   v-if="selectWidget.key == element.key" circle plain type="danger">
            <icon name="regular/trash-alt" style="width: 12px;height: 12px;"></icon>
        </el-button>
        <el-button title="复制" @click.stop="handleWidgetClone(index)" class="widget-action-clone"
                   v-if="selectWidget.key == element.key" circle plain type="primary">
            <icon name="regular/clone" style="width: 12px;height: 12px;"></icon>
        </el-button>

    </el-form-item>
</template>

<script>
    import FmUpload from './UploadFiles'
    import Treeselect from '@riophae/vue-treeselect'
    import TinymceEditor from './TinymceEditor'
    import ElEditable from './Editable.vue'
    import ElEditableColumn from './EditableColumn.vue'
    import DictionaryDiaglog from './DictionaryDialog'

    export default {
        props: ['element', 'select', 'index', 'data','widgetConfig'],
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
                tableList: [],
                selectWidget: this.select,
                orgOptions: null,
                orgUserOptions: null

            }
        },
        methods: {
            handleOrgRemoteFunc({action}) {
            },
            handleUserRemoteFunc({action}) {
            },
            handleSelectWidget(index) {

                this.selectWidget = this.data.list[index]
            },
            handleWidgetDelete(index) {
                if (this.data.list.length - 1 === index) {
                    if (index === 0) {
                        this.selectWidget = {}
                    } else {
                        this.selectWidget = this.data.list[index - 1]
                    }
                } else {
                    this.selectWidget = this.data.list[index + 1]
                }

                this.$nextTick(() => {
                    this.data.list.splice(index, 1)
                })
            },
            handleWidgetClone(index) {
                let cloneData = {
                    ...this.data.list[index],
                    options: {...this.data.list[index].options},
                    key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
                }

                if (this.data.list[index].type === 'radio' || this.data.list[index].type === 'checkbox') {

                    cloneData = {
                        ...cloneData,
                        options: {
                            ...cloneData.options,
                            options: cloneData.options.options.map(item => ({...item}))
                        }
                    }
                }

                this.data.list.splice(index, 0, cloneData)

                this.$nextTick(() => {
                    this.selectWidget = this.data.list[index + 1]
                })
            },
            getAllTableData() {

            },
            handleSaveBtn() {

            },
            handleSubmitBtn() {

            }, handleCloseBtn() {

            }, handleBackBtn() {

            }, handlePassBtn() {

            }, handleRejectBtn() {

            },
            handleOpenDicDialog(id) {

            }
        },
        watch: {
            select(val) {
                this.selectWidget = val
            },
            selectWidget: {
                handler(val) {
                    this.$emit('update:select', val)
                },
                deep: true
            }
        }
    }
</script>
