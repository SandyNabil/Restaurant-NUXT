<script setup>
import { ref, computed } from 'vue';
const { data: recipes, pending, error } = useRecipes();

//save selected tag in const
const selectedTag = ref("All");
//save selected sort in const
const selectedSort = ref("name");

//safe access to recipes array
const safeRecipes = computed(() => {
    return recipes?.value?.recipes || [];
});

//getting all unique tags
const tags = computed(() => {
    //flatmap to get all tags from all recipes
    const allTags = safeRecipes.value.flatMap((recipe) => recipe?.tags || []);
    //set to get unique tags (no duplicates)
    return ["All", ...new Set(allTags)];
});

//filter recipes based on selected tag
const filteredRecipes = computed(() => {
    if (selectedTag.value === "All") {
        return safeRecipes.value;
    }
    return safeRecipes.value.filter((recipe) =>
        recipe?.tags?.includes(selectedTag.value)
    );
});

//sort recipes based on selected sort
const sortedRecipes = computed(() => {
    return [...filteredRecipes.value].sort((a, b) => {
        if (selectedSort.value === "name") {
            return (a?.name || "").localeCompare(b?.name || "");
        } else if (selectedSort.value === "rating") {
            return (b?.rating || 0) - (a?.rating || 0);
        } else if (selectedSort.value === "cookingTime") {
            return (a?.cookingTime || 0) - (b?.cookingTime || 0);
        }
        return 0;
    });
});

const currentPage = ref(1);
const recipesPerPage = 5;

const paginatedRecipes = computed(() => {
    const start = (currentPage.value - 1) * recipesPerPage;
    const end = start + recipesPerPage;
    return sortedRecipes.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(safeRecipes.value.length / recipesPerPage);
});

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};
</script>

<template>
    <div class="max-w-4xl mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6 text-center text-orange-500">Recipes</h1>

        <!-- Filter dropdown -->
        <div class=" flex align-middle justify-center gap-4">
            <div class="flex justify-center mb-6">
                <label for="tag-filter" class="mr-2 text-md font-medium text-gray-700 self-center">Filter by
                    tag:</label>
                <select id="tag-filter" v-model="selectedTag"
                    class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700">
                    <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
                </select>
            </div>

            <!-- Sort dropdown -->
            <div class="flex justify-center mb-6">
                <label for="sort-filter" class="mr-2 text-md font-medium text-gray-700 self-center">Sort by:</label>
                <select id="sort-filter" v-model="selectedSort"
                    class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700">
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                    <option value="cookingTime">Cooking Time</option>
                </select>
            </div>
        </div>

        <!-- Loading state-->
        <div v-if="pending" class="text-center text-gray-600 text-4xl">Loading recipes...</div>

        <!-- Error state-->
        <div v-else-if="error" class="text-red-500 text-center text-4xl">Failed to load recipes.</div>

        <!-- No data state-->
        <div v-else-if="safeRecipes.length === 0" class="text-center text-gray-500 text-4xl">
            No recipes found.
        </div>

        <!-- Recipes -->
        <div v-else class="space-y-4">
            <NuxtLink v-for="recipe in paginatedRecipes" :key="recipe.id" :to="`/recipe/${recipe.id}`"
                class="block bg-white shadow-md rounded-lg overflow-hidden flex items-center p-4 gap-4 hover:bg-gray-100">

                <!-- Recipe image-->
                <img :src="recipe.image" :alt="recipe.name" class="w-32 h-32 object-cover rounded-md" />

                <!-- Recipe Details-->
                <div class="flex-1">
                    <h3 class="text-xl font-semibold text-gray-900">{{ recipe.name }}</h3>
                    <p class="text-gray-600 text-md">{{ recipe.cuisine }} Cuisine</p>
                </div>
            </NuxtLink>
        </div>

        <!-- Pagination buttons -->
        <div class="flex justify-center mt-6 space-x-2">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-4 py-2 rounded-full text-sm font-medium bg-gray-900 text-white cursor-pointer">Previous</button>

            <span v-for="page in totalPages" :key="page" @click="currentPage = page"
                :class="['px-4 py-2 rounded-full text-sm font-medium cursor-pointer', currentPage === page ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700']">
                {{ page }}
            </span>

            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-full text-sm font-medium bg-gray-900 text-white cursor-pointer">Next</button>
        </div>
    </div>
</template>
