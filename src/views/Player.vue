<template>
  <div class="player-display">
    <div v-if="loaded" class="player">
      <div class="top-player">
        <div class="top-menu">
          <div class="left"></div>
          <div class="middle">
            <img
              src="../imgs/refresh4.png"
              v-on:click="changeMode(1)"
              v-bind:class="{ chosen: mode === 1 }"
            />
            <img
              src="../imgs/shuffle.png"
              v-on:click="changeMode(2)"
              v-bind:class="{ chosen: mode === 2 }"
            />
            <img
              src="../imgs/refresh1.png"
              v-on:click="changeMode(3)"
              v-bind:class="{ chosen: mode === 3 }"
            />
          </div>
          <div class="right">
            <img src="../imgs/menu.png" v-on:click="goToPlaylist()" />
          </div>
        </div>
        <img src="../imgs/Icona_Pop.png" />
      </div>
      <div class="bottom-menu">
        <div class="left"></div>
        <div class="middle">
          <h1>{{ song.author }}</h1>
          <h2>{{ song.title }}</h2>
        </div>
        <div class="right"></div>
      </div>
      <div class="volume-menu">
        <div class="left" ref="progressLeft"></div>
        <div class="middle">
          <img src="../imgs/audio.png" />
        </div>
        <div class="right" ref="progressRight"></div>
      </div>
      <div class="bottom-player">
        <div class="left">
          <div class="player-img" v-on:click="popupChange(true)">
            <img src="../imgs/share.png" />
          </div>
        </div>
        <div class="middle">
          <div
            class="purple-player-img"
            v-bind:class="{ inactive: song.id === 0 }"
          >
            <img
              v-bind:class="{ inactive: song.id === 0 }"
              src="../imgs/previous.png"
              v-on:click="changeSong('-')"
            />
          </div>
          <div class="big-purple-player-img">
            <img
              v-if="played"
              src="../imgs/pause.png"
              v-on:click="playPause()"
            />
            <img
              v-if="!played"
              src="../imgs/play.png"
              id="play"
              v-on:click="playPause()"
            />
          </div>
          <div
            class="purple-player-img"
            v-bind:class="{ inactive: song.id + 1 === songs.length }"
          >
            <img
              v-bind:class="{ inactive: song.id + 1 === songs.length }"
              src="../imgs/next.png"
              v-on:click="changeSong('+')"
            />
          </div>
        </div>
        <div class="right">
          <div
            class="player-img"
            v-bind:class="{ loved: song.heart }"
            v-on:click="loveReaction(song.id)"
          >
            <img src="../imgs/favorite.png" />
          </div>
        </div>
      </div>
    </div>
    <img id="loading" v-if="!loaded" src="../imgs/loading.gif" />
    <div v-if="loaded" class="player-shade"></div>
    <share-popup
      v-bind:display="popup"
      v-on:displayChange="popupChange(false)"
    ></share-popup>
  </div>
</template>

<script>
import store from "../store";
import Popup from "../components/Share.vue";

