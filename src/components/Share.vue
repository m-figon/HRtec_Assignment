<template>
  <div class="popup-display" v-if="display">
    <div class="popup">
      <div class="top-popup">
        <button v-on:click="$emit('displayChange')">X</button>
      </div>
      <div class="bottom-popup">
        <a href="https://www.facebook.com/"
          ><img src="../imgs/facebook.png"
        /></a>
        <a href="https://www.linkedin.com/"
          ><img src="../imgs/linkedin.png"
        /></a>
        <a href="https://twitter.com/"><img src="../imgs/twitter.png" /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["display"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../views/style.css">

</style>
