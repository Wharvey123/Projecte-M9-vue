<template>
  <div>
    <h1>Valorant Content</h1>
    <ul>
      <li v-for="agent in agents" :key="agent.uuid">
        <h3>{{ agent.displayName }}</h3>
        <p>{{ agent.description }}</p>
        <img :src="agent.displayIcon" alt="Icono de Agente" />
      </li>
    </ul>
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
  mounted() {
    this.fetchAgents();
  },
  methods: {
    async fetchAgents() {
      try {
        const response = await axios.get('https://valorant-api.com/v1/agents');
        this.agents = response.data.data;
      } catch (error) {
        console.error('Error al obtener agentes:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales con Bootstrap */
</style>
