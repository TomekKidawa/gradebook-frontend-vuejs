<template>
<div>
  <template>
      <!-- {{checkLengthTab}}

      {{tempUsers}} -->

  <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" md="8">
        <v-text-field v-model="searchUsername" label="Search by Username" append-icon="mdi-magnify"></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
       <v-btn small @click="page = 1; retrieveUsers();" >Szukaj</v-btn>
        <!-- <v-btn small color="success"  to="/register" >Dodaj nowa ocene</v-btn>  -->
      </v-col>  
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Lista Uczniów</v-card-title>
          <v-data-table
            :headers="headers"
            :items="users"
            :search="searchUsername"
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
              <v-icon dense class="mr-2" @click="addGrade(item.id)">mdi-plus</v-icon>
              <v-icon dense class="mr-2" @click="showGrade(item.id)">mdi-book-open-page-variant</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row> 
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @input="handlePageChange"
      dark
      color="grey"
      style="margin-top: 1rem;"
    ></v-pagination>

 </template>
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
      currentPage: 1,
      snackbar:false,
      snackbartext:'Pomyślnie usunięto użytkownika',
      timeout: 1200,
      users:[],
      tempUsers:[],
      searchUsername:'',
      checkLengthTab:0,
      id:'',
      username:'',
      email:'',
      roles:[],
      // username:'',
      headers: [
        { text: "login", value: "username", sortable: false },
        { text: "email", value: "email", sortable: false },
        { text: "role", value: "roles", sortable: false },
        { text: "Grades actions", value: "actions", sortable: false },
      ],
      page: 1,
      totalPages: 0,
      pageSize: 8,
      pageSizes: [3, 6, 9],

    }
  },
  methods: {
      getRequestParams(searchUsername, page, pageSize) {
      let params = {};

      if (searchUsername) {
        params["username"] = searchUsername;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
    retrieveUsers() {
      const params = this.getRequestParams(
        this.searchUsername,
        this.page,
        this.pageSize
      );
     userMgmt.getAllUsers(params)
      .then((response) => {
        const { users, totalPages } = response.data;
        this.tempUsers = users;
        // this.ShowOnlyStudents(this.tempUsers);
        this.users = users;
        this.totalPages = totalPages;

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveUsers();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveUsers();
    },

    getDisplayUser(user) {  
        if(user.roles.length == 1){
            this.checkLengthTab++;
            this.id = user.id; 
            this.username = user.username;
            this.email = user.email;
            this.roles = user.roles;
        }
      return this.user; 
    },
    ShowOnlyStudents(tempUsers){
        for(var i=0; i< tempUsers.length; i++){
            if(tempUsers[i].roles.length == 1){
                  return tempUsers[i];
            }
              
        }

    }, 
    addGrade(id){
        this.$router.push({name:"addgrade", params:{ id: id }});
    }, 
    showGrade(id){
        this.$router.push({name:"showgrade", params:{ id: id }});
    },
  },
  mounted() {
    // this.getAll();
    this.retrieveUsers();
  },
  computed:{
    // filterUserByUsermame: function() {
    //     return this.users.filter(user => !user.username.indexOf(this.username))
    // },
    }
}
</script>
