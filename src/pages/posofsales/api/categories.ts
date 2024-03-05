import { ref } from "vue"

  const categories = ref([{
    id: 1,
    libelet: 'coffee',
    categorie: 'coffee',
    sousCategorie: 'drink',
    prix: '10DH',
    photopath: "src/assets/pos/logo.png",
  
  }, {
    id: 5,
    libelet: 'All',
    categorie: 'All',
    sousCategorie: 'drink',
    prix: '10DH',
    photopath: "src/assets/pos/logo.png",
  
  },{
    id: 3,
    libelet: 'Pizza',
    categorie: 'Pizza',
    sousCategorie: 'drink',
    prix: '20DH',
    photopath: "src/assets/pos/logo.png",
  
  }, {
    id: 4,
    libelet: 'limonade',
    categorie: 'limonade',
    sousCategorie: 'drink',
    prix: '10DH',
    photopath: 'src/assets/pos/1.png',
  
  },]);
  export default categories
     