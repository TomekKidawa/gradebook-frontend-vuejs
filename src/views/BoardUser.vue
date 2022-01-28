<template>
  <div class="container">
    <header class="jumbotron">
      <!-- <h3>{{content}}</h3> -->
      <ShowUserGrade/>

    </header>
  </div>
</template>

<script>
// import UserService from '../services/user.service';
import ShowUserGrade from '../components/ShowUserGrade.vue'

export default {
  name: 'User',
  data() {
    return {
      content: ''
    };
  },
  components:{
    ShowUserGrade
  },
  computed:{
     currentUser() {
      return this.$store.state.auth.user;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_USER');
      }

      return false;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    else if(!this.currentUser.roles.includes('ROLE_USER')){
      this.$router.push('/profile');
    }
  }
};
</script>