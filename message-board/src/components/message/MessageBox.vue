<template>
  <div class="message-box">
    <!-- table 标签显示 -->
    <ul class="message-box-wrap">
      <li
        v-for="(item, index) in tableData"
        :key="index"
        class="message-box-child"
        :class="item.isActivation"
        @click="changeKey(item.text)"
      >
        {{ item.text }}
      </li>
    </ul>
    <!-- 内容 -->
    <MessageContent :msg="msg" />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import MessageContent from "./MessageContent.vue";
// 接口 table数据接口
import { ITable } from "../../types/table";

const url = "/api";
const tableData = ref<ITable[] | null>(null);
let msg = ref("全部");

// 改变 key
const changeKey = (id: string): void => {
  if (msg.value !== id) {
    tableData.value?.forEach((item) => {
      item.isActivation = "false";
      if (item.text === id) item.isActivation = "true";
    });
    msg.value = id;
  }
};

onMounted(async () => {
  const { data } = await axios(url + "/table/getAllTable");
  tableData.value = data;
});
</script>

<style scoped lang="sass">
@import url("../../style/components/messageBox.scss")
</style>
