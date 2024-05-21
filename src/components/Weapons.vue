<template>
  <div>
    <div class="weapons-container">
      <div v-for="weapon in weapons" :key="weapon.uuid" class="weapon-card" @click="selectWeapon(weapon)">
        <div class="card-content">
          <img :src="weapon.displayIcon" alt="Weapon Icon" class="weapon-icon" />
          <div class="text-overlay">
            <h3 class="title">{{ weapon.displayName }}</h3>
            <p>{{ weapon.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedWeapon" class="weapon-details-overlay" @click="closeWeaponDetails">
      <div class="weapon-details" @click.stop>
        <h3>{{ selectedWeapon.displayName }}</h3>
        <img :src="selectedWeapon.displayIcon" alt="Weapon Image" class="weapon-details-icon" />
        <p>{{ selectedWeapon.description }}</p>
        <div class="stats-container">
          <div v-for="(value, key) in formattedWeaponStats" :key="key" class="stat-item">
            <strong>{{ key }}:</strong> {{ value }}
          </div>
        </div>
        <button @click="closeWeaponDetails">Tancar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      weapons: [],
      selectedWeapon: null,
    };
  },
  mounted() {
    this.fetchWeapons();
  },
  methods: {
    async fetchWeapons() {
      try {
        const response = await axios.get('https://valorant-api.com/v1/weapons', {
          params: {
            language: 'es-ES',
          },
        });
        this.weapons = response.data.data;
      } catch (error) {
        console.error('Error fetching weapons:', error);
      }
    },
    selectWeapon(weapon) {
      this.selectedWeapon = weapon;
    },
    closeWeaponDetails() {
      this.selectedWeapon = null;
    },
    formatStatKey(key) {
      switch (key) {
        case 'fireRate':
          return 'Fire Rate';
        case 'magazineSize':
          return 'Magazine Size';
        case 'runSpeedMultiplier':
          return 'Run Speed Multiplier';
        case 'equipTimeSeconds':
          return 'Equip Time Seconds';
        case 'reloadTimeSeconds':
          return 'Reload Time Seconds';
        case 'firstBulletAccuracy':
          return 'First Bullet Accuracy';
        default:
          return key;
      }
    }
  },
  computed: {
    formattedWeaponStats() {
      if (!this.selectedWeapon || !this.selectedWeapon.weaponStats) return {};
      const statsToDisplay = [
        'fireRate',
        'magazineSize',
        'runSpeedMultiplier',
        'equipTimeSeconds',
        'reloadTimeSeconds',
        'firstBulletAccuracy'
      ];
      return Object.fromEntries(
          Object.entries(this.selectedWeapon.weaponStats)
              .filter(([key]) => statsToDisplay.includes(key))
              .map(([key, value]) => [this.formatStatKey(key), value])
      );
    }
  }
};
</script>

<style scoped>
.weapons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.weapon-card {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  width: 250px;
  height: 120px;
  overflow: hidden;
  cursor: pointer;
}

.card-content {
  position: relative;
  height: 100%;
}

.weapon-icon {
  width: auto;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.text-overlay h3,
.text-overlay p {
  margin: 0;
}

.weapon-card:hover .text-overlay {
  opacity: 1;
}

.weapon-details-overlay {
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

.weapon-details {
  background: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  max-width: 500px;
  width: 90%;
  color: #fff;
  animation: fadeIn 0.3s ease;
}

.weapon-details h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.weapon-details-icon {
  width: 60%;
  max-height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
  display: block;
  margin: 0 auto;
}

.weapon-details p {
  font-size: 16px;
  margin-bottom: 10px;
}

.stats-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
}

.stat-item {
  flex: 1 1 45%;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  color: #61dafb;
  font-weight: bold;
  transition: background 0.3s ease;
}

.stat-item:hover {
  background: rgba(97, 218, 251, 0.2);
}

.weapon-details button {
  background: #61dafb;
  border: none;
  padding: 10px 20px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.weapon-details button:hover {
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
