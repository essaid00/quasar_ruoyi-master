<template>

   <q-page class="cc-admin row">
    <div class="col-2 bg-white shadow-2 q-pa-md q-ma-sm">
      <q-btn class=" q-mb-md"   color="secondary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    modifier une table     </q-btn>

    <q-btn   class=" q-mb-md"  color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    modifier une table     </q-btn>
    <q-btn   class=" q-mb-md"  color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    modifier une table     </q-btn>
    <q-btn  class=" q-mb-md"   color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    modifier une table     </q-btn>
    <q-btn  class=" q-mb-md"   color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    modifier une table     </q-btn>
    <q-btn  class=" q-mb-md"   color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    modifier une table     </q-btn>

    </div>
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
kk
    </div>
    <div class="col-2 bg-white shadow-2 q-pa-md q-ma-sm">
      <div
      class="col-lg-2 col-md-2 col-xs-4 text-center bg-white shadow-2 q-mx-sm q-mb-md"
      v-for="(category, index) in categoryList"
      :key="index"
    >
      <ccshadow>
        <q-card-section class="bg-blue-1"     @click="handleSelectCategrie(category.cid)">

          <q-img :src="category.image" width="80px" height="80px" :ratio="10 / 2" />
          <q-item-label>{{ category.cname  }}</q-item-label>
        </q-card-section>
      </ccshadow>
    </div>

    </div>
    <div class="col bg-green-1 shadow-2 q-pa-md q-ma-sm">
      <p>kk</p>
    </div>

  </q-page>


</template>



<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import useProductstore from 'stores/modules/product'
import usecategoriestore from 'stores/modules/category'
import ccshadow from '../../components/ccshadow.vue';
const productList = reactive([])
const categoryList = reactive([])
const source2 = ref('');


const addProduct = (idProduct) => {
  productList.push({
    id: 9,
    libelet: 'capotshino',
    categorie: 'drink',
    sousCategorie: 'drink',
    prix: '10DH',
    photopath: 'src/assets/pos/1.png',
  })
  console.log(idProduct)
};
const lafonctionq=(product:string)=>{
  console.log(product)

}
const handleSelectCategrie=(categorieId:string)=>{
  console.log(categorieId)

}

onMounted(async () => {
  useProductstore().getProducts().then((res) => {
    productList.push(...res.rows)
  }).catch(error => {
    console.error(error)
  })}
  )

  onMounted(async () => {

    console.log("getcategoriesgetcategories bonjour ")
    usecategoriestore().getcategories().then((reslt)=>{

    categoryList.push(...reslt.rows)
  }).catch(error => {
    console.log("essaid bonjour ")
    console.error(error)


  })
 })







const handleClick = (idProduct) => {
  source2.value = 'http://localhost:9080/static/sample.pdf'

  productList.push(productList.filter(item => {
    return item.id !== idProduct
  }))
};


</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.row>div {
  padding: 10px 15px;
  background: rgb(245, 245, 245);
  border: 1px solid rgba(86, 61, 124, .2)
}

;

.col {
  border: 1px solid rgba(86, 61, 124, .2)
}
</style>
