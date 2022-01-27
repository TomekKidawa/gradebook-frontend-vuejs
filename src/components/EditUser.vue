<template>
<div>
  <div class="mg-top"></div>
  <div v-if="currentUser" class="edit-form py-3">

    <p class="headline">Edit User</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentUser.username"
        :rules="[(v) => !!v || 'username is required']"
        label="username"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentUser.email"
        :rules="[(v) => !!v || 'email is required']"
        label="email"
        required
      ></v-text-field>

       <!-- <v-text-field
        v-model="currentUser.roles"
        :rules="[(v) => !!v || 'emailId is required']"
        label="roles"
        required
      ></v-text-field> -->
      
        Aktualne role:
      <ul>
        <li  v-for="(role ,index ) in currentUser.roles" :key="index" style="list-style-type:none; margin-left:-30px">
            <v-chip
               class="ma-2"
              color="darken-1"
               outlined
              text-color="darken-1"
              small
            >
              <v-avatar left>
                  <v-icon small>mdi mdi-account-star</v-icon>
              </v-avatar>
            {{role.name}}
            </v-chip>
        </li>

      </ul>
        
        <v-btn small @click="setRoleUser" style=";margin-right:1.7rem">User</v-btn>
        <v-btn small @click="setRoleModerator" style="margin-right:1.7rem">Moderator</v-btn>
        <v-btn small @click="setRoleAdmin" >Admin</v-btn>
       

      <v-btn color="error" normal class="mr-2" style="margin-top:1.6rem" @click="deleteUser">
        Delete
      </v-btn>

      <v-btn color="success" normal  style="margin-top:1.6rem;margin-left:0.3rem" @click="update">
        Update
      </v-btn>
    </v-form>

      
        <v-alert v-if=" message != 0 "
          shaped
          outlined
          :timeout="timeout"
          style="margin-top:1.6rem"
          type="success"
        >
        {{message}}
        </v-alert>
        
         <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
              top
              color="green darken-1"
              style="margin-left:7.5rem"
            >
            <v-icon dense>mdi-checkbox-marked-circle</v-icon>
              {{ snackbartext }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="black"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

  </div>

  
  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>  


</div>
</template>

<script>
import userMgmt from '../services/userMgmt.service'

export default {
  name: "edituser",
  data() {
    return {
      currentUser: null,
      message: 0,
      snackbar:false,
      snackbartext:'użytkownik został edytowany pomyślnie',
      timeout: 1200,
      adminRoles:[{ "id": 2, "name": "ROLE_MODERATOR" }, { "id": 1, "name": "ROLE_USER" }, { "id": 3, "name": "ROLE_ADMIN" }],
      userRoles:[{ "id": 1, "name": "ROLE_USER" }],
      modRoles:[{ "id": 2, "name": "ROLE_MODERATOR" },{ "id": 1, "name": "ROLE_USER" }]
    };
  },
  methods: {
     setRoleModerator(){
      this.currentUser.roles = this.modRoles;
    },setRoleAdmin(){
      this.currentUser.roles = this.adminRoles;
    },setRoleUser(){
      this.currentUser.roles = this.userRoles;
    },


    getUser(id) {
      userMgmt.getUserById(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    update() {
      userMgmt.updadeUser(this.currentUser.id, this.currentUser)
        .then((response) => {
          console.log(response.data);
          // this.message = "Użytkownik został edytowany pomyślnie!";
          this.snackbar = true
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteUser() {
      userMgmt.deleteUserById(this.currentUser.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "admin" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getUser(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.mg-top{
  margin-top: 6rem;
}
</style>