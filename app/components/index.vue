<template>
    <div class="{{styles.body}}">Hello World</div>
</template>

<script lang="babel">
    import styles from './styles.scss';
    export default{
        data: function () {
            return {
                styles: styles
            }
        }
    }
</script>