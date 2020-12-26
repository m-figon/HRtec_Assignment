<template>
  <div class="playlist-display">
    <img id="loading" v-if="!loaded" src="../imgs/loading.gif" />
    <share-popup
      v-bind:display="popup"
      v-on:displayChange="popupChange(false)"
    ></share-popup>

    <div v-if="loaded" class="playlist">
      <div class="top-part">
        <div class="left">
          <div class="left-img" v-bind:class="{ active: lastSong }" v-on:click.capture="goBack()">
            <img src="../imgs/arrow1.png"  />
          </div>
        </div>
        <div class="middle">
          <h1>Playlist</h1>
        </div>
        <div class="right"></div>
      </div>
      <div class="bottom-part">
        <div class="song" v-for="song in songs" v-bind:key="song.id">
          <div class="left-song">
            <div class="top-song">
              <h1>{{ song.duration }} | {{ song.author }}</h1>
            </div>
            <div class="bottom-song">
              <router-link v-bind:to="song.title">
                <h1>{{ song.title }}</h1>
              </router-link>
            </div>
          </div>
          <div class="right-song">
            <img
              id="share"
              src="../imgs/share.png"
              v-on:click="popupChange(true)"
            />
            <img
              id="favorite"
              src="../imgs/favorite.png"
              v-bind:class="{ loved: song.heart }"
              v-on:click="loveReaction(song.id)"
            />
          </div>
        </div>
      </div>
    </div>
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
      songs: null,
      lastSong: null,
      loaded: false,
      popup: false,
    };
  },
  created() {
    fetch("https://my-json-server.typicode.com/m-figon/demo/songs")
      .then((response) => response.json())
      .then((data) => {
        this.songs = data.slice();
        this.lastSong = this.$store.state.lastSong;
        this.loaded = true;
      });
  },
  methods: {
    goBack() {
      const newPath = this.$store.state.lastSong;
      if (newPath) {
        this.$router.push({ path: "/" + newPath }); //change url to last song opened in player
      }
    },
    popupChange(value) {
      this.popup = value;
    },
    loveReaction(num) {
      for (const song of this.songs) {
        if (song.id === num) {
          song.heart = !song.heart;
          break;
        }
      }
    },
  },
};
</script>
<style src="./style.css">

</style>


