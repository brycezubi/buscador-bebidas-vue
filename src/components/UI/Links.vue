<script setup>
  import {RouterLink} from 'vue-router'

  defineProps({
    to:{
      type:String
    }
  })

</script>
<template>
  <RouterLink :to="{name:to}" class="text-lg font-medium" active-class="text-orange-300">
     <slot></slot> 
  </RouterLink>
</template>