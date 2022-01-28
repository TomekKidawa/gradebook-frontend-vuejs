<template>

    <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4">
            <div class="text-center">
                <v-avatar size="100" color="grey darken-3">
                    <v-icon size="60" color="white">mdi-account</v-icon>
                </v-avatar>
                <h2 class="indygo--text">Sign up</h2>
            </div>
            <v-form ref="form" @submit.prevent="handleRegister" lazy-validation>
                <!-- <div v-if="!successful"> -->
                    <v-card-text>
                        <v-text-field
                                v-model="user.username"
                                :rules="UsernameRules"
                            type="text"
                            label="Login"
                            placeholder="Login"
                            prepend-inner-icon="mdi-account"
                        />
                        <!-- <div
                            v-if="submitted && errors.has('username')"
                            class="alert-danger"
                            >{{errors.first('username')}}</div> -->
                        <v-text-field
                                v-model="user.email"
                                :rules="emailRules"
                            type="email"
                            label="Email"
                            placeholder="Email"
                            prepend-inner-icon="mdi-email"
                        /> 
                        <!-- <div
                            v-if="submitted && errors.has('email')"
                            class="alert-danger"
                          >{{errors.first('email')}}</div> -->
                                      
                         
                        <v-text-field
                            v-model="user.password"
                            :rules="passwordRules"
                            :type="passwordShow?'text': 'password'"
                            label="Hasło"
                            placeholder="Hasło"
                            prepend-inner-icon="mdi-key"
                            :append-icon="passwordShow ? 'mdi-eye':'mdi-eye-off'"
                            @click:append="passwordShow = !passwordShow"
                        />
                          <!-- <div
                            v-if="submitted && errors.has('password')"
                            class="alert-danger"
                          >{{errors.first('password')}}</div> -->
                    
                    </v-card-text>
            
                <v-card-actions class="justify-center">
                  
                   <v-btn type="submit" color="grey darken-3">
                       <span class="white--text px-8" >Sign Up</span>
                    </v-btn>
                    
                </v-card-actions>

                 <!-- <div class="form-group">
          <div v-if="message" class="alert alert-danger"  role="alert">{{message}}</div>
        </div> -->
        <!-- </div> -->

              <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
              >
            <!-- <div v-for="messages in message" :key="messages.message"> -->
              {{message}}

            <!-- </div> -->
              
              
              </div>

            </v-form>

        </v-card>

        <!-- <v-snackbar top color="green" v-model="snackbar">
              Login success
        </v-snackbar> -->

    </v-col>
  

</template>


<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: '',
      valid:true,
      passwordShow:false,
      passwordRules: [
      v => !!v || 'Hasło jest wymagane',
      v => (v && v.length >= 5) || 'Hasło musi mieć wiecej niz 5 znaków',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail jest wymagany',
        v => /.+@.+\..+/.test(v) || 'E-mail się nie zgadza',
      ],
      UsernameRules: [
        v => !!v || 'Nazwa użytkownika jest wymagana',
        v => (v && v.length >= 3) || 'Nazwa użytkownika musi mieć wiecej niż 3 znaki',
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    // if (this.loggedIn) {
    //   this.$router.push('/profile');
    // }
  },
  methods: {
    handleRegister() {
      if(this.$refs.form.validate()){
        
          this.message = '';
          this.submitted = true;
          this.$validator.validate().then(isValid => {
            if (isValid) {
              this.$store.dispatch('auth/register', this.user).then(
                data => {
                  this.message = data.message;
                  this.successful = true;
                },
                error => {
                  this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                  this.successful = false;
                }
              );
            }
          });

      }
    }
  }
};
</script>
