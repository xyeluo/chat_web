<template>
  <div class="itemBox com-clearfix" :class="msg.who">
    <div class="userBox">
      <div class="username"><p>{{msg.name}}</p></div>
      <div class="avtar com-user-none"><img :src="msg.avtar"/></div>
    </div>
    <div class="messageContent com-clearfix">
      <!-- <i class="arrow"></i> -->

      <div class="messageBox">
        <div class="message">
          <p>
            {{ msg.content }}
          </p>
        </div>
        <div class="sendTime">{{ time }}</div>
      </div>
      <i class="arrow"></i>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "ItemBox",
  /**
   * msg: {
      who: "sender",
      content: "hello world!",
      date: "11:00",
    }
   */
  props: ["msg"],
  data() {
    return {
      time: moment(this.msg.date, moment.ISO_8601).format("YYYY-MM-DD HH:mm"),
      avtar:"",
    };
  },
};
</script>

<style lang="scss" scoped>
@mixin w_h_Value($width, $height) {
  width: $width;
  height: $height;
}

.itemBox {
  margin: 30px 0 40px;
  .userBox {
    width: 35px;
    height: 100%;
    position: relative;
    top: -25px;
    .username {
      color: var(--all_fontColor);
      font-size: 14px;
    }
    .avtar{
      margin-top: 3px;
    }
    img {
      width: 100%;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
    }
  }
  .messageContent {
    // text-align: right;

    .messageBox {
      display: inline-block;
      .message {
        box-sizing: border-box;
        min-height: 45px;
        padding: 12px 10px;
        border-radius: 5px;
        p {
          font-size: 15px;
          // min-width: 330px;
          // width: 100%;
          white-space: pre-wrap;
          word-break: break-all;
          text-align: left;
        }
      }
    }
    i {
      // display: inline-block;
      @include w_h_Value(0, 0);
      border: 8px solid transparent;
      position: relative;
      top: 17px;
    }
  }
  .sendTime {
    font-size: 12px;
    color: var(--all_fontColor);
  }
}
</style>