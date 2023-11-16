<template>
  <v-dialog max-width="700px" persistent v-model="editDialog">
      <v-btn slot="activator" class="warning">
        Edit
      </v-btn>
      <v-card>
          <v-container>
            <v-layout row>
              <v-flex xs12>
                <v-card-title>Edit User</v-card-title>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text>
                  <v-text-field name="userName" label="User Name" v-model="user.userName" required></v-text-field>
                  <v-text-field name="email" label="Email" v-model="user.email" required></v-text-field>
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
      user: {},
    };
  },
  methods: {
    fetchUser() {
      this.$http.get(`https://node-mu-nine.vercel.app/api/users/${this.$route.params.id}`)
        .then(response => {
          this.user = response.body;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSaveChange() {
      if (this.user.userName.trim() === '' || this.user.email.trim() === '') {
        return false;
      }
      const updateUser = {
        userName: this.user.userName,
        email: this.user.email,
      };
      this.$http.put(`https://node-mu-nine.vercel.app/api/users/${this.$route.params.id}`, updateUser)
        .then(response => {
          this.$router.push({ path: '/users/' + this.$route.params.id });
        })
        .catch(err => {
          console.log(err);
        });
      this.editDialog = false;
    },
  },
  created() {
    this.fetchUser(this.$route.params.id);
  },
};
</script>
