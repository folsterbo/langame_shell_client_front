<template>
    <div class="d-flex flex-column">
        <div class="d-flex flex-wrap">
            <div v-for="(game, i) in games" :key="i" class="d-flex flex-column align-center px-2 pb-2 pt-10 game"
            @click="gameSet(game['name'])">
                <img :src="gameCover(game['cover'])" alt="img" class="game-img">
                <div class="d-flex text-subtitle-1 game-name pt-2">{{ game.name }}</div>
                <div class="game-edit" v-show="isVisible(game)">
                    <v-btn icon color="indigo" @click="editGame(game['id'])">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="indigo" @click="deleteGame(game['id'])">
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <v-alert v-if="gameClicked" dismissible type="success" class="alert" @input="gameClicked=false;">
            Игра {{ lastClickedGameName }} запущена
        </v-alert>
    </div>
</template>

<script>
export default {
    name: 'TheGames',
    components: {},
    props: {
    },
    data: function () {
        return {
            lastClickedGameName: '',
            gameClicked: false,
            /*games: [
                {
                    id: 1,
                    name: 'World of Warcraft',
                    cover: require('../../assets/img/2023-03-03-the-cabin-on-the-lake-1-58020.jpeg')
                },
                {
                    id: 2,
                    name: 'Apex Legends',
                    cover: require('../../assets/img/2023-03-06-the-top-of-the-mountain-1-58073.jpeg')
                },
                {
                    id: 3,
                    name: 'The Elder Scrolls 5: Skyrim',
                    cover: require('../../assets/img/2023-03-07-kitty-1-58107.jpeg')
                },
                {
                    id: 4,
                    name: 'Batman: Arkham City',
                    cover: require('../../assets/img/2023-03-08-northern-cardinal-1-58144.jpeg')
                },
                {
                    id: 5,
                    name: 'Starfield',
                    cover: require('../../assets/img/starfield-mobile.jpg')
                },
                {
                    id: 6,
                    name: 'Diablo IV',
                    cover: require('../../assets/img/11ad4aa209-1_1390x600.jpg')
                },
                {
                    id: 7,
                    name: 'Star Wars Jedi: Survivor',
                    cover: require('../../assets/img/hhgwp96sk6gvzpdudurfog.jpeg')
                },
                {
                    id: 8,
                    name: 'Redfall',
                    cover: require('../../assets/img/redfall.jpeg')
                },
            ],*/
            lastHoveredGameId: 0,
            isUpdateError: false,
            games: [],
        }
    },
    computed: {
        requestRoute: function () {
            return process.env.VUE_APP_HOST + '/shell/games';
        },
    },
    methods: {
        isVisible(game) {
            return game['id'] === this.lastHoveredGameId;
        },
        editGame(id) {
            this.$router.push('/applications/games/' + id)
        },
        gameSet(name) {
            this.lastClickedGameName = name;
            this.gameClicked = true;
        },
        updateData() {
            this.axios.get(
                this.requestRoute,
            ).then(response => {
                if (response.data?.success) {
                    this.games = response?.data?.items;
                } else {
                    console.log(response?.data);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        gameCover(cover) {
            if (cover) {
                return require('@/assets/img/' + cover);
            }
            return require('@/assets/img/default_image.png');
        }
    },
    created() {
        this.updateData();
    },
}

</script>

<style  lang="scss">
.game {
    width: 190px;
    position: relative;
}

.game-edit {
    position: absolute;
    top: 2px;
    right: 20px;
    display: flex;
}

.game-img {
    width: 150px;
    height: 240px;
    border-radius: 12px;
    object-fit: cover;
    object-position: center center;
    background-color: #dbe7f5;
}

.game:hover {
    cursor: pointer;
}

.game-name {
    width: 150px;
}

.alert {
    position: fixed;
    bottom: 0;
    right: 32px;
}
</style>
