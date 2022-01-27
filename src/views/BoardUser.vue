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
  // mounted() {
  //   UserService.getUserBoard().then(
  //     response => {
  //       this.content = response.data;
  //     },
  //     error => {
  //       this.content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();
  //     },
      
  //   );
  // },
  
};
</script>