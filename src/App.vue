<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import store from "./store";

export default {
  name: "App",
  store,
  data() {
    return {
      mainId: "",
    };
  }
};
</script>
<style>
html{
    background: url('./imgs/Background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
body,html{
    margin:0;
  padding:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin:0;
  padding:0;

}

</style>
