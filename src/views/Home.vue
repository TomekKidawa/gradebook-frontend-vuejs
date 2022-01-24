<template>

  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
      <HelloWorld/>
       
    </header>
  </div>
  
</template>

<script>
import UserService from '../services/user.service';
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      content: 'sieeeema siema jestem bania nagrywam nute z rana ',
      
      adminRoles:[{ "id": 2, "name": "ROLE_MODERATOR" }, { "id": 1, "name": "ROLE_USER" }, { "id": 3, "name": "ROLE_ADMIN" }],
      userRoles:[{ "id": 1, "name": "ROLE_USER" }],
      ModRoles:[{ "id": 2, "name": "ROLE_MODERATOR" }]
    };
  },
   components:{
          HelloWorld
      },
    methods:{

      mounted() {
        UserService.getPublicContent().then(
          response => {
            this.content = response.data;
          },
          error => {
            this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    }  
};
</script>