<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="value"
      :class="fieldClass"
      v-on="listeners"
      @input="updateValue"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin]
}
</script>

<style scoped></style>>
