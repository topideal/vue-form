export const basicComponents = [
    {
        type: 'separation',
        name: '分割线',
        icon: 'chalkboard',
        options: {
            fontalign: 'center',
            fontcolor: '#333333',
            size: {
                width: 100,
                height: 1,
            }, padding: {
                top: 10,
                bottom: 10
            }

        }
    }, {
        type: 'label',
        name: '标签',
        icon: 'chalkboard',
        options: {
            padding: {
                top: 10,
                bottom: 10
            },
            fontcolor: '#333333',
            fontsize: 14,
            fontalign: 'center'
        }
    }, /*{
        type: 'button',
        name: '按钮',
        icon: 'chalkboard',

        options: {padding: {
                top: 10,
                bottom: 10
            },
            fontcolor: '#333333',
            fontsize: 14,
            fontalign: 'center',
            js:''}
    },{
        type: 'link',
        name: '联接',
        icon: 'chalkboard',

        options: {padding: {
                top: 10,
                bottom: 10
            },
            fontcolor: '#333333',
            fontsize: 14,
            fontalign: 'center',
            js:''}
    },*/ {
        type: 'input',
        name: '单行文本',
        icon: 'regular/keyboard',
        widgetType: 1,
        options: {
            showLabel: true,
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'string',
            pattern: '',
            placeholder: '',
            readonly: false
        }
    },
    {
        type: 'textarea',
        name: '多行文本',
        icon: 'regular/keyboard',
        widgetType: 1,
        options: {
            showLabel: true,
            width: '100%',
            defaultValue: '',
            required: false,
            pattern: '',
            placeholder: '',
            readonly: false
        }
    },
    /* {
         type: 'number',
         name: '计数器',
         icon: 'sort-numeric-up',
         options: {
             showLabel:true,
             width: '100%',
             required: false,
             defaultValue: 0,
             min: '',
             max: '',
             step: 1,
             disabled: false,
             controlsPosition: ''
         }
     },*/
    {
        type: 'radio',
        name: '单选框组',
        icon: 'regular/dot-circle',
        widgetType: 2,
        options: {
            inline: true,
            defaultValue: '',
            showLabel: false,
            options: [
                {
                    value: '选项值1',
                    label: '选项标签1'
                }
            ],
            required: false,
            width: '100%',
            remote: true,
            remoteOptions: [],
            props: {
                id: '',
                value: 'value',
                label: 'label'
            },
            remoteFunc: '',
            disabled: false
        }
    },
    {
        type: 'checkbox',
        name: '多选框组',
        icon: 'regular/check-square',
        widgetType: 2,
        options: {
            inline: true,
            defaultValue: [],
            showLabel: false,
            options: [
                {
                    value: '选项1'
                },
                {
                    value: '选项2'
                },
                {
                    value: '选项3'
                }
            ],
            required: false,
            width: '100%',
            remote: true,
            remoteOptions: [],
            props: {
                id: '',
                value: 'value',
                label: 'label'
            },
            remoteFunc: '',
            disabled: false
        }
    },
    /* {
         type: 'time',
         name: '时间选择器',
         icon: 'regular/clock',
         widgetType:8,
         options: {
             showLabel:false,
             defaultValue: '21:19:56',
             readonly: false,
             disabled: false,
             editable: true,
             clearable: true,
             placeholder: '',
             startPlaceholder: '',
             endPlaceholder: '',
             isRange: false,
             arrowControl: true,
             format: 'HH:mm:ss',
             required: false,
             width: '100%',
         }
     },*/
    {
        type: 'date',
        name: '日期选择器',
        icon: 'regular/calendar-alt',
        widgetType: 8,
        options: {
            showLabel: true,
            defaultValue: '',
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '',
            startPlaceholder: '',
            endPlaceholder: '',
            type: 'date',
            format: 'yyyy-MM-dd',
            timestamp: false,
            required: false,
            width: '100%',
        }
    },
    /*{
        type: 'rate',
        name: '评分',
        icon: 'regular/star',
        options: {
            showLabel:false,
            defaultValue: null,
            max: 5,
            disabled: false,
            allowHalf: false,
            required: false
        }
    },
    {
        type: 'color',
        name: '颜色选择器',
        icon: 'palette',
        options: {
            showLabel:false,
            defaultValue: '',
            disabled: false,
            showAlpha: false,
            required: false
        }
    },*/
    {
        type: 'select',
        name: '下拉选择框',
        icon: 'regular/caret-square-down',
        widgetType: 2,
        options: {
            defaultValue: '',
            multiple: false,
            disabled: false,
            clearable: false,
            placeholder: '',
            required: false,
            showLabel: true,
            width: '100%',
            options: [
                {
                    value: '下拉框1'
                }
            ],
            remote: true,
            remoteOptions: [],
            props: {
                id: '',
                value: 'value',
                label: 'label'
            },
            remoteFunc: ''
        }
    }/*,
    {
        type: 'switch',
        name: '开关',
        icon: 'toggle-off',
        options: {
            defaultValue: false,
            required: false,
            disabled: false,
        }
    },
    {
        type: 'slider',
        name: '滑块',
        icon: 'sliders-h',
        options: {
            defaultValue: 0,
            disabled: false,
            required: false,
            min: 0,
            max: 100,
            step: 1,
            showInput: false,
            range: false,
            width: '100%'
        }
    }*/
    ,{
        type: 'imgupload',
        name: '上传文件',
        icon: 'regular/image',
        widgetType: 6,
        options: {
            showLabel:true,
            defaultValue: [],
            size: {
                width: 40,
                height: 40,
            },
            length: 4,
            multiple: true
        }
    },{
        type: 'tinymce',
        name: '富文本框',
        icon: 'regular/keyboard',
        widgetType: 1,
        options: {
            showLabel: true,
            width: '100%',
            size: {
                height: 100,
            },
            defaultValue:null,
            required: false,
            pattern: '',
            placeholder: '',
            readonly: false,
            withCredentials: true
        }
    }
]

