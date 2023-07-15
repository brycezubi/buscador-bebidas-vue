<script setup>
import { useRecetaStore } from "../stores/recetas";
import Receta from "../components/Receta.vue";

const receta = useRecetaStore();

defineProps({
  titulo: {
    type: String,
  },
});
</script>
<template>
  <h1 class="titulo">
    {{ titulo }}
  </h1>
  <section class="grilla my-10">
    <h2 v-if="receta.hayRecetas" class="subtitulo">Busca tu recetas</h2>
    <Receta
      v-else
      v-for="bebida in receta.recetas"
      :key="bebida.idDrink"
      v-bind:bebida="bebida"
    />
  </section>
</template>
