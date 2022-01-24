<template>
<div>
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
        <li  v-for="(role ,index ) in currentUser.roles" :key="index" style="list-style-type:none">
            <v-chip
               class="ma-2"
              color="blue darken-1"
               outlined
              text-color="blue darken-1"
              small
            >
              <v-avatar left>
                  <v-icon small>mdi mdi-account-star</v-icon>
              </v-avatar>
            {{role.name}}
            </v-chip>
        </li>

      </ul>
        
        <v-btn @click="setRoleUser">User</v-btn>
        <v-btn @click="setRoleModerator">Moderator</v-btn>
        <v-btn @click="setRoleAdmin">Admin</v-btn>
       
<!--         
        <template>
          <v-container fluid>
            <p>{{role}}</p>
            <v-checkbox
              v-model="currentUser.roles"
              label="User"
              value=" {{}}" 
            ></v-checkbox>
            <v-checkbox
              v-model="currentUser.roles"
              label="Mod"
              value="ROLE_MODERATOR"
            ></v-checkbox>
            <v-checkbox
              v-model="currentUser.roles"
              label="ADMIN"
              value="ROLE_ADMIN"
            ></v-checkbox>
          </v-container>
        </template> -->


      <v-btn color="error" small class="mr-2" @click="deleteUser">
        Delete
      </v-btn>

      <v-btn color="success" small @click="update">
        Update
      </v-btn>
    </v-form>



    <!-- <p class="mt-3">{{ message }}</p> -->

      
        <v-alert v-if=" message != 0 "
          shaped
          outlined
          type="success"
        >
        {{message}}
        </v-alert>
    

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
      chuj:0,
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
          this.message = "The user was updated successfully!";
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
</style>