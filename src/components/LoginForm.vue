<template>

    <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4">
            <div class="text-center">
                <v-avatar size="100" color="grey darken-3">
                    <v-icon size="60" color="white">mdi-account</v-icon>
                </v-avatar>
                <h2 class="indygo--text">Sign in</h2>
            </div>
            <v-form ref="form" @submit.prevent="handleLogin">
                <v-card-text>
                    <v-text-field
                            v-model="user.username"
                            :rules="UsernameRules"
                        type="text"
                        label="Login"
                        placeholder="Login"
                        prepend-inner-icon="mdi-account"
                    />
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
                  <v-switch label="Zapamiętaj mnie" color="grey darken-3">Zapamiętaj mnie</v-switch>
                   
                </v-card-text>
                
 

          
                <v-card-actions class="justify-center">
                  
                   <v-btn type="submit" color="grey darken-3">
                       <span class="white--text px-8" >Login</span>
                    </v-btn>

                  <!-- <button class="btn btn-primary btn-block" :disabled="loading">
                    <span v-show="loading" class="white--text px-8"> </span>
                    <span>Login</span>
                  </button> -->

                </v-card-actions>

                 <div class="form-group">
                    <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
                  </div>
            </v-form>

            
        </v-card>

        <v-snackbar top color="green" v-model="snackbar">
              Login success
        </v-snackbar>
    </v-col>
  

</template>


<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      snackbar:false,
      passwordShow:false,
      valid:true,
      passoword: '',
      user: new User('', ''),
      loading: false,
      message: '',
      loginError: "Nieprawidłowy login lub hasło",
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
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
        //  submitHandler(){
        //     if(this.$refs.form.vavlidate()){
        //         this.loading = true
        //         setTimeout( () => {
        //             this.loading = false
        //             this.snackbar = true
        //         }, 3000) 
        //     }
        // },
    handleLogin() {

        if(this.$refs.form.validate()){
            this.loading = true;
            this.$validator.validateAll().then(isValid => {
              if (!isValid) {
                this.loading = false;
                return;
              }

              if (this.user.username && this.user.password) {
                this.$store.dispatch('auth/login', this.user).then(
                  () => {
                    this.$router.push('/profile');
                  },
                  error => {
                    this.loading = false;
                    this.message =
                    //error.response.data return error 401
                      (error.response && this.loginError) ||
                      error.message ||
                      error.toString();
                  }
                );
              }
            });
        }
    }
  }
};
</script>