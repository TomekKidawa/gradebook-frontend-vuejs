<template>
  <div class="AddGradeStudent">
    <AddGrade/>

  </div>
 
</template>

<script>
import AddGrade from '../components/AddGrade.vue'


export default {
  name: 'AddGradeStudent',
  components: {
    AddGrade
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
