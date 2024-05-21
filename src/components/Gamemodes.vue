<template>
  <div>
    <div class="gamemodes-container">
      <div v-for="gamemode in filteredGamemodes" :key="gamemode.uuid" class="gamemode-item">
        <div class="icon-container">
          <img class="icon" :src="gamemode.displayIcon" alt="Gamemode Icon">
        </div>
        <h3 class="title">{{ gamemode.displayName }}</h3>
        <p>{{ gamemode.description }}</p>
        <p class="duration">DURATION: {{ gamemode.duration }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      gamemodes: []
    };
  },
  computed: {
    filteredGamemodes() {
      return this.gamemodes.filter(gamemode => !["Onboarding", "The Range"].includes(gamemode.displayName));
    }
  },
  mounted() {
    this.fetchGamemodes();
  },
  methods: {
    async fetchGamemodes() {
      try {
        const response = await axios.get('https://valorant-api.com/v1/gamemodes', {
          params: {
            language: 'es-ES'
          }
        });
        this.gamemodes = response.data.data
      } catch (error) {
        console.error('Error fetching gamemodes:', error);
      }
    }
  }
};
</script>

<style scoped>
.gamemodes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.gamemode-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 250px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.title {
  color: white;
  text-transform: uppercase;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.icon {
  width: 100px;
  height: 100px;
}

.duration {
  color: white;
  text-transform: uppercase;
}
</style>
