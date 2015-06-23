<link   rel="stylesheet" href="src/components/styles.css">

<template>
   <my-component></my-component>
    <sub-component></sub-component>
</template>

<script>
    module.exports = {
        data: {
        },
        components: {
            "my-component": require('./components/component.vue'),
            "sub-component": require('./components/sub-component/sub-component.vue')
        }

    }
</script>