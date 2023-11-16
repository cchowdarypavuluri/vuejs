<template>
  <v-dialog max-width="700px" persistent v-model="editDialog">
      <v-btn slot="activator" class="warning">
        Edit
      </v-btn>
      <v-card>
          <v-container>
            <v-layout row>
              <v-flex xs12>
                <v-card-title>Edit Department</v-card-title>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text>
                  <v-text-field name="departmentName" label="Department Name" v-model="department.departmentName" required></v-text-field>
                  <v-text-field name="location" label="Location" v-model="department.location" required></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-actions>
                  <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
                  <v-btn flat class="blue--text darken-1" @click="onSaveChange">Save</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      editDialog: false,
      department: {},
    };
  },
  methods: {
    fetchDepartment() {
      this.$http.get(`https://node-mu-nine.vercel.app/api/departments/${this.$route.params.id}`)
        .then(response => {
          this.department = response.body;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSaveChange() {
      if (this.department.departmentName.trim() === '' || this.department.location.trim() === '') {
        return false;
      }
      const updateDepartment = {
        departmentName: this.department.departmentName,
        location: this.department.location,
      };
      this.$http.put(`https://node-mu-nine.vercel.app/api/departments/${this.$route.params.id}`, updateDepartment)
        .then(response => {
          this.$router.push({ path: '/departments/' + this.$route.params.id });
        })
        .catch(err => {
          console.log(err);
        });
      this.editDialog = false;
    },
  },
  created() {
    this.fetchDepartment(this.$route.params.id);
  },
};
</script>
