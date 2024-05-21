<template>
  <div>
    <div class="maps-container">
      <div v-for="map in maps" :key="map.uuid" class="map-card" @click="selectMap(map)">
        <h3 class="title">{{ map.displayName }}</h3>
        <p>{{ map.description }}</p>
        <img :src="map.displayIcon" alt="Map Icon" />
      </div>
    </div>

    <div v-if="selectedMap" class="map-fullscreen-overlay" @click="closeMap">
      <div class="map-fullscreen" @click.stop>
        <div class="header-container">
          <h3 class="fullscreen-title">{{ selectedMap.displayName }}</h3>
          <button @click="closeMap" class="close-button">Tancar</button>
        </div>
        <img :src="selectedMap.splash" alt="Map Fullscreen" class="map-fullscreen-image" />
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      maps: [],
      selectedMap: null,
    };
  },
  mounted() {
    this.fetchMaps();
  },
  methods: {
    async fetchMaps() {
      try {
        const response = await axios.get('https://valorant-api.com/v1/maps', {
          params: {
            language: 'es-ES'
          }
        });
        this.maps = response.data.data.filter(map => map.displayName !== 'Campo de tiro');
      } catch (error) {
        console.error('Error fetching maps:', error);
      }
    },
    selectMap(map) {
      this.selectedMap = map;
    },
    closeMap() {
      this.selectedMap = null;
    }
  }
};
</script>

<style scoped>
.maps-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.map-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 250px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
}

.map-card img {
  max-width: 100px;
  margin: 10px auto;
}

.title {
  color: white;
  text-transform: uppercase;
}

.map-fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-fullscreen {
  position: relative;
  background: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 90%;
  max-height: 90%;
  color: #fff;
  animation: fadeIn 0.3s ease;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* Adjust spacing between title and image */
}

.fullscreen-title {
  font-size: 36px;
  text-transform: uppercase;
  margin: 0; /* Reset margin */
}

.map-fullscreen-image {
  width: 100%;
  height: auto;
  max-height: 80vh;
  border-radius: 10px;
  margin-bottom: 10px;
}

.close-button {
  position: absolute;
  top: 10px; /* Adjust as needed */
  right: 10px; /* Adjust as needed */
  background: #61dafb;
  border: none;
  padding: 10px 20px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 1; /* Ensure the button is above the fullscreen map */
}

.close-button:hover {
  background: #21a1f1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