export default {
  store,
  components: {
    "share-popup": Popup,
  },
  data() {
    return {
      song: null,
      played: false,
      songs: null,
      loaded: false,
      seconds: 0,
      timeTic: 0,
      refreshed: true,
      timeInterval: null,
      mode: 0,
      popup: false,
    };
  },
  created() {
    setInterval(() => {
      if (this.refreshed) {
        fetch("https://my-json-server.typicode.com/m-figon/demo/songs")
          .then((response) => response.json())
          .then((data) => {
            this.songs = data.slice();
            this.refreshed = false;
            for (const singleSong of this.songs) {
              if (singleSong.title === this.$route.params.player) {
                this.seconds = 0;
                this.song = singleSong;
                this.loaded = true;
                this.seconds +=
                  parseInt(this.song.duration.substr(0, 1)) * 60 +
                  parseInt(this.song.duration.substr(2, 2));
                console.log("songs seconds: " + this.seconds);
                this.timeInterval = setInterval(this.intervalCallback, 100);
              }
            }
          });
      }
    }, 1000);
  },
  methods: {
    resetParams() {
      clearInterval(this.timeInterval);
      this.timeTic = 0;
      this.refreshed = true;
      this.loaded = false;
    },
    intervalCallback = () =>{
      if (!this.played) {
        return;
      }
      //if play button pressed
      this.timeTic += 1;
      this.$refs.progressLeft.style.width = (this.timeTic / this.seconds) * 100 + "%";
      this.$refs.progressRight.style.width = 100 - (this.timeTic / this.seconds) * 100 + "%";
      if (this.timeTic < this.seconds) {
        return;
      }
      // if time ended
      this.$refs.progressLeft.style.width = "0%";
      this.$refs.progressRight.style.width = "100%";
      this.played = true;
      this.timeTic = 0;

      const playlistReapeatModeOn = ()  => this.song.id + 1 === this.songs.length && this.mode === 1;
      const playlistReapeatModeOff = ()  => this.song.id + 1 === this.songs.length && this.mode === 0;
      const randomModeOff = () => this.song.id + 1 !== this.songs.length && this.mode !== 2;
      const repeatModeOn = () => this.mode === 3;
      const randomModeOn = () => this.mode === 2;

      if (playlistReapeatModeOn()) {
        this.$router.push({
          path: this.songs[0].title,
        });
        clearInterval(this.timeInterval);
        this.refreshed = true;
        this.loaded = false;
      } else if (playlistReapeatModeOff()) {
        clearInterval(this.timeInterval);
        this.played = false;
        this.timeTic = 0;
      } else if (repeatModeOn()) {
        this.timeTic = 0;
      } else if (randomModeOff()) {
        this.$router.push({
          path: this.songs[this.song.id + 1].title,
        });
        this.resetParams();
      } else if (randomModeOn()) {
        this.$router.push({
          path: this.songs[this.randomInt(0, this.songs.length - 1)].title,
        });
        this.resetParams();
      }
    },
    changeSong(arg) {
      if (arg === "-" && this.song.id > 0) {
        //previous song
      this.$router.push({ path: this.songs[this.song.id - 1].title });
      this.resetParams();      
      }else if (arg === "+" && this.song.id + 1 < this.songs.length) {
        //next song
        this.$router.push({ path: this.songs[this.song.id + 1].title });
        this.resetParams();
      }
    },
    randomInt(min, max) {
      return min + Math.floor((max - min) * Math.random());
    },
    popupChange(value) {
      this.popup = value;
    },
    changeMode(num) {
      if (this.mode === num) {
        //uncheck mode
        this.mode = 0;
      } else {
        //check mode
        this.mode = num;
      }
    },
    loveReaction(num) {
      for(const song of this.songs){
        if (song.id === num) {
          song.heart = !song.heart;
          break;
        }
      }
    },
    playPause() {
      this.played = !this.played;
    },
    goToPlaylist() {
      clearInterval(this.timeInterval);
      this.$store.commit("changeSong", this.song.title);
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style>
#loading {
  width: 2rem;
  height: 2rem;
}
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
  border-radius: 50%;
  padding: 2px;
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
  width: 0%;
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
  width: 100%;
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
.purple-player-img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
  background-color: #60558f;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.purple-player-img:hover,
.big-purple-player-img:hover {
  background-color: #7f71bb;
  cursor: pointer;
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
.big-purple-player-img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
  background-color: #60558f;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.middle .player-img:hover {
  background-color: #60558f96;
  cursor: pointer;
}
.top-menu .right img:hover {
  cursor: pointer;
}
.player-img:hover {
  cursor: pointer;
  background-color: #5d39fd13;
}
.middle .inactive {
  background-color: #cecece;
}
.middle .inactive:hover {
  cursor: auto;
}
.middle img:hover {
  cursor: pointer;
}
.chosen {
  -webkit-box-shadow: 0px 0px 6px 5px #60558f;
  box-shadow: 0px 0px 6px 5px #60558f;
}
.volume-menu .middle:hover {
  -webkit-box-shadow: 0px 0px 6px 2px #60558f;
  box-shadow: 0px 0px 6px 2px #60558f;
  cursor: pointer;
}
.loved {
  -webkit-box-shadow: 0px 0px 6px 2px red;
  box-shadow: 0px 0px 6px 2px red;
}
#play {
  padding-left: 3px;
}
</style>


