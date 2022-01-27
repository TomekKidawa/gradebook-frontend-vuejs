<template>
  <v-container>
    <v-row class="text-center" style="margin-top:2rem">
      <v-col cols="12">
         <v-list-item-avatar size="100" style="margin-bottom:2rem">
                              
              <v-img src="https://randomuser.me/api/portraits/men/69.jpg"></v-img>
            
          </v-list-item-avatar>
          <h2>
                 Profil użytkownika: <strong>{{currentUser.username}}</strong>
              </h2>
           <v-col cols="12"></v-col>
            <p>
              <strong>Token:</strong>
              {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
            </p>
            <p>
              <strong>Id:</strong>
              {{currentUser.id}}
            </p>
            <p>
              <strong>username:</strong>
              {{currentUser.username}}
            </p>
            <p>
              <strong>Email:</strong>
              {{currentUser.email}}
            </p>
            <strong>Roles:</strong>
            <ul>
              <li v-for="(role,index) in currentUser.roles" :key="index" style="list-style-type:none;">{{role}}</li>
            </ul>

      
      </v-col>
    </v-row>
  </v-container>
    
  
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>