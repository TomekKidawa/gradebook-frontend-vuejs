<template>
  <div class="container">
  <div v-if="showModBoard">
    <ShowAllStudents/>
  </div>
    <!-- <header class="jumbotron">
      <h3>{{content}}</h3>
      Moderator Board from vue
    </header> -->
  </div>
</template>

<script>
// import UserService from '../services/user.service';
import ShowAllStudents from '../components/ShowAllStudents.vue';

export default {
  name: 'Moderator',
  data() {
    return {
      content: ''
    };
  },
   components:{
    ShowAllStudents
  },
  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
    showModBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
  },


  mounted() {
    // UserService.getModeratorBoard().then(
    //   response => {
    //     this.content = response.data;
    //   },
    //   error => {
    //     this.content =
    //       (error.response && error.response.data && error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    else if(!this.currentUser.roles.includes('ROLE_MODERATOR')){
      this.$router.push('/profile');
    }
  },



};
</script>