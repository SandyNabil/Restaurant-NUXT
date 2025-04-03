<script setup>
import { useRoute } from "vue-router";
//log the italian middleware
definePageMeta({
    middleware: "log-italian",
});
const route = useRoute();
const recipeId = route.params.id;

// Fetch the specific recipe data
const { data: recipe, pending, error } = useFetch(
    `https://dummyjson.com/recipes/${recipeId}`
);

// Function to generate star rating
const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return { fullStars, halfStar, emptyStars };
};
</script>

<template>
    <div class="max-w-6xl mx-auto p-6">
        <!-- Loading state -->
        <div v-if="pending" class="text-center text-gray-600 text-4xl">Loading recipe...</div>

        <!-- Error state -->
        <div v-else-if="error" class="text-red-500 text-center text-4xl">Failed to load recipe.</div>

        <!-- No data state -->
        <div v-else-if="!recipe" class="text-center text-gray-500 text-4xl">Recipe not found.</div>

        <!-- Display recipe details -->
        <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
            <!-- Recipe image -->
            <img :src="recipe.image" :alt="recipe.name" class="w-full md:w-1/2 h-auto object-cover" />

            <div class="p-6 w-full md:w-2/3 overflow-y-auto">
                <h1 class="text-3xl font-bold text-orange-500 mb-4">{{ recipe.name }}</h1>
                <p class="text-gray-600 mb-4">{{ recipe.cuisine }} Cuisine</p>

                <!-- Additional details -->
                <p class="text-gray-600 mb-2"><strong>Preparation Time:</strong> {{ recipe.prepTimeMinutes }} minutes
                </p>
                <p class="text-gray-600 mb-2"><strong>Cooking Time:</strong> {{ recipe.cookTimeMinutes }} minutes</p>
                <p class="text-gray-600 mb-2"><strong>Servings:</strong> {{ recipe.servings }}</p>
                <p class="text-gray-600 mb-2"><strong>Difficulty:</strong> {{ recipe.difficulty }}</p>
                <p class="text-gray-600 mb-2"><strong>Calories per Serving:</strong> {{ recipe.caloriesPerServing }}</p>
                <p class="text-gray-600 mb-2"><strong>Rating:</strong>
                    <span v-for="n in getStarRating(recipe.rating).fullStars" :key="'full-' + n"
                        class="text-yellow-500">★</span>
                    <span v-if="getStarRating(recipe.rating).halfStar" class="text-yellow-500">★</span>
                    <span v-for="n in getStarRating(recipe.rating).emptyStars" :key="'empty-' + n"
                        class="text-gray-300">★</span>
                    ({{ recipe.rating }} / 5)
                </p>
                <p class="text-gray-600 mb-2">{{ recipe.reviewCount }} reviews</p>

                <!-- Ingredients -->
                <h2 class="text-xl font-semibold mb-2">Ingredients:</h2>
                <ul class="list-disc list-inside text-gray-700 mb-4">
                    <li v-for="ingredient in recipe.ingredients" :key="ingredient">
                        {{ ingredient }}
                    </li>
                </ul>

                <!-- Instructions -->
                <h2 class="text-xl font-semibold mb-2">Instructions:</h2>
                <p class="text-gray-700 whitespace-pre-line">{{ recipe.instructions.join('\n') }}</p>

                <!-- Back button -->
                <NuxtLink to="/"
                    class="mt-6 inline-block bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                    Back to Recipes
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