export const advanceComponents = [
     /*{
        type: 'blank',
        name: '自定义',
        icon: 'chalkboard',
        widgetType:0,
        options: {
            defaultType: 'String'
        }
    },*/

]

export const layoutComponents = [
    {
        type: 'grid',
        name: '栅格布局',
        icon: 'th',
        columns: [
            {
                span: 12,
                list: []
            },
            {
                span: 12,
                list: []
            }
        ],
        options: {
            gutter: 0,
            justify: 'start',
            align: 'top',
            isReactive:false
        }
    },{
        type: 'eltable',
        name: '表格',
        icon: 'regular/caret-square-down',
        widgetType: 7,
        valueConsistsOf:'LEAF_PRIORITY',
        options: {
            showLabel: true,
            width: '100%',
            props: {
                value: 'value',
                label: 'label'
            },
            options: [
                {
                    label:'表头名称',
                    value: '对应字段'
                }
            ]
        }
    }
]

export const layoutBySelfComponents = [
    {
        type: 'saveBtn',
        name: '保 存',
        icon: 'chalkboard',
        options: {
            action:'',
            actionName:'',
            js:''
        }
    }, {
        type: 'submitBtn',
        name: '提 交',
        icon: 'chalkboard',
        options: {
            action:'',
            actionName:'',
            js:''
        }
    },{
        type: 'closeBtn',
        name: '关 闭',
        icon: 'chalkboard',
        options: {}
    }, {
        type: 'backBtn',
        name: '返 回',
        icon: 'chalkboard',
        options: {}
    },
    /*{
        type: 'passBtn',
        name: '同 意',
        icon: 'chalkboard',
        options: {}
    },
    {
        type: 'rejectBtn',
        name: '退 回',
        icon: 'chalkboard',
        options: {}
    },*/
    {
        type: 'org',
        name: '组织结构',
        icon: 'regular/caret-square-down',
        widgetType: 3,
        valueConsistsOf:'LEAF_PRIORITY',
        options: {
            dataType:'object',
            multiple: true,
            disabled: false,
            clearable: false,
            placeholder: '',
            required: false,
            showLabel: true,
            width: '100%',
            options: [],
            remote: false,
            remoteOptions: [],
            remoteFunc: ''
        }
    },{
        type: 'user',
        name: '人员选择',
        icon: 'regular/caret-square-down',
        widgetType: 3,
        valueConsistsOf:'LEAF_PRIORITY',
        options: {
            dataType:'object',
            multiple: true,
            disabled: false,
            clearable: false,
            placeholder: '',
            required: false,
            showLabel: true,
            width: '100%',
            options: [],
            remote: false,
            remoteOptions: [],
            remoteFunc: ''
        }
    },
    {
        type: 'dictionary',
        name: '数据选择',
        icon: 'regular/caret-square-down',
        widgetType:9,
        options: {
            multiple: true,
            disabled: false,
            clearable: false,
            placeholder: '',
            required: false,
            showLabel: true,
            width: '100%',
            options: [],
            remote: true,
            remoteOptions: [],
            remoteFunc: '',
            props: {
                id: '',
                value: 'value',
                label: 'label'
            }
        }
    },
    {
        type: 'js',
        name: 'HTML脚本',
        icon: 'chalkboard',
        options: {
            fontalign: 'center',
            js: 'HTML脚本',
            size: {
                width: 100,
                height: 1,
            }, padding: {
                top: 10,
                bottom: 10
            }

        }
    }
]
