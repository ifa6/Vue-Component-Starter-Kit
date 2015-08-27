<template>
<div class="{{styles.block}}">
    some random content
</div>
</template>

<script lang="babel">
    import styles from './block.scss';
    export default{
        data: function () {
            return {
                styles: styles
            }
        }
    }
</script>