<template>
  <div class="logon">
    <header class="title">登录</header>
    <main class="main">
      <input
        class="admin"
        v-model="logonStore.admin"
        type="text"
        placeholder="admin"
      />
      <input
        class="password"
        v-model="logonStore.password"
        type="text"
        placeholder="password"
      />
    </main>
    <footer class="footer">
      <button class="create" @click="logonStore.logon">登录</button>
      <button class="back" @click="logonStore.changeLogonWrapController">
        返回
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
const logonStore = useLogonStore();
</script>

<style scoped lang="sass">
@import url("../../style/components/logon/logon.scss")
</style>
