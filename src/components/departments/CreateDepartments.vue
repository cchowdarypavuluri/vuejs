<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm12>
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
              @click="submit"
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
      departmentName: '',
      location: '',
      valid: true,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const newDepartment = {
          departmentName: this.departmentName,
          location: this.location,
        };

        this.$http.post('https://node-mu-nine.vercel.app/api/departments', newDepartment)
          .then(response => {
            console.log('Department created successfully:', response.data);
            // Optionally, navigate to a different route or show a success message
          })
          .catch(error => {
            console.error('Error creating department:', error);
            // Handle error, show error message, etc.
          });
      }
    },
  },
};
</script>
