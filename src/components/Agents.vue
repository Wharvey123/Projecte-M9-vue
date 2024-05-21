<template>
  <div>
    <div class="agents-container">
      <button v-for="agent in playableAgents" :key="agent.uuid" @click="navigateToAgent(agent.uuid)" class="agent-button">
        <div class="agent-image-container">
          <img :src="agent.displayIcon" alt="Agent Icon" class="agent-icon" />
          <div class="agent-name-overlay">{{ agent.displayName }}</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      agents: []
    };
  },
  computed: {
    playableAgents() {
      return this.agents.filter(agent => agent.isPlayableCharacter === true);
    }
  },
  mounted() {
    this.fetchAgents();
  },
  methods: {
    async fetchAgents() {
      try {
        const response = await axios.get('https://valorant-api.com/v1/agents', {
          params: {
            language: 'es-ES'
          }
        });
        this.agents = response.data.data;
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    },
    navigateToAgent(agentUUID) {
      // Programmatically navigate to the agent's page using Vue Router
      this.$router.push(`/agent/${agentUUID}`);
    }
  }
};
</script>

<style scoped>
.agents-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.agent-button {
  margin: 10px;
  padding: 0; /* Remove padding to ensure image fills the button */
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  width: 200px;
  height: 200px; /* Set button height to match width for a square button */
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.agent-button:hover {
  opacity: 0.7; /* Reduce opacity on hover */
  transform: scale(0.9); /* Scale down slightly on hover */
}

.agent-image-container {
  position: relative;
  width: 100%;
  height: 100%; /* Fill the container's height */
}

.agent-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.agent-name-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 14px; /* Set text size to 14px */
  pointer-events: none; /* Ensure the overlay does not block clicks */
}

</style>
