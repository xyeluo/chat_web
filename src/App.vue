<template>
  <div id="app">
    <div id="bg" class="centerBox default">
      <TopBox />

      <DialogBox />
      <InputBox />
    </div>
  </div>
</template>

<script>
import TopBox from "./components/TopBox.vue";
import InputBox from "./components/InputBox.vue";
import DialogBox from "./components/DialogBox.vue";
import axios from "axios";
// import qs from 'qs';
export default {
  name: "App",

  components: {
    InputBox,
    DialogBox,
    TopBox,
  },
  methods: {
    getChattingMessage() {
      axios({
        method: "get",
        url: `http://localhost:80${window.location.pathname}queryChatting`,
      }).then((res) => {
        // 初始化加载用户信息：from、to、sub
        this.$bus.$emit("initChatting", res.data);
        // console.log(res.data);
        // console.log(res.data);
      });
      return this.getChattingMessage;
    },
  },
  created() {
    setInterval(this.getChattingMessage(),5000);
    // this.getChattingMessage();
  },
};
</script>

<style lang="scss">
:root {
  .default {
    --all_fontColor: #dddce2;
    --body_bg: #f4f4f4;

    --top_inputBox_bg: #1b222a;
    --top_borderBottom: #353c44;
    --top_dot_bg_1: #fe4755;
    --top_dot_bg_2: #fdbd30;
    --top_dot_bg_3: #6c6c6c;

    --dialogBox_bg: #272e36;

    --itemBox_sender_bg: #2ba6e1;
    --itemBox_receiver_bg: #fcfdff;
  }
}
@mixin w_h_Value($width, $height) {
  width: $width;
  height: $height;
}
// 公用样式
* {
  margin: 0;
  padding: 0;
}
.centerBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.interval {
  margin: 0 10px;
}

@media screen and (min-width: 1030px) {
  .message {
    max-width: 470px;
  }
  #send_input {
    width: 420px;
  }
}
@media screen and (max-width: 1030px) {
  .message {
    max-width: 370px;
  }
  #send_input {
    width: 300px;
  }
}
@media screen and (max-width: 825px) {
  .message {
    max-width: 270px;
  }
  #send_input {
    width: 200px;
  }
}
// 发送者样式
.sender {
  $bg_borderColor: var(--itemBox_sender_bg);
  div.messageContent {
    text-align: right; // 设置右聊天框
    // 设置聊天框背景、箭头右方向
    div.message {
      background-color: $bg_borderColor;
      color: var(--all_fontColor);
    }
    .arrow {
      border-left-color: $bg_borderColor !important;
      left: -1px;
      float: right;
    }
  }
}
// 接收者样式
.receiver {
  $bg_borderColor: var(--itemBox_receiver_bg);
  div.messageContent {
    text-align: left;
    // 设置聊天框背景、箭头左方向
    div.message {
      background-color: $bg_borderColor;
      color: #000;
    }
    .arrow {
      border-right-color: $bg_borderColor !important;
      right: -1px;
      float: left;
    }
  }
}
// 组件样式
html,
body {
  @include w_h_Value(100%, 100%);
  background-color: var(--body_bg);

  #app {
    @include w_h_Value(100%, 100%);
    position: relative;
    #bg {
      width: 50%;
      min-width: 320px;
      height: 645px;
      background-color: rgb(50, 50, 50);
      box-shadow: 0 0 16px black;
      // inset -5px -2px 10px rgba(255, 255, 255, .5);
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid black;
    }
  }
}
</style>
