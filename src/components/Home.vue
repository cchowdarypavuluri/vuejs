<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="d-flex justify-end">
        <v-text-field v-model="searchQuery" label="Search" outlined dense class="ml-auto mt-2" style="max-width: 400px;"></v-text-field>
      </v-flex>

      <v-flex xs12 md4 v-for="resource in paginatedResources" :key="resource.id">
        <v-card class="mb-4 mr-4 resource-card" @click="goToResource(resource.id)">
          <v-card-media v-if="resource.imageUrl" :src="resource.imageUrl" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h4 class="headline mb-0 cyan--text">{{ resource.category }}</h4>
              <h5 class="primary--text mt-2">{{ resource.title }}</h5>
              <div>{{ resource.body }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click.stop="goToResource(resource.id)">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :length="totalPages"
        @input="paginateResources"
        class="mx-auto mt-4"
      ></v-pagination>

      <v-overlay :value="loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-overlay>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      programmersResources: [],
      searchQuery: '',
      alert: '',
      loading: false,
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    sortedProgrammersResources() {
      if (Array.isArray(this.programmersResources)) {
        return this.programmersResources.sort((resourceA, resourceB) => {
          return new Date(resourceB.date) - new Date(resourceA.date);
        });
      }
      return [];
    },
    filteredProgrammersResources() {
      return this.sortedProgrammersResources.filter(resource =>
        resource.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        resource.body.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPages() {
      return Math.ceil(this.filteredProgrammersResources.length / this.itemsPerPage);
    },
    paginatedResources() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProgrammersResources.slice(startIndex, endIndex);
    },
  },
  methods: {
    fetchResources() {
      this.loading = true;
      this.$http.get('https://node-mu-nine.vercel.app/api/programmersresource')
        .then(response => {
          if (response.data && response.data.programmers) {
            this.programmersResources = response.data.programmers.map(resource => ({
              id: resource.id,
              category: resource.category,
              title: resource.title,
              imageUrl: resource.imageUrl,
              body: resource.body,
              date: resource.date,
              assignedUser: resource.assignedUser
            }));
          } else {
            console.error('Invalid response structure:', response.data);
          }
        })
        .catch(err => {
          console.error('Error fetching resources:', err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goToResource(resourceId) {
      this.$router.push({ path: `/resources/${resourceId}` });
    },
    paginateResources() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.paginatedResources = this.filteredProgrammersResources.slice(startIndex, endIndex);
    },

  },
  created() {
    if (this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
    this.fetchResources();
  },
};
</script>

<style scoped>
.resource-card {
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.resource-card:hover {
  transform: scale(1.05);
}
</style>
