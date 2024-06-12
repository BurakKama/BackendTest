<template>
  <div>
    <h1>Backend Verisi</h1>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }} - {{ item.description }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      items: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:3000/api/data')
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.error('Veri getirme hatası:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Scoped CSS */
</style>
