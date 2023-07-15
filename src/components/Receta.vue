<script setup>
  import {useRecetaStore} from '../stores/recetas'

  const receta= useRecetaStore()

  defineProps({
    bebida:{
      type:Object,
      required:true
    }
  })
</script>

<template>
  <article
      class="max-w-sm bg-white pb-5 rounded-lg overflow-hidden shadow-md"
    >
      <img
        :src="bebida.strDrinkThumb"
        :alt="'trago-' + bebida.strDrink"
        class="hover:scale-110 transition-transform hover:rotate-1"
      />
      <div class="font-medium pt-5">
        <h2 class="text-center">{{ bebida.strDrink }}</h2>
        <div class="flex justify-center mt-4">
          <button @click="receta.obtenerReceta(bebida.idDrink)" class="btn">Ver Receta</button>
        </div>
      </div>
    </article>
</template>