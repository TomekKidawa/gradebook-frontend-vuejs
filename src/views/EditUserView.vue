<template>
  <div class="EditUserview">
    
    <EditUser/>

  </div>
 
</template>

<script>
import EditUser from '../components/EditUser.vue'


export default {
  name: 'EditUserview',
  components: {
    EditUser
  },computed:{
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
}
</script>
