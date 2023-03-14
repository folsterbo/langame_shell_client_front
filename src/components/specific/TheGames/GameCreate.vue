<template>
    <div class="d-flex flex-column">
        <div class="back-navigation text-subtitle-1" @click="$router.push('/applications/games')">
            <i class="mdi mdi-chevron-left"></i>
            Назад
        </div>
        <h2 class="pt-2 mb-6">Создание игры</h2>
        <div class="d-flex justify-space-between">
            <div class="d-flex flex-column two-columns">
                <field-edit title="Название игры" placeholder="Введите название игры" :initial-value.sync="gameName"
                    class="mb-6" @validate-errors-detected="validateErrors.gameName = true"
                    @validate-errors-resolved="validateErrors.gameName = false" :validator="{
                        rule_required: true,
                        rule_required_description: 'Заполните обязательное поле',
                    }"></field-edit>

                <field-edit title="Путь к игре" placeholder="Введите путь к игре" :initial-value.sync="gamePath1"
                    class="mb-4" @validate-errors-detected="validateErrors.gamePath1 = true"
                    @validate-errors-resolved="validateErrors.gamePath1 = false" :validator="{
                        rule_required: true,
                        rule_required_description: 'Заполните обязательное поле',
                    }"></field-edit>
                <field-edit placeholder="Введите путь к игре" :initial-value.sync="gamePath2" class="mb-4"></field-edit>
                <field-edit placeholder="Введите путь к игре" :initial-value.sync="gamePath3" class="mb-6"></field-edit>

                <field-edit title="Аргумент командной строки" placeholder="Введите аргумент командной строки"
                    :initial-value.sync="gameArgs" class="mb-6" @validate-errors-detected="validateErrors.gameArgs = true"
                    @validate-errors-resolved="validateErrors.gameArgs = false" :validator="{
                        rule_required: true,
                        rule_required_description: 'Заполните обязательное поле',
                    }"></field-edit>

                <field-edit title="Рабочая директория" placeholder="Укажите рабочую директорию"
                    :initial-value.sync="gameWorkDir" class="mb-6"
                    @validate-errors-detected="validateErrors.gameWorkDir = true"
                    @validate-errors-resolved="validateErrors.gameWorkDir = false" :validator="{
                        rule_required: true,
                        rule_required_description: 'Заполните обязательное поле',
                    }"></field-edit>

                <field-edit title="Скрипт запуска" placeholder="Введите скрипт запуска"
                    :initial-value.sync="gameDescription" class="mb-6"
                    @validate-errors-detected="validateErrors.gameDescription = true"
                    @validate-errors-resolved="validateErrors.gameDescription = false" :validator="{
                        rule_required: true,
                        rule_required_description: 'Заполните обязательное поле',
                    }"></field-edit>

                <div class="text-subtitle-1 mb-2">Возрастное ограничение</div>
                <field-check class="mb-6" :value.sync="gameData.age_restrictions" true-label="Ограничить возрастной контент"
                    false-label="Ограничить возрастной контент"></field-check>

                <!--<div v-show="gameData.age_restrictions" class="mb-6">
                    <v-btn-toggle v-model="gameData.age_restrictions">
                        <v-btn>
                            0+
                        </v-btn>
                        <v-btn>
                            6+
                        </v-btn>
                        <v-btn>
                            12+
                        </v-btn>
                        <v-btn>
                            16+
                        </v-btn>
                        <v-btn>
                            18+
                        </v-btn>
                    </v-btn-toggle>
                </div>-->

                <div class="text-subtitle-1 mb-2">Дополнительно</div>
                <field-check class="mb-6" :value.sync="gameData.is_for_admin" true-label="Запускать от имени администратора"
                    false-label="Запускать от имени администратора"></field-check>

                <v-btn color="primary" x-large @click="createGame()">Создать</v-btn>
            </div>
            <div class="d-flex flex-column two-columns">
                <div>
                    <div class="text-subtitle-1 mb-6">Обложка игры</div>
                    <game-avatar-input v-model="form.avatar"
                        :default-src="require('../../../assets/img/default_image.png')" class="mb-6" @fileChanged="getCoverPath"></game-avatar-input>
                </div>

                <div v-if="isCreateError" class="d-flex flex-column field-error">
                    <div class="text-subtitle-1 mb-2">{{ errorMsg }}</div>
                    <div v-for="(error, errorIndex) in errors" :key="errorIndex" class="text-subtitle-2 mb-2">
                        {{ error }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import FieldEdit from '../../common/FieldEdit.vue'
import FieldCheck from '../../common/FieldCheck.vue'
import GameAvatarInput from '../../common/GameAvatarInput.vue'
export default {
    name: 'GameCreate',
    components: { GameAvatarInput, FieldEdit, FieldCheck },
    props: {
    },
    data: function () {
        return {
            form: {
                avatar: null,
            },
            gameData: {
                name: '',
                path1: '',
                path2: '',
                path3: '',
                args: '',
                work_dir: '',
                is_for_admin: false,
                age_restrictions: false,
                icon: '',
                cover: '',
                description: '',
            },
            isCreateError: false,
            validateErrors: {},
            errorMsg: '',
            errors: {},
        }
    },
    computed: {
        requestRoute: function () {
            return process.env.VUE_APP_HOST + '/shell/games';
        },
        gameName: {
            get: function () {
                return this?.gameData?.name ?? '';
            },
            set: function (newVal) {
                this.gameData.name = newVal;
            },
        },
        gamePath1: {
            get: function () {
                return this?.gameData?.path1 ?? '';
            },
            set: function (newVal) {
                this.gameData.path1 = newVal;
            },
        },
        gamePath2: {
            get: function () {
                return this?.gameData?.path2 ?? '';
            },
            set: function (newVal) {
                this.gameData.path2 = newVal;
            },
        },
        gamePath3: {
            get: function () {
                return this?.gameData?.path3 ?? '';
            },
            set: function (newVal) {
                this.gameData.path3 = newVal;
            },
        },
        gameArgs: {
            get: function () {
                return this?.gameData?.args ?? '';
            },
            set: function (newVal) {
                this.gameData.args = newVal;
            },
        },
        gameWorkDir: {
            get: function () {
                return this?.gameData?.work_dir ?? '';
            },
            set: function (newVal) {
                this.gameData.work_dir = newVal;
            },
        },
        gameDescription: {
            get: function () {
                return this?.gameData?.description ?? '';
            },
            set: function (newVal) {
                this.gameData.description = newVal;
            },
        },
    },
    methods: {
        createGame() {
            const url = this.requestRoute;
            const data = this.gameData;

            this.axios.post(url,
                { data },
            ).then(response => {
                if (response.data?.success) {
                    this.$router.push('/applications/games');
                } else {
                    this.isCreateError = true;
                    this.errorMsg = response?.data.message;
                    this.errors = response?.data.errors;
                    console.log(response?.data);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        getCoverPath(data) {
            const fileName = data;
            this.gameData.cover = fileName;
        }
    },
}

</script>

<style  lang="scss">
.back-navigation {
    display: flex;
    color: gray;
    cursor: pointer;
    width: fit-content;
}

.back-navigation:hover {
    color: #DBE7F5;
}
</style>
