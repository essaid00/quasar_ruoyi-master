<template>
  <div id="main" class="main">


    <div class="row">
      <div class="col-md-8 flex flex-center">
        <q-img src="src/assets/pos/logopos.png" width="280px" :ratio="10 / 2" />
      </div>
      <div class="col-4">
        <div class="row">
          <div class="row justify-center ">
            <div class="col-12">
              <q-input outlined input-style="text-align: center ;font-size: x-large;" clear-icon="cancel"
                :type="isPwd ? 'password' : 'text'" v-model.trim="form.password" dense readonly bg-color="white"
                placeholder="SAISIR LE CODE ICI" debounce="500" hide-bottom-space lazy-rules square
                :rules="[(val) => (val && val.length > 0) || 'SAISIR LE CODE ICI']">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>

            <q-btn outline class="col-3 q-ma-xs" color="primary" label="1" @click="addCatalog('1')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" label="2" @click="addCatalog('2')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" label="3" @click="addCatalog('3')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" label="4" @click="addCatalog('4')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" label="5" @click="addCatalog('5')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" label="6" @click="addCatalog('6')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" label="7" @click="addCatalog('7')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" label="8" @click="addCatalog('8')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" label="9" @click="addCatalog('9')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" icon="cancel" @click="addCatalog('X')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" label="0" @click="addCatalog('0')" />
            <q-btn outline class="col-3 q-ma-xs" color="primary" glossy icon="send" @click="addCatalog('E')">
              <template v-slot:loading>
                <q-spinner-ios class="on-center" />
              </template>
            </q-btn>

          </div>
        </div>
        <div class="row justify-center">

          <div class="col-md-12">
            <div class="row justify-center">
              <p>licence au :xxxxxxx</p>

            </div>
            <div class="row justify-center">
              <p> Pin administrateur :123456</p>
            </div>
            <div class="row justify-center">
              <p>modification du code via configuration</p>

            </div>





            <q-separator spaced="15px" />
            <div class="row justify-center q-pb-md q-pt-md">
              <q-btn type="a" @click="close()" icon="login">
                <q-tooltip>quiter</q-tooltip>

              </q-btn>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import { useQuasar } from 'quasar'
import { reactive, ref } from "vue"
import {getCurrentInstance} from "vue";
import useUserStore from 'stores/modules/user'
const userStore = useUserStore()
const isPwd = ref(true);;
const autoLogin = ref(true);
const loading = ref(true);;
const code = ref(false);;


const form = reactive({
  username: 'admin',
  password: 'admin',
  captcha: '',
  checkKey: 'poskey',
})


const addCatalog = (caracter) => {
  if (caracter === "X") {
    if (form.password.length > 0) {
      form.password = form.password.substring(0, form.password.length - 1);
      console.log(form.password)
    }
    return

  }
  if (caracter === "E") {
    if (form.password.length > 0) {
      console.log('submit')
      onLogin()


    }

    return
  }

  form.password = form.password + caracter;



}
const {proxy} = getCurrentInstance();
const $q = useQuasar()
const onLogin = () => {
  $q.loading.show()
  let data = { username: form.username, password: form.password }
  console.log('data' + data)
  try {
    userStore.login(data).then(res => {
      console.log('tabs')
    userStore.getInfo().then((err) => {
      console.log(err)
      proxy.$tab.replaceRouter("/")
      $q.loading.hide()
    }).catch(error => {
      console.error('sss')
      proxy.$tab.replaceRouter("/login")
      $q.loading.hide()
    })


  }).catch(error => {
    console.error('err')
      $q.loading.hide()
    })


    } catch (e) {
      console.error('try')
      $q.loading.hide()
    }


};
const close =()=>{
  $q.dialog({
        dark: true,
        title: 'Confirm',
        cancel: true,
        message: 'Vous voulez frermer l application .'
      }).onOk(() => {
        window.myAPI.doAThing()
      }).onCancel(() => {
         console.log('Cancel')
      }).onDismiss(() => {
       console.log('I am triggered on both OK and Cancel')
      })
    }






</script>

<style lang="css" scoped>
.main {
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(-225deg, #e3fdf5 0%, #ffe6fa 100%);
}



.row>div {
  padding: 10px 15px;
  background: rgb(245, 245, 245);
  border: 1px solid rgba(86, 61, 124, .2)
}

;

.doc-container>div+div {
  margin-top: 1rem;
}
</style>
