<template>
  <div class="index">
    <!-- 头部说明 -->
    <div class="index-header-illustrate">
      <h2 class="illustrate-h2">留言板</h2>
      <h5 class="illustrate-h5">很多事情值得记录,当然也值得回味</h5>
    </div>
    <!-- 留言板显示 -->
    <MessageBox></MessageBox>
  </div>
</template>

<script setup lang="ts">
import MessageBox from "../components/message/MessageBox.vue";
</script>

<style scoped lang="sass">
@import url("../style/pages/index.scss")
</style>
