<script setup lang="ts">
  const props = defineProps(['foo'])
  console.log('props', props)
</script>

<template>
  <div>
    {{ props.foo }}
  </div>
</template>
