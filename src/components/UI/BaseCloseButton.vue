<template>
  <div>
    <div class="button-frame">
      <div class="button-frame-inner">
        <div class="line-vertical"></div>
        <div class="line-horizontal"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-frame {
  height: 50px;
  width: 50px;
  border: 1px solid #636476;
  position: relative;
  padding: 10px;
  background-color: #161c25;
  transform: rotate(45deg);
}
.button-frame-inner {
  position: relative;
  height: 100%;
  width: 100%;
  // transform: rotate(45deg);
}
.line-vertical,
.line-horizontal {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 2px;
  // border: 1px solid white;
  background-color: white;
  width: 100%;
}
.line-horizontal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.line-vertical {
  border: 1px;
  transform: translateX(-50%) rotate(90deg);
}
</style>
