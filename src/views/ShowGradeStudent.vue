<template>
  <div class="ShowGradeStudent">
  
    <ShowGrade/>

  </div>
 
</template>

<script>
import ShowGrade from '../components/ShowGrade.vue'


export default {
  name: 'ShowGradeStudent',
  components: {
    ShowGrade
  },
  computed:{
     currentUser() {
      return this.$store.state.auth.user;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    else if(!this.currentUser.roles.includes('ROLE_MODERATOR')){
      this.$router.push('/profile');
    }
  }
}
</script>
