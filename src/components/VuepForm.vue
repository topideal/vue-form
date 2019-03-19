<template>
    <vuep v-model="value" :options="{ mode: 'text/x-vue' }"></vuep>
</template>

<script>
    import 'vuep/dist/vuep.css'
    import Vuep from 'vuep'

    export default {
        name: "vuep-form",
        props: ['data'],
        components: {
            Vuep
        },
        data: () => ({
            value: `module.exports = {
  template: '<div>I\\'am {{ name }}</div>',

  data: function () {
    return { name: 'cinwell' }
  }
}`
        })
    }
</script>



