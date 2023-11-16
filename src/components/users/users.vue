<template>
  <v-container>
    <v-layout row wrap>
      <!-- Left side: List of Users -->
      <v-flex sm6>
        <h5 style="text-align: center">View Users</h5>
        <v-list>
          <v-list-item-group v-if="users.length > 0">
            <v-list-item v-for="(user, index) in users" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ user.userName }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item v-else>
            <v-list-item-content>No users available</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>

      <!-- Right side: Input to Add Users -->
      <v-flex sm6>
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
      users: [],
      userName: '',
      email: '',
      valid: true,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.$http.get('https://node-mu-nine.vercel.app/api/users')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        const newUser = {
          userName: this.userName,
          email: this.email,
        };

        this.$http.post('https://node-mu-nine.vercel.app/api/users', newUser)
          .then(response => {
            console.log('User created successfully:', response.data);
            this.fetchUsers();
          })
          .catch(error => {
            console.error('Error creating user:', error);
          });
      }
    },
  },
};
</script>
