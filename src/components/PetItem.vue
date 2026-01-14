<template>
  <div class="pet">
    <div class="row">
      <img :src="icon">
      <div class="column">
        <h2>
          <span v-if="nickname">{{ nickname }} - </span>{{ name }}
        </h2>
        <p>{{ description }}</p>
        <p><a :href="wiki">wiki</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PetItem",
  props: {
    id: { type: Number, required: true },
    nickname: { type: String, default: "" },
    caught: { type: Boolean, default: false },
  },
  data() {
    return {
      name: "",
      description: "",
      icon: "",
      wiki: "",
    };
  },
  async mounted() {
    // Get pet details via API
    const response = await axios.get(`https://api.guildwars2.com/v2/pets/${this.id}`);

    // Wiki page names don't have spaces, they have underscores
    const wikiName = response.data.name.replace(" ", "_");

    this.name = response.data.name;
    this.wiki = `https://wiki.guildwars2.com/wiki/${wikiName}`;
    this.description = response.data.description;
    this.icon = response.data.icon;
  },
};
</script>

<style scoped>
.row {
  display: flex;
}
.column {
  text-align: left;
}
img {
  margin: -32px;
  align-self: center;
}
</style>
