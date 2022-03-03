<template>
  <div id="dialogBox">
    <div id="dialogMain" class="interval">
      <div id="scorll">
        <ItemBox/>
      </div>
    </div>
  </div>
</template>

<script>
import ItemBox from "./ItemBox.vue";
export default {
  name: "DialogBox",
  components: {
    ItemBox,
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
    &::-webkit-scrollbar{
      display: none;
    }
  }
}
</style>