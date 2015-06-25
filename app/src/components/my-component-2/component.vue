<style src="component.css"></style>

<template>
<h1 class="{{styles.dove}}"  >I am component 2</h1>
</template>

<script lang="babel">
    import styles from './component.css';
    module.exports = {
        data: function () {
            return {
                styles:styles
            }
        },
        compiled:function(){
        }
    }
</script>