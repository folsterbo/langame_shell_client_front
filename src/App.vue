<template>
  <v-app>
    <v-main>
      <v-container class="pa-8">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: { },
  data: function () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style lang='scss'>
@import 'App.scss';
</style>
