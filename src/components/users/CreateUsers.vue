<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm12>
        <h5 style="text-align: center">Add New User</h5>
        <form @submit.prevent="submitForm">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="User Name"
              v-model="userName"
              :rules="[v => !!v || 'User Name is required']"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="email"
              :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
              required
            ></v-text-field>
            <!-- Display generated password to the user -->
            <v-text-field
              label="Generated Password"
              v-model="generatedPassword"
              readonly
            ></v-text-field>
            <v-btn
              type="submit"
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
      userName: '',
      email: '',
      valid: true,
      generatedPassword: '',
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        // Generate a random password (8 characters)
        const randomPassword = Math.random().toString(36).slice(-8);
        this.generatedPassword = randomPassword;

        const newUser = {
          userName: this.userName,
          email: this.email,
          password: randomPassword,
        };

        this.$http.post('https://node-mu-nine.vercel.app/api/users', newUser)
          .then(response => {
            console.log('User created successfully:', response.data);
            // Optionally, navigate to a different route or show a success message
          })
          .catch(error => {
            console.error('Error creating user:', error);
            // Handle error, show error message, etc.
          });
      }
    },
  },
};
