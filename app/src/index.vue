<style  src="components/styles.css"></style>

<template>
   <my-component></my-component>
</template>

<script lang="babel">
    import myComponent from './components/my-component/component.vue'
    module.exports = {
        data: {
        },
        components: {
            "my-component": myComponent
        }

    }
</script>