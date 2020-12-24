<template>
  <div class="player-display">
    <div class="player">
      <div class="top-player">
        <div class="top-menu">
          <div class="left"></div>
          <div class="middle">
            <img src="../imgs/refresh4.png" />
            <img src="../imgs/shuffle.png" />
            <img src="../imgs/refresh1.png" />
          </div>
          <div class="right">
            <img src="../imgs/menu.png" />
          </div>
        </div>
        <img src="../imgs/Icona_Pop.png" />
      </div>
      <div class="bottom-menu">
        <div class="left"></div>
        <div class="middle">
          <h1>Icona Pop</h1>
          <h2>Still Dont Know</h2>
        </div>
        <div class="right"></div>
      </div>
      <div class="volume-menu">
        <div class="left"></div>
        <div class="middle">
          <img src="../imgs/audio.png" />
        </div>
        <div class="right"></div>
      </div>
      <div class="bottom-player">
        <div class="left">
          <div class="player-img">
            <img src="../imgs/share.png" />
          </div>
        </div>
        <div class="middle">
          <div id="purple" class="player-img">
            <img src="../imgs/previous.png" />
          </div>
          <div id="big-purple" class="player-img">
            <img src="../imgs/pause.png" />
          </div>
          <div id="purple" class="player-img">
            <img src="../imgs/next.png" />
          </div>
        </div>
        <div class="right">
          <div class="player-img">
            <img src="../imgs/favorite.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="player-shade"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      songs: null,
    };
  },
  created() {
    console.log("created!");
    fetch("https://my-json-server.typicode.com/m-figon/demo/songs")
      .then((response) => response.json())
      .then((data) => {
        this.songs = data.slice();
        console.log(this.songs);
      });
  },
};
</script>
<style>
.player-display {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.player {
  width: 360px;
  height: 480px;
  border-radius: 30px;
  background-color: #f3f4f8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.top-player {
  width: 100%;
  height: 70%;
}
.top-player img {
  width: 100%;
  height: 100%;
  margin-top: -20%;
}
.bottom-player {
  position: relative;
  background-color: #eeeff5;
  width: 100%;
  height: 30%;
  z-index: 5;
}
.top-menu {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.425);
  display: flex;
  padding: 0 3%;
}
.top-menu .left,
.top-menu .middle,
.top-menu .right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 31%;
  height: 100%;
}
.top-menu .left {
  justify-content: flex-start;
}
.top-menu .right {
  justify-content: flex-end;
}
.top-menu .middle img {
  width: 16px;
  height: 16px;
  margin: 0 10px;
}
.top-menu .right img {
  width: 16px;
  height: 16px;
  margin: 0 10px;
}
.bottom-menu {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 15%;
  background-color: rgba(0, 0, 0, 0.425);
  display: flex;
  padding: 0 3%;
  margin-top: -21%;
}
.bottom-menu .left,
.bottom-menu .middle,
.bottom-menu .right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 100%;
  flex-direction: column;
}
.bottom-menu .left {
  justify-content: flex-start;
}
.bottom-menu .right {
  justify-content: flex-end;
}
.bottom-menu .middle h1 {
  font-size: 18px;
  color: #ffffff;
  font-weight: 700;
  font-family: "Rambla";
  text-align: center;
  margin: 0;
}
.bottom-menu .middle h2 {
  font-size: 14px;
  color: #ffffff;
  font-weight: 400;
  font-family: "Rambla";
  text-align: center;
  margin: 0;
}
.player-shade {
  background-color: hsla(257, 33%, 38%, 0.384);
  width: 360px;
  height: 480px;
  border-radius: 30px;
  margin-left: -360px;
}
.volume-menu {
  width: 100%;
  height: 7px;
  position: relative;
  z-index: 7;
  display: flex;
}
.volume-menu .left {
  background: white;
  height: 100%;
  width: 69%;
}
.volume-menu .middle {
  width: 22px;
  height: 22px;
  border-radius: 11px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
  background-color: #ffffff;
  margin-top: -8px;
}
.volume-menu .right {
  height: 100%;
  background-color: #ed5e74;
  width: 29%;
}
.volume-menu img {
  width: 12px;
  height: 9px;
}
.bottom-player {
  display: flex;
}
.bottom-player .left,
.bottom-player .right {
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-player .middle {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.player-img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
#purple {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
  background-color: #60558f;
  margin: 0 5px;
}
#big-purple {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
  background-color: #60558f;
  margin: 0 5px;
}
</style>


