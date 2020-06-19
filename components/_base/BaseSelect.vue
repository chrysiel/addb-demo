<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      v-bind="$attrs"
      :value="value"
      :class="fieldClass"
      v-on="listeners"
      @change="updateValue"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>>
