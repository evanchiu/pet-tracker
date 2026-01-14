<template>
  <div id="app">
    <h1>
      Pet Tracker<span v-if="username"> - {{ username }}</span><span v-if="filterList"> - {{ lists[filterList] }}</span>
    </h1>
    <span
      v-for="(description, listType) in lists"
      :key="listType"
    >
      <input
        :id="listType"
        v-model="filterList"
        type="radio"
        :value="listType"
      >
      <label :for="listType">{{ description }} ({{ pets[listType].length }})</label>
    </span>
    <PetItem
      v-for="pet in pets[filterList]"
      :id="pet.id"
      :key="pet.id"
      :nickname="pet.nickname"
      :caught="pet.caught || !!pet.nickname"
    />
  </div>
</template>

<script>
import PetItem from "./components/PetItem.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    PetItem,
  },
  data() {
    return {
      lists: {
        all: "All Pets",
        named: "Nicknamed Pets",
        unnamed: "Caught, not nicknamed",
        uncaught: "Uncaught",
      },
      username: "",
      pets: {
        all: [],
        named: [],
        unnamed: [],
        uncaught: [],
      },
      filterList: "all",
    };
  },
  async mounted() {
    // Get list of all pets and user data
    const petIds = await axios.get("https://api.guildwars2.com/v2/pets");
    const userData = await axios.get("/data/princess-cuddles.json");

    // Set global fields
    this.username = userData.data.username;

    // For each pet
    petIds.data.forEach((petId) => {
      // If user data is available for this pet, use it
      if (userData.data.pets[petId]) {
        const pet = userData.data.pets[petId];
        this.pets.all.push(pet);
        if (pet.nickname) {
          this.pets.named.push(pet);
        } else if (pet.caught) {
          this.pets.unnamed.push(pet);
        } else {
          this.pets.uncaught.push(pet);
        }
      } else {
        // If not user data is available, add it to all and uncaught
        this.pets.all.push({ id: petId });
        this.pets.uncaught.push({ id: petId });
      }
    });
  },
};
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
label {
  margin-right: 2em;
}
</style>
