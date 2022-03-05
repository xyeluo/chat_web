<template>
  <div id="dialogBox">
    <div id="dialogMain" ref="scorll" class="interval">
      <div id="scorll" ref="scorllBox">
        <ItemBox v-for="item in sub" :key="item.id" :msg="item.msg" />
      </div>
    </div>
  </div>
</template>

<script>
import ItemBox from "./ItemBox.vue";
export default {
  name: "DialogBox",
  data() {
    return {
      sub: [],
    };
  },
  methods: {
    // 信息添加到聊天框
    add(data) {
      let len = this.sub.length;
      const c = {
        msg: {
          who: data.who,
          content: data.msg,
          date: data.date,
        },
        id: String(len),
      };
      this.sub.push(c);
    },

    // 读取本地储存的信息
    localStorageRead() {
      const sub = localStorage.getItem("sub");
      if (!sub) {
        return;
      }
      this.sub = JSON.parse(sub);
    },
  },
  components: {
    ItemBox,
  },
  mounted() {
    this.$bus.$on("add", this.add);
    this.localStorageRead();
  },
  watch: {
    // 聊天框的信息添加到本地储存
    sub(newValue) {
      localStorage.setItem("sub", JSON.stringify(newValue));
      this.$nextTick(() => {
        this.$refs.scorll.scrollTop = this.$refs.scorllBox.offsetHeight;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#dialogBox {
  background-color: var(--dialogBox_bg);
  height: 520px;
  #dialogMain {
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>