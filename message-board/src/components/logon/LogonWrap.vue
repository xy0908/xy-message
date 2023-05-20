<template>
  <div class="logon-wrap">
    <div class="box">
      <!-- 左侧 -->
      <div class="left">
        <template v-if="logonStore.switchLogonText === '登录'">
          <Logon
        /></template>
        <template v-else><Register /></template>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <div class="title">Hello，Friend!</div>
        <div class="content">输入您的账号密码可以进行登录或者注册</div>
        <button class="button" @click="logonStore.changeSwitchLogonText">
          {{ logonStore.rightText() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件
import Logon from "../logon/Logon.vue";
import Register from "../logon/Register.vue";
const logonStore = useLogonStore();
</script>

<style>
@import url("../../style/components/logon/logon-wrap.scss");
</style>
