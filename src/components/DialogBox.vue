<template>
  <div id="dialogBox">
    <div id="dialogMain" ref="scorll" class="interval">
      <div id="scorll" ref="scorllBox">
        <transition-group appear enter-active-class="animate__animated animate__fadeIn">
          <ItemBox v-for="(item, index) in sub" :key="index" :msg="item.msg" />
        </transition-group>
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
          content: data.content,
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
      /* console.log(this.sub); */
    },
    // 信息储存到本地
    localStorageSave(parms) {
      localStorage.setItem("sub", parms);
    },
  },
  components: {
    ItemBox,
  },

  watch: {
    // 聊天框的信息添加到本地储存
    sub: {
      // immediate: true,
      handler(newValue) {
        /* console.log(JSON.stringify(newValue));
        console.log(newValue); */
        this.localStorageSave(JSON.stringify(newValue));
        this.$nextTick(() => {
          this.$refs.scorll.scrollTop = this.$refs.scorllBox.offsetHeight;
        });
      },
    },
  },
  // created(){
  //   axios({
  //     method:'get',
  //     url
  //   })
  // },
  mounted() {
    this.$bus.$on("add", this.add);
    this.$bus.$on("initChatting", (parms) => {
      this.sub = [];
      for (let index in parms.sub) {
        this.sub.push(parms.sub[index]);
        // console.log(parms.sub[index]);
      }
      // this.localStorageSave(parms.sub);
    });
    this.$nextTick(() => {
      this.localStorageRead();
    });
  },
  beforeDestroy() {
    this.$bus.$off("add");
    this.$bus.$off("initChatting");
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