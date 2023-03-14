<template>
    <div>
        <div class="d-flex">
            <v-btn @click="$router.push('/applications/games')" class="ma-2" :class="{'active': this.$route.path.includes('/applications/games')}">Игры</v-btn>
            <v-btn @click="$router.push('/applications/programs')" class="ma-2" :class="{'active': this.$route.path.includes('/applications/programs')}">Программы</v-btn>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template> 

<script>

export default {
    name: 'TheApplications',
    components: {},
    data: function () {
        return {
        }
    },
    watch: {
    },
    computed: {
    },
    methods: {
    },
}

</script>

<style  lang="scss">
.v-btn.active {
    border: 2px solid #1867c0 !important;
}
</style>
