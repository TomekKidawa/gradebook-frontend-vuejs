<template>
  <v-container>
    <v-row class="text-center" style="margin-top:2rem">
      <v-col cols="12">
  
      <HelloWorld/>
       
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
import UserService from '../services/user.service';
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      content: 'Home page ',
 
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