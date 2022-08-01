<template>
  <div id="topBox">
    <div id="topMain" class="interval">
      <div id="decorateBox">
        <div id="dotBox">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div id="timeBox">{{ time }}</div>
        <div id="sign">在线人数：{{ onlineNum }}</div>
      </div>
      <div id="userBox">
        <h3 id="user">{{ user }}</h3>
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
      user: "",
      time: "",
      onlineNum: "",
    };
  },
  methods: {
    _getNowTime() {
      this.time = moment().format("HH:mm");
      return this._getNowTime;
    },
  },
  mounted() {
    setInterval(this._getNowTime(), 1000);
    this.$bus.$on("initChatting", (parms) => {
      this.user = parms.from;
    });
    this.$bus.$on("setOnlineNum", (parms) => {
      this.onlineNum = parms;
    });
  },
  beforeDestroy() {
    this.$bus.$off("initChatting");
  },
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
  color: var(--all_fontColor);
  #topMain {
    height: 100%;
    #decorateBox {
      $line_height: 30px;
      height: $line_height;
      display: flex;
      justify-content: space-between;
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
      #sign,
      #timeBox {
        line-height: $line_height;
        user-select: none;
        text-align: center;
        flex: 1;
      }
      #sign {
        opacity: 0.7;
        max-width: 110px;
        font-size: 13px;
      }
      #timeBox {
        min-width: 130px;
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
        font-weight: 400;
      }
    }
  }
}
</style>