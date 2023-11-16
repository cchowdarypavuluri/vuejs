<template>
  <v-app light>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-content>Home</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/resources/add">
          <v-list-tile-content>Add Resource</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/users/add">
          <v-list-tile-content>Add Users</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/departments/add">
          <v-list-tile-content>Add Departments</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <router-link to="/" tag="span" style="cursor: pointer"><v-toolbar-title>programmers Tasks</v-toolbar-title></router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/">
          Home
        </v-btn>
        <v-btn flat to="/resources/add">
          Resource
        </v-btn>
        <v-btn flat to="/users/add">
          User
        </v-btn>
        <v-btn flat to="/departments/add">
          Department
        </v-btn>
        <v-btn @click="showLoginDialog" flat>
          Login
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
      <v-dialog v-model="loginDialog" max-width="500">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="email" label="Email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="login" color="primary">Login</v-btn>
            <v-btn @click="closeLoginDialog">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      loginDialog: false,
      email: '',
      password: '',
    };
  },
  methods: {
    navigateToAdd(type) {
      if (type) {
        this.$router.push(`/resources/add?type=${type}`);
      } else {
        // Handle click on "Add" button without selecting a type
      }
    },
    showLoginDialog() {
      this.loginDialog = true;
    },
    closeLoginDialog() {
      this.loginDialog = false;
    },
    login() {
      // Implement your login logic here
      // Display error message or update to premium as needed
      this.closeLoginDialog();
    },
  },
};
</script>

<style lang="stylus">
@import './stylus/main';
</style>
