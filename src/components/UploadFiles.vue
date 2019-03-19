<template>
    <div class="fm-uplaod-container"
         :id="uploadId"
    >
        <div class="el-upload ">
            <el-button size="mini" type="default">浏览...</el-button>
            <!--<i class="el-icon-plus"
               :style="{fontSize:miniWidth/4+'px',marginTop: (-miniWidth/8)+'px', marginLeft: (-miniWidth/8)+'px'}"></i>-->
            <!--accept="image/*"-->
            <input multiple ref="uploadInput" @change="handleChange" type="file" name="file" class="el-upload__input upload-input">
        </div>

        <div
                :id="item.key"
                v-for="(item) in fileList" :key="item.key">

            <el-progress v-if="item.status=='uploading'" :stroke-width="18"
                         :status="item.percent<100?'exception':'success'"
                         type="line"
                         :percentage="item.percent"></el-progress>

            <ul v-if="item.status=='success'">
                <li><i class="el-icon-delete"
                       @click="handleRemove(item.key)"
                       :style="{'font-size': '18px'}"></i>
                </li>
                <li>{{item.key}}</li>
            </ul>


        </div>


    </div>
</template>

<script>
    /*import Viewer from 'viewerjs'

    require('viewerjs/dist/viewer.css')*/

    export default {
        props: {
            multiple: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                fileList: [],
                viewer: null,
                uploadId: 'upload_' + new Date().getTime()
            }
        },
        computed: {

        },
        methods: {
            genNewFileName(fileName) {
                let index1 = fileName.lastIndexOf(".")
                let index2 = fileName.length
                let postf = fileName.substring(index1, index2);//后缀名
                const key = (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999)
                return fileName.substring(0, index1) + '_' + key + postf
            },

            handleChange() {
                // console.log(this.$refs.uploadInput.files)
                const files = this.$refs.uploadInput.files
                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                   // const reader = new FileReader()
                    const key = this.genNewFileName(file.name)
                    this.fileList.push({
                        key,
                        percent: 0,
                        status: 'uploading'
                    })
                    this.$nextTick(() => {

                        this.uplaodAction(file, key)
                    })
                    /*reader.readAsBinaryString(file)
                    reader.onload = () => {
                        this.fileList.push({
                            key,
                            percent: 0,
                            status: 'uploading'
                        })


                    }*/
                }

                this.$refs.uploadInput.value = []
            },

            uplaodAction(file, key) {
                let fd = new FormData();
                fd.append("file", file);
                fd.append("fileName", key);
                const xhr = new XMLHttpRequest()
                const url = this.GLOBAL.httpUrl + '/formdata/uploadFile'
                xhr.open('POST', url,true)
                xhr.send(fd)
                xhr.onloadstart  = () => {//上传开始执行方法

                    this.$set(this.fileList[this.fileList.findIndex(item => item.key === key)], 'percent', 2)
                }

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        let resData = JSON.parse(xhr.response)
                        if (resData.flag == 200) {
                            this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
                                ...this.fileList[this.fileList.findIndex(item => item.key === key)],
                                url: resData.data,
                                percent: 100
                            })
                            setTimeout(() => {
                                this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
                                    ...this.fileList[this.fileList.findIndex(item => item.key === key)],
                                    status: 'success'
                                })

                                this.$emit('input', this.fileList)
                            }, 200)
                        } else {
                            this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
                                ...this.fileList[this.fileList.findIndex(item => item.key === key)],
                                status: 'error'
                            })
                            this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
                        }
                    }
                }
                xhr.onprogress = (res) => {
                   // console.log('progress', res)
                    if (res.total && res.loaded) {
                        this.$set(this.fileList[this.fileList.findIndex(item => item.key === key)], 'percent', res.loaded / res.total * 100)
                    }
                }
            },

            handleRemove(key) {
                this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
            }/*,

            handlePreviewFile(key) {
                this.viewer && this.viewer.destroy()
                this.uploadId = 'upload_' + new Date().getTime()

                console.log(this.viewer)
                this.$nextTick(() => {
                    this.viewer = new Viewer(document.getElementById(this.uploadId))
                    this.viewer.view(this.fileList.findIndex(item => item.key === key))
                })
            }*/
        }
    }
</script>

<style lang="scss">
    .fm-uplaod-container .upload-input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: block;
        opacity: 0;
        cursor: pointer;
    }

    .fm-uplaod-container ul {
        display: inline;
        margin: 0;
        padding: 10px 0;
    }

    .fm-uplaod-container ul li {
        display: inline-block;
        cursor: pointer;
        padding: 0 20px;
    }
</style>
