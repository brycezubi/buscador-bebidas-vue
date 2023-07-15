import { onMounted, ref } from "vue";
import APIService from '../services/APIService'

export default function useCategorias(){

  const categorias = ref([])

  const getDataCategorias = async()=>{
    const {data:{drinks}} = await APIService.obtenerCategorias()
    categorias.value = drinks
  }

  onMounted(() => {
    getDataCategorias()
  })

  return {
    categorias
  }

}