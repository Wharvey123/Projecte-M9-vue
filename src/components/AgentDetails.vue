<template>
  <div class="agent-details-container">
    <h2 class="title">{{ agent.displayName }}</h2>
    <div class="agent-info">
      <p class="description">{{ agent.description }}</p>
    </div>

    <h3 class="title">Habilidades</h3>
    <div class="abilities-container">
      <div v-for="(ability, index) in agent.abilities" :key="index" class="ability">
        <div class="ability-info">
          <h4 class="title">{{ ability.displayName }}</h4>
          <p class="description">{{ ability.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['agentUUID'],
  data() {
    return {
      agent: {}
    };
  },
  async mounted() {
    await this.fetchAgentDetails();
  },
  methods: {
    async fetchAgentDetails() {
      try {
        const response = await axios.get(`https://valorant-api.com/v1/agents/${this.agentUUID}`, {
          params: {
            language: 'es-ES'
          }
        });
        this.agent = response.data.data;
      } catch (error) {
        console.error('Error fetching agent details:', error);
      }
    }
  }
};
</script>

<style scoped>
.agent-details-container {
  max-width: 100%;
  padding: 20px;
}

.agent-info {
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.7);
}

.agent-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.abilities-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ability {
  flex-basis: 48%; /* Adjust as needed to fit two abilities per row */
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.7);
}

.ability-info {
  text-align: left;
}

/* Styling for titles */
.title {
  color: white;
  text-transform: uppercase;
}

/* Styling for descriptions */
.description {
  color: white;
  padding: 8px;
  border-radius: 5px;
  text-shadow: none; /* Remove text shadow */
}

@media (max-width: 768px) {
  .ability {
    flex-basis: 100%; /* Stack abilities in a single column on smaller screens */
  }
}
</style>
