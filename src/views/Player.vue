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
    intervalCallback(){
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
<style src="./style.css">

</style>


