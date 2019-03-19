<template>
    <div class="tinymce-container">
        <editor :init="init" v-model="myValue"
                :disabled="disabled">
        </editor>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/themes/modern/theme'
    /*    import 'tinymce/plugins/image'
        import 'tinymce/plugins/media'
        import 'tinymce/plugins/table'
        import 'tinymce/plugins/lists'
        import 'tinymce/plugins/contextmenu'
        import 'tinymce/plugins/wordcount'*/
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/code'

    export default {
        components: {
            Editor
        },
        props: {
            //传入一个value，使组件支持v-model绑定
            value: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            plugins: {
                type: [String, Array],
                /*default: 'lists image media table textcolor wordcount contextmenu'*/
                default: 'code textcolor colorpicker'
            },
            toolbar: {
                type: [String, Array],
               //fontselect   default: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
                default: 'code | fontsizeselect | undo redo |  formatselect | forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
            }
        },
        data() {
            return {
                //初始化配置
                init: {

                    language_url: '/lib/tinymce/langs/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/lib/tinymce/skins/lightgray',
                    height: 150,
                    plugins: this.plugins,
                    toolbar: this.toolbar,
                    branding: false,
                    menubar: false,
                    //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
                    //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
                    images_upload_handler: (blobInfo, success, failure) => {
                        const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                        success(img)
                    }
                },
                myValue: this.value
            }
        },
        mounted() {
            tinymce.init({
                 })
        },
        methods: {
            //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
            //需要什么事件可以自己增加
            onClick(e) {
                this.$emit('onClick', e, tinymce)
            },

        },
        watch: {
            value(newValue) {
                this.myValue = newValue
            },
            myValue(newValue) {
                this.$emit('input', newValue)
            }
        }
    }

</script>
<style scoped>
    .tinymce-container {position: relative}
    .tinymce-textarea {visibility: hidden;z-index: -1;}
    .editor-custom-btn-container {position: absolute;right: 15px;top: 18px;}
    .editor-upload-btn {display: inline-block;}
</style>
