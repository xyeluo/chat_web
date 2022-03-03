<template>
  <div id="inputBg">
    <div id="inputBox" class="interval">
      <div id="inputMain">
        <form id="sendBox" @keydown.enter.prevent>
          <div id="send_input" class="interval">
            <input type="text" placeholder="Type your mesage..." />
          </div>
          <div id="send">
            <span class="fa fa-send"></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputBox",
};
</script>

<style lang="scss" scoped>
@mixin w_h_Value($width, $height) {
  width: $width;
  height: $height;
}
#inputBg {
  $input_bgColor: var(--top_inputBox_bg);
  $send_bgColor: var(--all_fontColor);
  height: 55px;
  background-color: $input_bgColor;
  #inputBox {
    height: 100%;
    #inputMain {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      #sendBox {
        opacity: 0.7;
        &:hover {
          opacity: 1;
        }
        #send_input,
        #send {
          display: inline-block;
        }
        #send_input {
          transition: width 0.5s linear;
          border-bottom: solid 1px rgba($color: #fff, $alpha: 0.5);
          padding: 5px 10px;
          input {
            // margin: 5px 10px;
            width: 100%;
            height: 20px;
            font-size: 16px;
            background-color: $input_bgColor;
            outline: none;
            border: none;
            color: var(--all_fontColor);
          }
        }
        #send {
          $height_line: 32px;
          background-color: $send_bgColor;
          @include w_h_Value($height_line, $height_line);
          line-height: $height_line;
          text-align: center;
          border-radius: 50%;
          .fa-send {
            color: $input_bgColor;
          }
        }
      }
    }
  }
}
</style>