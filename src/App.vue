<template>
  <div id="app">
    <!-- Background Image -->
    <div class="background">
      <img src="https://i.redd.it/oxdqvgeel7e81.jpg" alt="Background Image">
    </div>

    <!-- Header Section -->
    <header class="header" v-if="!isLandingPage">
      <h1>Contenido de Valorant</h1>
      <link href="https://fonts.cdnfonts.com/css/valorant" rel="stylesheet">
      <nav>
        <router-link to="/agents">Agentes</router-link>
        <router-link to="/weapons">Armas</router-link>
        <router-link to="/maps">Mapas</router-link>
        <router-link to="/gamemodes">Modos</router-link>
      </nav>
    </header>

    <!-- Main Content Section -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLandingPage: false
    };
  },
  created() {
    // Check initial route
    this.checkIfLandingPage();

    // Listen to route changes
    this.$router.afterEach(() => {
      this.checkIfLandingPage();
    });
  },
  methods: {
    checkIfLandingPage() {
      this.isLandingPage = this.$route.path === '/';
    }
  }
};
</script>

<style scoped>
body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header {
  position: relative;
  z-index: 1;
  background-color: rgba(40, 44, 52, 0.8);
  backdrop-filter: blur(3px);
  padding: 20px;
  color: white;
  text-align: center;
}

nav {
  margin-top: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px;
  font-family: 'VALORANT', sans-serif;
  font-size: 20px;
  margin-top: 0;
}

nav a:hover {
  background-color: #61dafb;
}

main {
  position: relative;
  z-index: 1;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

h1 {
  font-size: 50px;
  margin-bottom: 10px;
  text-shadow: 3px 3px 5px black;
  font-family: 'VALORANT', sans-serif;
}

@media (max-width: 768px) {
  nav a {
    font-size: 16px;
    padding: 8px;
  }
}
</style>
