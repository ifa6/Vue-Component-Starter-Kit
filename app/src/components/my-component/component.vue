<style src="component.css"></style>

<template>
<h1 class="{{styles.dove}}">I am component</h1>
</template>

<script lang="babel">
    import styles from './component.css';
    module.exports = {
        data: function () {
            return {
                styles:styles
            }
        }
    }
</script>