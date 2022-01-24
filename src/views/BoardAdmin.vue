<template>
    <div>
        <div v-if="showAdminBoard">
        <ShowAllUsers/>
        </div>
    </div>
</template>

<script>
//import UserService from '../services/user.service';
import ShowAllUsers from '../components/ShowAllUsers.vue'

export default {
  name: 'Admin',
  data() {
   
    return {
      content: ''
    };
  },
  components:{
    ShowAllUsers
  },
  computed:{
     currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    else if(!this.currentUser.roles.includes('ROLE_ADMIN')){
      this.$router.push('/profile');
    }
  }
  
};
</script>

<style scoped>

</style>