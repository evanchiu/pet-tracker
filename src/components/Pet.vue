<template>
  <div class="pet">
    <div class="row">
      <img :src="icon" />
      <div class="column">
        <h2>{{ name }}</h2>
        <p>{{ description }}</p>
        <p><a :href="wiki">wiki</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Pet",
  props: {
    id: Number,
  },
  data() {
    return {
      name: "",
      description: "",
      icon: "",
      wiki: "",
    };
  },
  mounted() {
    axios
      .get(`https://api.guildwars2.com/v2/pets/${this.id}`)
      .then((response) => {
        this.name = response.data.name;
        this.wiki = `https://wiki.guildwars2.com/wiki/${this.name.replace(' ', '_')}`;
        this.description = response.data.description;
        this.icon = response.data.icon;
      });
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
}
</style>
