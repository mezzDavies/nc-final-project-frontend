import axios from "axios";
import key from "../spoonKey";

export default function GetRecipe() {
  return axios
    .get(`https://api.spoonacular.com/recipes/random/?apiKey=${key}`)
    .then((res) => res.data);
}
