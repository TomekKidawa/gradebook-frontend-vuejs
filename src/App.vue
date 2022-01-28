<template>
  
  <v-app>
        <nav>
        <v-navigation-drawer  dark app class="grey darken-4 py-0">
<!-- v-model="drawer" W NAVIGAION -->
          <v-container>
              <v-row>
                  <v-col md="9"> 
                      <div v-if="currentUser">
                          <v-list-item class="px-3">
                            <v-list-item-avatar size="50">
                              
                                <v-img src="https://randomuser.me/api/portraits/men/69.jpg"></v-img>
                              
                            </v-list-item-avatar>
                          </v-list-item>
                      </div>
                  </v-col>
                  <v-col md="3">
                        <v-icon right class="mt-1" >fas fa-bars</v-icon>
                  </v-col>
              </v-row>
          </v-container>

        <v-list>
        <div v-if="currentUser">
            <v-list-item link route to="/profile">
              <v-list-item-content >
                <v-list-item-title class="text-h6">
                  {{currentUser.username}}
                </v-list-item-title>
                <v-list-item-subtitle>{{currentUser.email}}l</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          <hr style="color: white">
          </div>

        </v-list>
            <v-list nav>
                <v-list-item router to="/home">
                    <v-list-item-action>    
                       <font-awesome-icon icon="home" />
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <div v-if="showAdminBoard">  
                  
                    <v-list-item router to="/admin">
                      <v-list-item-action>
                        <v-chip color="yellow darken-3" small>
                          <v-icon small>fas fa-users</v-icon>
                        </v-chip>
                      </v-list-item-action>
                      <v-list-item-content>
                            <v-list-item-title>Admin Board</v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
                </div>

                <div v-if="showModeratorBoard">  
                    <v-list-item router to="/mod">
                      <v-list-item-action>
                        <v-chip color="amber darken-3" small>
                          <v-icon small>fas fa-users</v-icon>
                      </v-chip>
                      </v-list-item-action>
                      <v-list-item-content>
                            <v-list-item-title>Moderator Board</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </div>

                    <div v-if="currentUser">  
                    <v-list-item router to="/user">
                      <v-list-item-action>
                        <v-chip color="orange darken-3" small>
                          <v-icon small>fas fa-users</v-icon>
                        </v-chip>
                      </v-list-item-action>
                      <v-list-item-content>
                            <v-list-item-title>User Board</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                </div>

                <div  v-if="!currentUser">
                  <v-list-item router to="/register">
                    <v-list-item-action>
                        <font-awesome-icon icon="user-plus" />
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Zarejestruj się</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                 <v-list-item router to="/login">
                    <v-list-item-action>
                        <font-awesome-icon icon="sign-in-alt" />
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Zaloguj się</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                </div>

                <div v-if="currentUser">
                 <!-- <v-list-item router to="/profile">
                    <v-list-item-action>
                         <font-awesome-icon icon="user" />
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ currentUser.username }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item> -->

               
                <v-list-item href @click.prevent="logOut">
                    <v-list-item-action>
                         <font-awesome-icon icon="sign-out-alt"/>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Wyloguj się</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                
                 
              </div>

            </v-list>

        </v-navigation-drawer>
    </nav>
  
    
  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
    <router-view/>

    </v-container>



  </v-main>


</v-app>
  
<!--   
  
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>E-dzienniczek </a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div> -->

</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>