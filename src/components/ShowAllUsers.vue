<template>
<div>
  <template>
  <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8">
        <v-text-field v-model="search" label="Search by Username" append-icon="mdi-magnify"></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <!-- <v-btn small>
          Search
        </v-btn>  -->
        <v-btn small color="success"  to="/register" >dodaj nowego usera</v-btn> 
      </v-col>

      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>

          <v-card-title>Users</v-card-title>

          <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            disable-pagination
            :hide-default-footer="true"
          >
          <template v-slot:[`item.roles`]="{ item }">
             
            <v-chip  v-for="(role,id) in item.roles" :key="id"
              class="ma-2"
              color="grey darken-2"
              text-color="grey darken-2"
              outlined
              small
            >
              <v-avatar left>
                  <v-icon small>mdi mdi-account-star</v-icon>
              </v-avatar>
              {{role.name}}
            </v-chip>
              <!-- <td v-for="(role,key) in item.roles" :key="key">{{role.name}}, </td> -->
          </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-icon dense class="mr-2" @click="editUser(item.id)">mdi-pencil</v-icon>
              <v-icon dense @click="deleteUser(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row> 
 </template>

    <!-- <v-snackbar top color="green" v-model="snackbar">
              usunięto pomyślnie użytkownika o id
    </v-snackbar> -->

   <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      color="green darken-1"
      
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
</template>

<script>
import userMgmt from '../services/userMgmt.service';

export default {
  name:"ShowAllUsers",
  
  data() {
    return {
      snackbar:false,
      snackbartext:'Pomyślnie usunięto użytkownika',
      timeout: 1200,
      users:[],
        search:'',
        username:'',
        headers: [
        { text: "id", align: "start", sortable: false, value: "id" },
        { text: "login", value: "username", sortable: false },
        { text: "email", value: "email", sortable: false },
        { text: "role", value: "roles", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
        
      ],
      
    }
  },
  methods: {
      getAll() {
      userMgmt.getAllUsers()
      .then((response) => {
        this.users = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });},
      refreshList() {
        this.getAll();
      },
      deleteUser(id){
        
        userMgmt.deleteUserById(id)
        
        .then(()=>{
          this.refreshList();
          this.snackbar = true
        })
        .catch((e) => {
          console.log(e)
        })
      },
      editUser(id){
        this.$router.push({name:"edituser", params:{ id: id }});
      }
  },
  mounted() {
    this.getAll();
    
  },
  computed:{
    filterUserByUsermame: function() {
              return this.users.filter(user => !user.username.indexOf(this.username))
    },

    }
}
</script>
