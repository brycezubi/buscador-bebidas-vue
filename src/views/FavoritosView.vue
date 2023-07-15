<script setup>
import {useFavoritoStore} from '../stores/favoritos'
import Receta from '../components/Receta.vue'

const favoritos =  useFavoritoStore()
defineProps({
  titulo:{
    type:String
  }
})
</script>

<template>
  <h1 class="titulo">{{titulo}}</h1>
  <section class="grilla my-10">
    <h2 v-if="favoritos.hayFavoritos" class="subtitulo">No tenemos aún recetas favoritas</h2>
    <Receta v-else
      v-for="bebida in favoritos.favoritos"
      :key="bebida.idDrink"
      v-bind:bebida="bebida"
    />
  </section>
</template>