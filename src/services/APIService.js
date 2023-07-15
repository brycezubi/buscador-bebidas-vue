import api from '../lib/axios'

export default{
  obtenerCategorias(){
    return api.get('/list.php?c=list')
  },
  obtenerRecetas({ingrediente,categoria}){
    return api.get(`/filter.php?i=${ingrediente}&c=${categoria}`)
  },
  obtenerRecetaDetalle(id){
    return api.get(`/lookup.php?i=${id}`)
  }
}
