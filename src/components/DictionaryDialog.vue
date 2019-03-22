<template>
    <el-dialog
            :title="title"
            :visible.sync="dicVisible"
            :close-on-click-modal="false"
            center
            :width="width"
            ref="dicDialog"
            :append-to-body="true"
    >
        <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
        </el-input>

        <el-tree
                class="filter-tree"
                :data="dicTreeData"
                :props="defaultProps"
                show-checkbox
                default-expand-all
                :filter-node-method="filterNode"
                ref="dicTree">
        </el-tree>
        <span v-if="action" slot="footer" class="dialog-footer" v-loading="loading"
              :element-loading-text="loadingText">
              <slot name="action">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handleSelectTreeData">确 定</el-button>
              </slot>
        </span>
    </el-dialog>
</template>

<script>
    import request from '../util/request.js'
    // import Bus from '../util/bus.js'

    export default {
        name: 'dictionary-diaglog',
        props: {
            visible: Boolean,
            loadingText: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: '600px'
            },
            form: {
                type: Boolean,
                default: true
            },
            action: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            show() {
                if (this.form) {
                    return this.showForm
                } else {
                    return true
                }
            }
        },
        data() {
            return {
                parentKey:'',
                filterText: '',
                dicTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

                loading: true,
                dicVisible: this.visible,
                id: 'dialog_' + new Date().getTime(),
                showForm: false
            }
        },
        methods: {
            handleSelectTreeData: function () {
                let selectedNodes = this.$refs.dicTree.getCheckedNodes()
                let tmpData = ''
                for (let i = 0; i < selectedNodes.length; i++) {
                    const selectedNode = selectedNodes[i];
                    if (tmpData == '') {
                        tmpData += selectedNode.label
                    } else {
                        tmpData += "," + selectedNode.label
                    }
                }


                this.$root.Bus.$emit('listen-to-child-event', {key:this.parentKey,data:tmpData})
                this.close()
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            close() {
                this.dicVisible = false
            },
            /*submit() {
                this.loading = true

                this.$emit('on-submit')
            },*/
            end() {
                this.loading = false
            },
            getTreeData(id,key) {
                let _this = this
                _this.parentKey=key
                request({
                    method: 'get',
                    url: '/formdata/getDicTreeData/' + id
                })
                    .then(function (response) {

                        if (response.flag == 200) {
                            // 获取到远端数据后执行回调函数

                            _this.dicTreeData = response.data;
                        }
                        _this.end()

                        //  console.log(response);
                    })
                    .catch(function (err) {
                        console.log(err);
                        _this.end()
                    })
            }
        },

        mounted() {

            //   this.getTreeData()
        },
        watch: {
            filterText(val) {
                this.$refs.dicTree.filter(val);
            },
            dicVisible(val) {
                if (!val) {
                    this.loading = false
                    this.$emit('on-close')
                    setTimeout(() => {
                        this.showForm = false
                    }, 300)
                } else {
                    this.showForm = true
                }
            },
            visible(val) {
                this.dicVisible = val
            }
        }
    }
</script>

<style lang="scss">

</style>
