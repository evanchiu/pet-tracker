#!/usr/bin/env node

const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function makeNewJson(username) {
  const baseDir = path.join("public", "data");
  if (!fs.existsSync(baseDir)) {
    console.error(`Error, base directory, ${baseDir}`);
  } else {
    const pets = await getPets();
    const data = {
      username,
      pets,
    };
    const filepath = path.join(baseDir, toKebabCase(username) + ".json");
    fs.writeFileSync(filepath, JSON.stringify(data, undefined, 2));
    console.log(`Successfully wrote empty pet json in ${filepath}`);
  }
}

async function getPets() {
  const petResponse = await axios.get("https://api.guildwars2.com/v2/pets");
  const petIds = petResponse.data;
  const petPromises = petIds.map((id) =>
    axios.get(`https://api.guildwars2.com/v2/pets/${id}`)
  );
  const petResponses = await Promise.all(petPromises);
  const petArray = petResponses.map((petResponse) => {
    return {
      id: petResponse.data.id,
      name: petResponse.data.name,
      caught: false,
      nickname: "",
    };
  });
  const pets = {};
  petArray.forEach((pet) => (pets[pet.id] = pet));
  return pets;
}

// Source https://bit.ly/2neWfJ2
const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

if (require.main === module) {
  if (process.argv.length === 3) {
    makeNewJson(process.argv[2]);
  } else {
    console.log("Usage: " + process.argv[1] + " <username>");
  }
}
