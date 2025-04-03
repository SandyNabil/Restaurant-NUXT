export default defineNuxtRouteMiddleware(async (to) => {
  const recipeId = to.params.id;

  // fetch data for the exact recipe
  const { data: recipe } = await useFetch(
    `https://dummyjson.com/recipes/${recipeId}`
  );

  // if from italian cuisine .. log it
  if (recipe.value?.cuisine === "Italian") {
    console.log(`User visited an Italian recipe: ${recipe.value.name}`);
  }
});
