<template>
  <div class="playlist-display">
    <img id="loading" v-if="!loaded" src="../imgs/loading.gif" />

    <div v-if="loaded" class="playlist">
      <div class="top-part">
        <div class="left">
          <div class="left-img" v-bind:class="{ active: lastSong }">
            <img src="../imgs/arrow1.png" v-on:click="goBack()" />
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
            <img id="share" src="../imgs/share.png" />
            <img id="favorite" src="../imgs/favorite.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "../store";

export default {
  store,
  data() {
    return {
      songs: null,
      lastSong: null,
      loaded: false,
    };
  },
  created() {
    console.log("created!");
    fetch("https://my-json-server.typicode.com/m-figon/demo/songs")
      .then((response) => response.json())
      .then((data) => {
        this.songs = data.slice();
        console.log(this.songs);
        this.lastSong = this.$store.state.lastSong;
        this.loaded = true;
      });
  },
  methods: {
    goBack() {
      let newPath = this.$store.state.lastSong;
      if (newPath) {
        this.$router.push({ path: "/" + newPath });
      }
    },
  },
};
</script>
<style>
#loading {
  width: 2rem;
  height: 2rem;
}
.middle h1 {
  font-size: 18px;
  color: #60558f;
  font-weight: 700;
  font-family: "Rambla";
  text-align: center;
}
.left-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
  background-color: #cecece;
}
.left-img img {
  width: 16px;
  height: 11px;
}
.playlist-display {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.playlist {
  width: 360px;
  height: 480px;
  border-radius: 30px;
  background-color: #f3f4f8;
  display: flex;
  flex-direction: column;
  padding: 0 3%;
}
.top-part {
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottom-part {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow-y: scroll;
  height: 18.5rem;
}
::-webkit-scrollbar {
  width: 7px;
  border-radius: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(209, 209, 209);
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #888;
}
.song {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d3d5de;
}
.left-song,
.right-song {
  display: flex;
  width: 50%;
  align-items: center;
}
.left-song {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.right-song {
  justify-content: flex-end;
}
.left,
.middle,
.right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 100%;
}
.left {
  justify-content: flex-start;
}
#share {
  width: 14px;
  height: 12px;
  margin: 0 10px;
  border-radius: 4px;
}
#favorite {
  width: 12px;
  height: 12px;
  margin-right: 5px;
}
#share,
#favorite {
  cursor: pointer;
}
.top-song {
  height: 10px;
}
.top-song h1 {
  font-size: 12px;
  color: #78747f;
  font-weight: 400;
  font-family: "Rambla";
}
.bottom-song h1 {
  font-size: 16px;
  color: #2f1a4b;
  font-weight: 400;
  font-family: "Rambla";
}
a {
  text-decoration: none;
}
.active {
  background-color: #ffffff;
}
.active:hover {
  cursor: pointer;
}
</style>


