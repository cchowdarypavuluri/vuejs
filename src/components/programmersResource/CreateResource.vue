<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm12>
        <v-card>
          <v-card-title>
            <h5 style="text-align: center">Add New Programming Task</h5>
          </v-card-title>
          <v-card-text>
            <form>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-select
                  label="Resource Category"
                  v-model="category"
                  :items="items"
                  :rules="[v => !!v || 'Category is required']"
                  required
                ></v-select>
                <v-text-field
                  label="Resource Title"
                  v-model="title"
                  :rules="titleRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Image URL"
                  v-model="imageUrl"
                ></v-text-field>
                <v-text-field
                  label="Body"
                  v-model="body"
                  :rules="bodyRules"
                  multi-line
                  required
                ></v-text-field>
                <v-select
                  label="Assigned User"
                  v-model="assignedUser"
                  :items="userItems"
                  :rules="[v => !!v || 'Assigned User is required']"
                  required
                ></v-select>
                <v-select
                  label="Assigned Department"
                  v-model="assignedDepartment"
                  :items="departmentItems"
                  :item-value="item => item.id"
                  :item-text="item => item.name || item.departmentName || 'Unknown Department'"
                  :rules="[v => !!v || 'Assigned Department is required']"
                  required
                ></v-select>
                <v-btn
                  @click="submit"
                  :disabled="!valid"
                >
                  Submit
                </v-btn>
              </v-form>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      category: null,
      title: '',
      imageUrl: '',
      body: '',
      assignedUser: null,
      assignedDepartment: null,
      valid: true,
      titleRules: [(v) => !!v || 'Title is required'],
      bodyRules: [(v) => !!v || 'Body is required'],
      userItems: [],
      departmentItems: [],
      items: [
        'Code Review and Collaboration Meetings',
        'Debugging and Issue Resolution',
        'Implementing Version Control',
        'Software Testing and Quality Assurance',
        'Researching and Adopting New Technologies',
        'Building and Optimizing Database Structures',
        'Creating Technical Documentation and Guides',
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const newResource = {
          category: this.category,
          title: this.title,
          imageUrl: this.imageUrl,
          body: this.body,
          assignedUser: this.assignedUser,
          assignedDepartment: this.assignedDepartment,
          date: new Date(),
        };
        this.$http.post('https://node-mu-nine.vercel.app/api/programmersresource', newResource)
          .then(response => {
            this.$router.push({ path: '/' });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    fetchUsers() {
      this.$http.get('https://node-mu-nine.vercel.app/api/users')
        .then(response => {
          if (Array.isArray(response.data)) {
            this.userItems = response.data.map(user => user.name);
          } else {
            console.error('Invalid response structure for users:', response.data);
          }
        })
        .catch(err => {
          console.error('Error fetching users:', err);
        });
    },
    fetchDepartments() {
      this.$http.get('https://node-mu-nine.vercel.app/api/departments')
        .then(response => {
          if (Array.isArray(response.data)) {
            this.departmentItems = response.data.map(department => department.name || department.departmentName || 'Unknown Department');
          } else {
            console.error('Invalid response structure for departments:', response.data);
          }
        })
        .catch(err => {
          console.error('Error fetching departments:', err);
        });
    },
  },
  created() {
    this.fetchUsers();
    this.fetchDepartments();
  },
};
</script>
