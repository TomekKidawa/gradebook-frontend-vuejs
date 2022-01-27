<template>
  <v-container>
    <v-row class="text-center">
        <v-col cols="12">
        <!-- {{this.grades}} -->
                Oceny użytkownika: <h3 style="margin-bottom:1rem">{{currentUserUsername}}</h3>

                  <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Przedmiot:</th>
                  <th class="text-left">Kategoria Oceny:</th>
                  <th class="text-left">Ocena:</th>
                  <!-- <th class="text-left">odp.ustna:</th>
                  <th class="text-left">wszystkie oceny:</th> -->
                </tr>
              </thead>
              <tbody>
                <tr
                v-for="grade in grades" :key="grade.id"
                >
                  <td class="text-left">{{ grade.subject.name}}</td>
                  <td class="text-left"> {{ grade.category.name }}</td>
                  <td class="text-left">{{ grade.grade }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GradeService from '../services/grade.service';
// import userMgmt from '../services/userMgmt.service';

  export default {
    name: 'ShowUserGrade',
    data(){
      return{
        grades:null,
      }
    },
    methods: {
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

    },
    computed: {
    currentUser() {
      return this.$store.state.auth.user.id;
    },
    currentUserUsername(){
        return this.$store.state.auth.user.username;
    }
    },
    mounted() {
        this.getGrades(this.$store.state.auth.user.id);
      
    }
    }
</script>