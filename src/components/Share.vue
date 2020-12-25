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
<style scoped>
.popup-display {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  background: rgba(0, 0, 0, 0.5);
}
.popup {
  width: 20rem;
  height: 8rem;
  padding: 1rem;
  background: #f3f4f8;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}
.top-popup {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.popup button {
  background-color: #60558f;
  border-radius: 20%;
  border: 1px solid black;
  color: white;
}
.popup button:hover {
  cursor: pointer;
  background-color: #60558f96;
  cursor: pointer;
}
.bottom-popup {
  width: 100%;
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottom-popup img {
  width: 4rem;
  height: 4em;
  margin: 0 1rem;
}
.bottom-popup img {
  cursor: pointer;
}
</style>
