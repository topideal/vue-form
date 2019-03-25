<template>
    <div class="form-config-container">
        <el-form label-width="80px" label-position="top">
            <el-form-item label="标签对齐方式" >
                <el-radio-group v-model="data.labelPosition" size="mini">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="标签宽度">
                <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
            </el-form-item>

            <el-form-item label="表单字体" label-position="right">
                <el-select v-model="data.fontFamily" size="mini">
                    <el-option value="STHeiti" label="华文黑体"></el-option>
                    <el-option value="STKaiti" label="华文楷体"></el-option>
                    <el-option value="STSong" label="华文宋体"></el-option>
                    <el-option value="SimHei" label="黑体"></el-option>
                    <el-option value="SimSun" label="宋体"></el-option>
                    <el-option value="FangSong" label="仿宋"></el-option>
                    <el-option value="KaiTi" label="楷体"></el-option>
                    <el-option value="Microsoft YaHei" label="微软雅黑"></el-option>
                </el-select>
            </el-form-item>


           <!-- <el-form-item label="挂接表单">
                <el-select v-model="data.billId" size="mini" @change="handleSelectedBill">
                    <el-option v-for="(item, index) in formDataList" :key="index" :value="item.value" :label="item.label" :disabled="!item.disabled"></el-option>

                </el-select>
            </el-form-item>-->


        </el-form>


    </div>
</template>

<script>
    //import Bus from '../util/bus.js'
    export default {
        props: ['data'],
        data() {
            return {
                formDataList:[]
            }
        },
        mounted() {
           /* let that = this
            request({
                method: 'get',
                url: '/formdata/getFormList'
            })
                .then(function (response) {
                    if (response.flag == 200) {
                        that.formDataList = response.data;
                    }
                    console.log(response);
                })
                .catch(function (err) {
                    console.log(err);
                })*/

        },
        methods: {
           /* handleSelectedBill: function (id) {
                this.$root.Bus.$emit('listen-to-billid-event', id)
            }*/
        }
    }
</script>
