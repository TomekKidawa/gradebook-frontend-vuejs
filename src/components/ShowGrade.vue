<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
          Oceny użytkownika:<h3> {{currentUser.username}}</h3>
        <v-col cols="12">
        <!-- {{this.grades}} -->
         
        </v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Przedmiot:</th>
                  <th class="text-left">Kategoria Oceny:</th>
                  <th class="text-left">Ocena:</th>
                  <th class="text-left">Usuń ocene:</th>
                  <!-- <th class="text-left">wszystkie oceny:</th> -->
                </tr>
              </thead>
              <tbody>
                <tr
                v-for="grade in grades" :key="grade.id"
                >
                  <td class="text-left">{{grade.subject.name}}</td>
                  <td class="text-left"> {{grade.category.name}}</td>
                  <td class="text-left">{{grade.grade}}</td>
                  <td class="text-left"><v-icon @click="deleteGrade(grade.id)">mdi-delete</v-icon></td>
                </tr>
              </tbody>
              
             <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                top
                color="green darken-1"
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
            </template>
          </v-simple-table>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GradeService from '../services/grade.service';
import userMgmt from '../services/userMgmt.service';

  export default {
    name: 'ShowGrade',
    data(){
      return{
        currentUser:null,
        grades:null,
        snackbar:false,
        snackbartext:'Pomyślnie usunięto ocenę',
        timeout:1200,
        tempId:0,
      }
    },
    methods: {
      deleteGrade(id){
          GradeService.deleteGradeById(id)
        .then((response) => {
          console.log(response.data);
          this.getGrades(this.tempId);
          this.snackbar = true
        })
        .catch((e) => {
          console.log(e);
        });
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
     getGrades(id) {
      GradeService.getGradesForUser(id)
        .then((response) => {
          this.grades = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getTempId(id){
        this.tempId = id;
    }
    },
    mounted() {
      this.getUser(this.$route.params.id);
      this.getGrades(this.$route.params.id)
      this.getTempId(this.$route.params.id);
    },
    computed:{
   
    }
  }
</script>