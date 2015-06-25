<style src="component.css"></style>

<template>
<h1 class="{{styles.dove}}" v-if="test || green || !red" v-style="">I am component</h1>
</template>

<script lang="babel">
    import styles from './component.css';
    module.exports = {
        data: function () {
            return {
                styles:styles,
                test:false,
                green:true
            }
        },
        compiled:function(){
            console.log(this._directives);
        }
    }
</script>