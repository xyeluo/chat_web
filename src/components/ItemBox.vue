<template>
  <div class="itemBox sender">
    <div class="messageContent">
      <!-- <i class="arrow"></i> -->
      <div class="messageBox">
        <div class="message">
          <p>
            {{message}}
          </p>
        </div>
        <div class="sendTime">10:00</div>
      </div>
      <i class="arrow"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemBox",
  props:['message'],
};
</script>

<style lang="scss" scoped>
@mixin w_h_Value($width, $height) {
  width: $width;
  height: $height;
}

.itemBox {
  margin: 20px 0 35px;
  .messageContent {
    // text-align: right;

    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
      height: 0;
    }
    *zoom: 1;
    .messageBox {
      display: inline-block;
      .message {
        box-sizing: border-box;
        min-height: 45px;
        padding: 15px 15px;
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