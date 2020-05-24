<template>
  <div id="app">
    <h1>Pet Tracker</h1>
    <Pet v-for="pet in pets" :id="pet" :key="pet"></Pet>
  </div>
</template>

<script>
import Pet from './components/Pet.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Pet
  },
  data() {
    return {
      pets: []
    }
  },
  mounted() {
    console.log("helllo")
    axios.get('https://api.guildwars2.com/v2/pets')
      .then(response => this.pets = response.data)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
