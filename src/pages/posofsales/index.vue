<template>

   <q-page class="cc-admin row">
    <div class="col-2 bg-white shadow-2 q-pa-md q-ma-sm">
      <q-btn class=" q-mb-md"   color="secondary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    modifier une table     </q-btn>

    <q-btn   class=" q-mb-md"  color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    Selectionner un client      </q-btn>
    <q-btn   class=" q-mb-md"  color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    Imprimer une facture    </q-btn>
    <q-btn  class=" q-mb-md"   color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    un lock ticket     </q-btn>
    <q-btn  class=" q-mb-md"   color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    Ajouter un ticket    </q-btn>
    <q-btn  class=" q-mb-md"   color="primary" icon="mdi-delete-empty" @click="lafonctionq('confirm')">
    modifier une table     </q-btn>

    </div>
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
      <q-list padding dense>


          <q-item v-for="item in productList" :key="item.pid">
            <q-item-section avatar clickable>
              <q-img
            :src="item.image"
                color="positive"
                name="mdi-check"
              />

            </q-item-section>

            <q-item-section clickable>
              {{ item.pname }}
            </q-item-section>
          </q-item>
        </q-list>
    </div>
    <div class="col-2 bg-white shadow-2 q-pa-md q-ma-sm">

      <div
      class="col-lg-2 col-md-2 col-xs-4 text-center bg-white shadow-2 q-mx-sm q-mb-md"
      v-for="(data, index) in categoryList"
      :key="index"
    >
      <ccshadow>
        <q-card-section class="bg-blue-1" clickable    @click="handelSelect(data.cid)">
          <q-img :src="data.image" width="50px" />
          <q-item-label>{{ data.cname }}</q-item-label>
        </q-card-section>
      </ccshadow>
    </div>
    </div>
    <div class="col bg-green-1 shadow-2 q-pa-md q-ma-sm">
      <div class="row">
        <div class="col-6 " v-for="item in productList" :key="item.pid">
          <q-card class="fit bg-cyan-2">
            <q-card-section>
              <div class="row">
                <q-btn
                  flat
                  size="xl"
                  icon="mdi-arrow-left"
                />
                <div class="col text-h6 text-center text-weight-bolder">word </div>
                <q-btn
                  flat
                  size="xl"
                  icon="mdi-arrow-right"
                />
              </div>
            </q-card-section>

          </q-card>
      </div>

      </div>


  </div>
  </q-page>


</template>



<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import useProductstore from 'stores/modules/product'
import usecategoriestore from 'stores/modules/category'
const productList = reactive([])
const categoryList = reactive([])
const source2 = ref('');
import ccshadow from 'components/ccshadow.vue';
const handelSelect = (idProduct) => {}

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
