<script setup lang="ts">

const { recipe } = defineProps(['recipe']) 
</script>

<template>
  <FormKit type="form" :actions="false">
    <FormKit type="multi-step" tab-style="progress" :allow-incomplete="false">
      <FormKit type="step" name="Category">
        <FormKit
          type="select"
          v-model="recipe.category"
          label="Category"
          placeholder="Select a category for the recipe"
          name="category"
          :options="[
            'Main Dishes',
            'Desserts',
            'Salads',
            'Soups',
            'Beverages',
            'Breakfast',
            'Vegetarian',
            'Quick & Easy',
            'Healthy',
            'Comfort Food',
          ]"
          validation="required"
        />
      </FormKit>

      <FormKit type="step" name="Description">
        <FormKit
          type="text"
          v-model="recipe.tittle"
          label="Give a name to your recipe:"
          validation="required|length:1"
          placeholder="Give a name to your recipe"
        />
        <FormKit
          v-model="recipe.cooking_time"
          type="number"
          label="Cook Time:"
          name="cook time"
          value="25"
          step="1"
          validation="required"
        />
        <FormKit
          type="number"
          label="Servings:"
          name="servings"
          value="2"
          step="1"
          validation="required"
          v-model="recipe.servings"
        />
        <FormKit
          type="text"
          label="Picture link:"
          name="link"
          validation="required"
          v-model="recipe.picture_link"
        />
        <FormKit
          type="text"
          label="Video link:"
          name="link"
          validation="required"
          v-model="recipe.video"
        />
        <FormKit
          v-model="recipe.visibility"
          type="radio"
          label="Visibility"
          help="Do you want to share your recipe with the community?"
          :options="['Public', 'Private']"
        />
      </FormKit>
    </FormKit>
  </FormKit>
</template>
