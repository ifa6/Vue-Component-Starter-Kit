<style  src="components/styles.css"></style>

<template>
   <my-component></my-component>
    <my-component-2></my-component-2>
</template>

<script lang="babel">
    import myComponent from './components/my-component/component.vue'
    import myComponent2 from './components/my-component-2/component.vue'
    module.exports = {
        data: {
        },
        components: {
            "my-component": myComponent,
            "my-component-2": myComponent2
        }

    }
</script>