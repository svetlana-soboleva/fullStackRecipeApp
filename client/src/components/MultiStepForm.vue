<template>
  <FormKit type="form" :actions="false">
    <FormKit type="multi-step" tab-style="progress" :allow-incomplete="false">
      <FormKit type="step" name="Category">
        <FormKit
          type="select"
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
          label="Name:"
          validation="required|length:1"
          placeholder="Give a name to your recipe"
        />
        <FormKit
          type="textarea"
          label="Description:"
          validation="required|length:1"
          placeholder="Describe the recipe"
        />
        <FormKit type="number" label="Cook Time:" name="cook time" value="25" step="1" />
        <FormKit type="number" label="Servings:" name="servings" value="2" step="1" />
        <FormKit
          type="radio"
          label="Visibility"
          help="Do you want to share your recipe with the community?"
          :options="['Public', 'Private']"
        />
      </FormKit>

      <FormKit type="step" name="Instructions">
        <p>Steps</p>
        <br />
        <FormKit type="list" :value="[{}]" dynamic #default="{ items, node, value }">
          <FormKit type="group" v-for="(item, index) in items" :key="item" :index="index">
            <div class="group">
              <FormKit type="text" name="step" label="Step:" placeholder="Make a dough" />

              <FormKit type="list" :value="[{}]" dynamic #default="{ items, node, value }">
                <FormKit type="group" v-for="(item, index) in items" :key="item" :index="index">
                  <div class="group">
                    <FormKit
                      type="text"
                      name="name"
                      label="Ingredient name"
                      placeholder="Ingredient 1"
                    />

                    <FormKit type="number" name="amount" label="Amount" />
                    <FormKit type="text" name="unit" label="Unit" />

                    <button
                      type="button"
                      @click="() => node.input(value.filter((_, i) => i !== index))"
                      class="bg-red-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                    >
                      - Remove ingredient
                    </button>
                  </div>
                </FormKit>

                <button
                  type="button"
                  @click="() => node.input(value.concat({}))"
                  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 m-2 border border-gray-400 rounded shadow"
                >
                  + Add ingredient
                </button>

                <pre wrap>{{ value }}</pre>
              </FormKit>
              <FormKit type="textarea" name="instruction" label="Instructions:" />

              <button
                type="button"
           
                @click="() => node.input(value.filter((_, i) => i !== index))"
                class="bg-red-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
              >
                - Remove Step
              </button>
            </div>
          </FormKit>

          <button
            type="button"
            @click="() => node.input(value.concat({}))"
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 m-2 border border-gray-400 rounded shadow"
          >
            + Add Step
          </button>

          <pre wrap>{{ value }}</pre>
        </FormKit>

        <template #stepNext>
          <FormKit type="submit" />
        </template>
      </FormKit>
    </FormKit>
  </FormKit>
</template>


