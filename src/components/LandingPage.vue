<template>
  <div class="landing-page">
    <!-- Background Image -->
    <div class="background">
      <img src="https://cdna.artstation.com/p/assets/images/images/045/343/136/original/agus-sw-yoru-wips.gif?1642508031" alt="Background GIF">
    </div>
    <!-- Main Content -->
    <div class="content">
      <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet">
      <link href="https://fonts.cdnfonts.com/css/valorant" rel="stylesheet">
      <h1>Bienvenido a Valorant</h1>
      <p>El mejor shooter tactico</p>
      <div class="buttons">
        <router-link to="/agents" class="button">Explora Agentes</router-link>
        <router-link to="/weapons" class="button">Descubre Armas</router-link>
        <router-link to="/maps" class="button">Explora Mapas</router-link>
        <router-link to="/gamemodes" class="button">Juega Modos</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  height: 100vh;
  color: #ffffff;
  font-family: 'VALORANT', sans-serif;
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

.content {
  text-align: center;
  z-index: 1;
}

h1 {
  font-size: 85px;
  margin-bottom: 10px;
  text-shadow: 3px 3px 5px black;
}

p {
  font-size: 40px;
  margin-top: 0;
  text-shadow: 2px 2px 3px black;
}

.buttons {
  margin-top: 20px;
}

.button {
  display: inline-block;
  margin: 10px;
  padding: 15px 30px;
  font-size: 20px;
  color: #ffffff;
  background-color: #000000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-family: 'Fjalla One', sans-serif;
  text-decoration: none;
}

.button:hover {
  background-color: #ff0000;
  color: #000000;
}
</style>
