<template>
  <div id="topBox">
    <div id="topMain" class="interval">
      <div id="decorateBox">
        <div id="dotBox">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div id="sign"></div>
        <div id="timeBox">{{ time }}</div>
      </div>
      <div id="userBox">
        <h3 id="user">{{user}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "TopBox",
  data() {
    return {
      user:"",
      time: "",
    };
  },
  methods: {
    getNowTime() {
      this.time = moment().format("HH:mm");
      return this.getNowTime;
    },
  },
  mounted() {
    setInterval(this.getNowTime(), 1000);
    this.$bus.$on("initChatting",(parms) => {
      this.user=parms.from;
    })
  },
  beforeDestroy(){
    this.$bus.$off("initChatting");
  }
};
</script>

<style lang="scss" scoped>
@mixin w_h_Value($width, $height) {
  width: $width;
  height: $height;
}

#topBox {
  @include w_h_Value(100%, 70px);
  border-radius: 0 0 5px 5px;
  border-bottom: 2px solid var(--top_borderBottom);
  background-color: var(--top_inputBox_bg);
  #topMain {
    height: 100%;
    #decorateBox {
      $line_height: 30px;
      height: $line_height;
      display: flex;
      #dotBox {
        flex: 1.5;
        max-width: 80px;
        min-width: 80px;
        line-height: $line_height;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .dot {
          @include w_h_Value(10px, 10px);
          background-color: var(--top_dot_bg_1);
          box-shadow: 0 0 5px rgba($color: #fff, $alpha: 0.5);
          filter: blur(0.5px);
          border-radius: 100%;
          &:nth-child(2) {
            background-color: var(--top_dot_bg_2);
          }
          &:nth-child(3) {
            background-color: var(--top_dot_bg_3);
          }
        }
      }
      #timeBox {
        flex: 5.5;
        text-align: center;
        line-height: $line_height;
        color: var(--all_fontColor);
        user-select: none;
      }
    }
    #userBox {
      $line_height: 40px;
      height: $line_height;
      line-height: $line_height;
      user-select: none;
      #user {
        text-align: center;
        font-size: 20px;
        color: var(--all_fontColor);
        font-weight: 400;
      }
    }
  }
}
</style>