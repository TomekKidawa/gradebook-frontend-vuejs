<template>
  <v-container>
    <div class="mg-top">
      <v-row class="text-center">        
          <div class="edit-form py-3">
            <p class="headline">Dodaj Ocene</p>
            <template>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
              <v-select
                  v-model="grade.grade"
                  :items="grades"
                  :rules="[v => !!v || 'Ocena jest wymagama']"
                  label="Ocena"
                  required
                  bottom
                  autocomplete
                ></v-select>

              <v-select
                  v-model="grade.subject.id"
                  :items="subjects"
                  item-text="name"
                  item-value="id"
                  :rules="[v => !!v || 'Przedmiot jest wymagany']"
                  label="Przedmiot"
                  required
                ></v-select>

                <v-select
                  :items="categories"
                  v-model="grade.category.id"
                  item-text="name"
                  item-value="id"
                  :rules="[v => !!v || 'Kategoria jest wymagana']"
                  label="Kategoria"
                  bottom
                  autocomplete
                  required
                ></v-select>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="addGrade"
                  style="margin-top:1.2rem"
                >
                  Dodaj Ocene
                </v-btn>

              </v-form>
            </template>

            <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
              top
              color="green darken-1"
              style="margin-left:7.5rem"
            >
            <v-icon dense>mdi-checkbox-marked-circle</v-icon>
              {{ snackbartext }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="black"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
        </div>
      </v-row>  
    </div>
  </v-container>
</template>

<script>
import CategoryService from '../services/category.service';
import GradeService from '../services/grade.service';
import SubjectService from '../services/subject.service';
import userMgmt from '../services/userMgmt.service';

  export default {
    name: 'AddGrade',
    data(){
      return{
        snackbar:false,
        snackbartext:'Pomyślnie usunięto ocenę',
        timeout:1200,
        tempId:0,
        categories:null,
        subjects:null,
        grades:[1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6],
        grade:{
          grade:null,
          subject:{
            id: null,
          },
          category:{
           id: null,
          },
          user:{
            id: null,
          }
        },
       
        SendToEndPoint:0,
      }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      addGrade(){
      if(this.$refs.form.validate()){
          var data = {
            grade: this.grade.grade,
            subject: this.grade.subject,
            category: this.grade.category,
            user: this.grade.user
      };
        GradeService.addGradeService(data)
          .then((response) => {
            console.log(response.data);
            this.snackbar = true;
            this.$refs.form.reset()
            this.$refs.form.resetValidation()
        })
        .catch((e) => {
          console.log(e);
        });
      }

      },
       getUser(id) {
      userMgmt.getUserById(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
       },
      getAllSub() {
        SubjectService.getAllCategories()
        .then((response) => {
          this.subjects = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      },
      getAllCat() {
        CategoryService.getAllCategories()
        .then((response) => {
          this.categories = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      },
      getTempId(id){
        this.grade.user.id = id;
      },
    },
    mounted() {
      this.getUser(this.$route.params.id);
      this.getTempId(this.$route.params.id);
      this.getAllCat();
      this.getAllSub();
      
    },
     
  }
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.mg-top{
  margin-top: 8rem;
}
</style>