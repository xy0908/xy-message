<template>
  <div class="register">
    <header class="title">注册</header>

    <main class="main">
      <input
        type="text"
        class="admin"
        v-model="logonStore.admin"
        ref="adminDom"
        placeholder="请输入汉字作为账号名称"
      />
      <input
        type="text"
        class="password"
        ref="passwordDom"
        v-model="logonStore.password"
        placeholder="请输入英文字母作为账号密码"
      />
    </main>

    <footer class="footer">
      <button
        class="create"
        @click="
          logonStore.register(
            adminDom as HTMLInputElement,
            passwordDom as HTMLInputElement
          )
        "
      >
        注册
      </button>
      <button class="back" @click="logonStore.changeLogonWrapController">
        返回
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
const logonStore = useLogonStore();
// 表单的DOM
const adminDom = ref<HTMLInputElement>();
const passwordDom = ref<HTMLInputElement>();
</script>

<style scoped lang="sass">
@import url("../../style/components/logon/register.scss")
</style>
