<style  src="components/styles.css"></style>

<template>
   <my-component  v-if="component" v-style=""></my-component>
    <my-component-2 v-if="component2"></my-component-2>
</template>

<script lang="babel">
    import myComponent from './components/my-component/component.vue'
    import myComponent2 from './components/my-component-2/component.vue'
    module.exports = {
        data: {
            component:true,
            component2:true,
        },
        components: {
            "my-component": myComponent,
            "my-component-2": myComponent2
        }

    }
</script>