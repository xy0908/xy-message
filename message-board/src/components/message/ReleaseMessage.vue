<template>
  <div class="release-message" ref="releaseMessageDom">
    <header class="header">
      <div class="header-title">写留言</div>
      <div
        class="header-x"
        @click="messageStore.changeReleaseMessagecontroller"
      >
        x
      </div>
    </header>

    <main class="main">
      <!-- 选择留言板的颜色 -->
      <ul class="main-select-message-background">
        <li
          class="main-select-message-background-child"
          v-for="(item, index) in messageStore.messageBackgroundData"
          :key="index"
          :style="{ background: item.bg }"
          :class="item.state"
          @click="messageStore.changeMessageBackground(item.bg)"
        ></li>
      </ul>
      <!-- 文本域 -->
      <div class="textarea">
        <textarea
          v-model="textareaContent"
          class="message-textarea"
          placeholder="留言..."
        ></textarea>
        <input
          v-model="authorContent"
          type="text"
          class="author"
          placeholder="签名"
        />
      </div>

      <!-- 选择发布的标签 -->
      <ul class="main-select-message-table">
        <li
          v-for="(item, index) in messageStore.table"
          :key="index"
          :class="item.isActivation"
          class="table-child"
          @click="messageStore.changeTable(item.text)"
        >
          {{ item.text }}
        </li>
      </ul>
      <!-- 免责声明 -->
      <div class="disclaimers">
        <div class="disclaimers-title">免责申明</div>
        <div class="disclaimers-content">
          <p class="disclaimers-text-info">
            小羊留言板是由本人搭建的,为了方便游戏玩家相互交流的平台,请不要利用平台服务制作、上传、下载、复制、发布,传播如下内容
          </p>
          <p class="disclaimers-text">1.反对宪法所确定的基本原则的</p>
          <p class="disclaimers-text">
            2.危害国家安全,泄露国家秘密,颠覆国家政权,破坏国家统一的
          </p>
          <p class="disclaimers-text">3.损害国家荣誉和利益的</p>
          <p class="disclaimers-text">
            4.煽动民族仇恨、民族歧视、破坏民族团结的
          </p>
          <p class="disclaimers-text">
            5.破坏国家宗教政策，宣扬邪教和封建迷信的
          </p>
          <p class="disclaimers-text">6.散布谣言，扰乱经济秩序和社会秩序的</p>
          <p class="disclaimers-text">
            7.散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的
          </p>
          <p class="disclaimers-text">
            8.侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的
          </p>
          <p class="disclaimers-text">
            9.含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容
          </p>
          <p class="disclaimers-text">
            10.中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容
          </p>
        </div>
      </div>
      <!-- 发布按钮 -->
      <button
        class="release-button"
        @click="messageStore.release(textareaContent, authorContent)"
      >
        发布留言
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
const messageStore = useMessageStore();

// 组件的dom元素
const releaseMessageDom = ref<any>(null);
// 留言框 绑定的数据
const textareaContent = ref("");
// 作者 绑定的数据
const authorContent = ref("root");

watch(
  () => messageStore.releaseMessagecontroller,
  (newValue, oldValue) => {
    if (newValue) releaseMessageDom.value.style.right = "0";
    else releaseMessageDom.value.style.right = "-300px";
  }
);
</script>

<style scoped lang="sass">
@import url("../../style/components/releaseMessage.scss")
</style>
