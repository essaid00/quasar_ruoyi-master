<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.value)">
        <q-chip  :color="getColor(item.elTagType)"  :text-color="textColor"  :label="item.label" />
      </template>
    </template>
  </div>
</template>

<script setup>

// // 记录未匹配的项
import {ref,defineProps} from "vue";


const unmatchArray =ref([])

const props = defineProps({
  // 数据
  options: {
    type: Array,
    default: null,
  },
  // 当前的值
  value: [Number, String],
  //标签文本颜色
  textColor:{
    type: String,
    default: "white",
  }
});

const values = computed(() => {
  if (props.value !== null && typeof props.value !== "undefined") {
    return Array.isArray(props.value) ? props.value : [String(props.value)];
  } else {
    return [];
  }
});

function getColor(type){
  let color="";
  switch (type){
    case "success":
      color= "#67C23A"
      break;

    case "info":
      color= "#909399"
      break;

    case "danger":
      color= "#F56C6C"
      break;
    case "warning":
      color= "#E6A23C"
      break;


    default:
      color= "#409EFF"
      break;
  }
  return color;
}
</script>

<style scoped>

</style>
