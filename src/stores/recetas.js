import { computed, ref } from 'vue'
import { defineStore} from 'pinia'
import APIService from '../services/APIService'
import {useModalStore} from '../stores/modal'

export const useRecetaStore = defineStore('recetas',()=>{

  const recetas = ref([])
  const receta = ref({})
  const modal = useModalStore()

  async function obtenerRecetas(busqueda){

    try {
      const {data:{drinks}}= await APIService.obtenerRecetas(busqueda)
      recetas.value = drinks
    } catch (error) {
      console.log(error)
    }
  }

  async function obtenerReceta(id){
    try {
      const {data : {drinks}} =  await APIService.obtenerRecetaDetalle(id)
      receta.value =  drinks[0]
      modal.openModal()
    } catch (error) {
      console.log(error)
    }
  }

  const hayRecetas = computed(()=>recetas.value.length === 0)

  return{
    hayRecetas,
    obtenerRecetas,
    obtenerReceta,
    recetas,
    receta
  }
})