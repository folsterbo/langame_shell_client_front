<template>
    <v-list shaped>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="$router.push(item.url)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</template>

<script>
export default {
  name: 'TheMenu',
  data: function () {
    return {
      items: [
        { text: 'Приложения', icon: 'mdi-apps', url: '/applications/games' },
      ],
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
