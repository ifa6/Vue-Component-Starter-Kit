<template>
    <div class="Thead" v-style="transform:'translate('+translationX+'px)'">
        <table class="Table">
            <thead class="TableHead">
            <tr>
                <th class="TableHeaderCell" v-repeat="columns">
                    <div class="TableHeaderCellWrapper" v-class="is-number:isNumber">
                        {{label}}
                    </div>
                </th>

            </tr>
            </thead>
        </table>
    </div>
    <div class="Tbody" v-on="scroll:scrollLeft">
        <table class="Table">
            <tbody class="TableBody">
            <tr  v-repeat="entry : data">
                <td class="TableCell" v-repeat="key : columns" data-th="{{key.label}}" >
                    <div class="TableCellWrapper" v-class="is-number:isNumber">{{entry[key.name]}}</div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="babel">
    import styles from './table.css';
    export default{
        data: function () {
            return {
                styles: styles,
                translationX:0
            }
        },
        replace:false,
        props:["data", "columns"],
        ready:function(){
//            If viewing on a windows machine this function will handle scrollbar offset on table component
            var me = this;
            var theadWidth = me.$el.querySelector('.Thead').clientWidth;
            var tbodyWidth = me.$el.querySelector('.Tbody').clientWidth;
            if(theadWidth !== tbodyWidth){
                var widthDifference = theadWidth - tbodyWidth;
                me.theadPadding = widthDifference;
            }
            var tBody = me.$el.querySelector('.Thead');
            var tHead =  me.$el.querySelector('.Tbody');
            me.addEventListener('scroll', function(event) {
                var translation = -event.target.scrollLeft + 'px';
                virtualHeader.style.transform = 'translateX(' + translation + ')';
            });
        },
        methods:{
            scrollLeft:function(e){
                var translation = e.scrollLeft;
                me.translationX = translation;
            }
        }
    }
</script>