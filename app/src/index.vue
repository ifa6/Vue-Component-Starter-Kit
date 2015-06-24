<link   rel="stylesheet" href="src/components/styles.css">

<template>
   <my-component></my-component>
</template>

<script>
    module.exports = {
        data: {
        },
        components: {
            "my-component": require('./components/my-component/component.vue')
        }

    }
</script>