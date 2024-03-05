<template>
  <q-page>
    <div class="header">
      <div class="profile-pic">
        <img :src="avatar" @click="openEditAvatar">
      </div>
      <div class="name">{{ userName }}</div>
      <div class="job-title">生活就是如此...</div>
    </div>
    <q-card>
      <q-list bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="hourglass_empty"/>
          </q-item-section>
          <q-item-section>...</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="teal" text-color="white" icon="dangerous"/>
          </q-item-section>

          <q-item-section>...</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded color="purple" text-color="white" icon="card_membership"/>
          </q-item-section>

          <q-item-section>...</q-item-section>
        </q-item>

        <q-item  v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              L
            </q-avatar>
          </q-item-section>

          <q-item-section>...</q-item-section>
        </q-item>

        <q-separator/>

        <q-item  v-ripple>
          <q-item-section avatar>
            <q-avatar icon="sentiment_very_satisfied">
            </q-avatar>
          </q-item-section>
          <q-item-section>...</q-item-section>
        </q-item>

        <q-item  v-ripple>
          <q-item-section avatar>
            <q-avatar square icon="dashboard">
            </q-avatar>
          </q-item-section>
          <q-item-section>...</q-item-section>
        </q-item>

        <q-separator/>

        <q-item  v-ripple>
          <q-item-section avatar>
            <q-avatar rounded icon="logout">
            </q-avatar>
          </q-item-section>
          <q-item-section @click="logOut">退出</q-item-section>
        </q-item>
      </q-list>

    </q-card>


    <editAvatar v-if="open" :user-avatar="avatar"  @close="closeEditAvatar"></editAvatar>

  </q-page>


</template>

<script setup name="my">
import {getCurrentInstance, ref} from "vue";
import useUserStore from "stores/modules/user";
import editAvatar from "./editAvatar.vue"
import {useQuasar} from 'quasar'

const userStroe = useUserStore();
const {proxy} = getCurrentInstance()
const dialog = ref(false)
const userName = ref("")
const avatar = ref("")
const open = ref(false)

userName.value = userStroe.name
avatar.value = userStroe.avatar
const $q = useQuasar()

function openEditAvatar(){
  open.value=true;
}
function closeEditAvatar(){
  open.value=false;
  avatar.value = userStroe.avatar
}
function logOut() {
  $q.dialog({
    title: 'indice système',
    message: 'Confirm to exit this system?',
    ok: 'OK',
    focus:"none",
    cancel:"cancel",
    persistent: true
  }).onOk(() => {
    userStroe.logOut().then(() => {
      proxy.$tab.replaceRouter("/login")
    })
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 32vh;
  background-color: #8bc3fc;
  text-align: center;
}

.profile-pic {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  margin-top: 8px;
}

.profile-pic img {
  width: 100%;
  height: auto;
}

.name {
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
}

.job-title {
  font-size: 16px;
  color: white;
}

</style>
