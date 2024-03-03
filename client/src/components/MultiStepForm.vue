<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const { recipe: propRecipe } = defineProps(['recipe']);

const emit = defineEmits(['updateRecipe']);

const localRecipe = ref(propRecipe);

watch(localRecipe, (newRecipe) => {
  emit('updateRecipe', newRecipe);
});
</script>

<template>
  <FormKit type="form" :actions="false">
    <FormKit type="multi-step" tab-style="progress" :allow-incomplete="false">
      <FormKit type="step" name="Category">
        <FormKit
          type="select"
          v-model="localRecipe.category"
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
          v-model="localRecipe.tittle"
          label="Give a name to your recipe:"
          validation="required|length:1"
          placeholder="Give a name to your recipe"
        />
        <FormKit
          type="textarea"
          v-model="localRecipe.description"
          label="Give a short description to your recipe:"
          validation="required|length:1"
          placeholder="What makes this recipe spesial?"
        />
        <FormKit
          v-model="localRecipe.cooking_time"
          type="number"
          label="Cook Time (min):"
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
          v-model="localRecipe.servings"
        />
        <FormKit
          type="text"
          label="Picture link:"
          name="link"
          validation="required"
          v-model="localRecipe.picture_link"
        />
        <FormKit
          type="text"
          label="Video link:"
          name="link"
          validation="required"
          v-model="localRecipe.video"
        />
        <FormKit
          v-model="localRecipe.visibility"
          validation="required"
          type="radio"
          label="Visibility"
          help="Do you want to share your recipe with the community?"
          :options="['Public', 'Private']"
        />
      </FormKit>
    </FormKit>
  </FormKit>
</template>
