<template>
  <v-container>
    <v-layout row wrap>
      <!-- Left side: List of Departments -->
      <v-flex sm6>
        <h5 style="text-align: center">View Departments</h5>
        <v-list>
          <v-list-item-group v-if="departments.length > 0">
            <v-list-item v-for="(department, index) in departments" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ department.departmentName }}</v-list-item-title>
                <v-list-item-subtitle>{{ department.location }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="deleteDepartment(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
          <v-list-item v-else>
            <v-list-item-content>No departments available</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>

      <!-- Right side: Input to Add Departments -->
      <v-flex sm6>
        <h5 style="text-align: center">Add New Department</h5>
        <form>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="Department Name"
              v-model="departmentName"
              :rules="[v => !!v || 'Department Name is required']"
              required
            ></v-text-field>
            <v-text-field
              label="Location"
              v-model="location"
              :rules="[v => !!v || 'Location is required']"
              required
            ></v-text-field>
            <v-btn
              @click="submitForm"
              :disabled="!valid"
            >
              Submit
            </v-btn>
          </v-form>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      departments: [],
      departmentName: '',
      location: '',
      valid: true,
    };
  },
  mounted() {
    this.fetchDepartments();
  },
  methods: {
    fetchDepartments() {
      this.$http.get('https://node-mu-nine.vercel.app/api/departments')
        .then(response => {
          this.departments = response.data;
        })
        .catch(error => {
          console.error('Error fetching departments:', error);
        });
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        const newDepartment = {
          departmentName: this.departmentName,
          location: this.location,
        };

        this.$http.post('https://node-mu-nine.vercel.app/api/departments', newDepartment)
          .then(response => {
            console.log('Department created successfully:', response.data);
            this.fetchDepartments();
          })
          .catch(error => {
            console.error('Error creating department:', error);
          });
      }
    },
    deleteDepartment(index) {
      const departmentId = this.departments[index].id;
      this.$http.delete(`https://node-mu-nine.vercel.app/api/departments/${departmentId}`)
        .then(response => {
          console.log('Department deleted successfully:', response.data);
          this.fetchDepartments();
        })
        .catch(error => {
          console.error('Error deleting department:', error);
        });
    },
  },
};
</script>
