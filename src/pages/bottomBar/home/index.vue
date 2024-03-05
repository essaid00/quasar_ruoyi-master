<template>
  <q-page>
    <div class="row justify-between q-ma-lg">
    <div
      class="col-lg-2 col-md-2 col-xs-4 text-center bg-white shadow-2 q-mx-sm q-mb-md"
      v-for="(data, index) in linkData"
      :key="index"
    >
      <ccshadow>
        <q-card-section class="bg-blue-1"     @click="handleSelect(data.compoment)">
          <q-avatar :icon="data.icon" :text-color="data.textColor"></q-avatar>
          <q-item-label>{{ data.desc }}</q-item-label>
        </q-card-section>
      </ccshadow>
    </div>
  </div>
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ccshadow from './ccshadow.vue';
import {  useRouter } from 'vue-router'
const $router = useRouter()
const handleSelect = (index: string) => {
  $router.push({
      name: index
    })
}

const linkData=ref( [
        {
          icon: 'group',
          desc: 'Periode de travail',
          textColor: 'primary',
          compoment: "one",
        },
        {
          icon: 'group',
          desc: 'POS',
          textColor: 'primary',
        },
        {
          icon: 'group',
          desc: 'Tikete',
          textColor: 'primary',
        },
        {
          icon: 'leaderboard',
          desc: 'Compte',
          textColor: 'green',
        },
        {
          icon: 'shopping_cart',
          desc: 'TimeTiket',
          textColor: 'orange',
        },
        {
          icon: 'assignment',
          desc: 'wherehose',
          textColor: 'purple',
        },
        {
          icon: 'card_travel',
          desc: 'sambat hows',
          textColor: 'yellow',
        },
        {
          icon: 'email',
          desc: 'samba wherhowse',
          textColor: 'info',
        },
        {
          icon: 'bookmarks',
          desc: 'report',
          textColor: 'accent',
        },
        {
          icon: 'design_services',
          desc: 'configuration',
          textColor: 'deep-orange',
        },
      ])
</script>

<style scoped>

</style>
