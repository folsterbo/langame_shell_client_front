<template>
    <div class="d-flex flex-column">
        <div class="back-navigation text-subtitle-1" @click="$router.push('/applications/games')">
            <i class="mdi mdi-chevron-left"></i>
            Назад
        </div>
        <h2 class="pt-2 mb-6">Редактирование игры</h2>
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
                <field-check class="mb-6" :value.sync="ageRestrictions" true-label="Ограничить возрастной контент"
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
                <field-check class="mb-6" :value.sync="isForAdmin" true-label="Запускать от имени администратора"
                    false-label="Запускать от имени администратора"></field-check>

                <div class="d-flex justify-space-between">
                    <v-btn color="two-columns" x-large @click="deleteGame()">Удалить</v-btn>
                    <v-btn color="primary two-columns" x-large @click="updateGame()">Сохранить</v-btn>
                </div>
            </div>
            <div class="d-flex flex-column two-columns">
                <div>
                    <div class="text-subtitle-1 mb-6">Обложка игры</div>
                    <game-avatar-input v-model="form.avatar" :default-src="require('../../../assets/img/default_image.png')"
                        class="mb-6"></game-avatar-input>
                </div>

                <div v-if="isUpdateError" class="d-flex flex-column field-error">
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
    name: 'GameEdit',
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
            isUpdateError: false,
            validateErrors: {},
            errorMsg: '',
            errors: {},
        }
    },
    computed: {
        requestRoute: function () {
            return process.env.VUE_APP_HOST + '/shell/games/' + this.$route.params.id;
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
        ageRestrictions: {
            get: function () {
                if (this.gameData.age_restrictions) {
                    return true
                } return false
            },
            set: function (newVal) {
                this.gameData.age_restrictions = newVal;
            },
        },
        isForAdmin: {
            get: function () {
                if (this.gameData.is_for_admin) {
                    return true
                } return false
            },
            set: function (newVal) {
                this.gameData.is_for_admin = newVal;
            },
        },
        gameCover: function () {
            return require('@/assets/img/' + this.gameData.cover);
        }
    },
    methods: {
        updateData() {
            this.axios.get(
                this.requestRoute
            ).then(response => {
                if (response.data?.success) {
                    this.gameData = response?.data?.payload;
                } else {
                    this.isUpdateError = true;
                    this.errorMsg = response?.data.message;
                    this.errors = response?.data.errors;
                    console.log(response?.data);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        updateGame() {
            const url = this?.requestRoute;
            const data = this?.gameData;

            this.axios.put(url,
                { data },
            ).then(response => {
                if (response.data?.success) {
                    this.$router.push('/applications/games')
                } else {
                    this.isUpdateError = true;
                    this.errorMsg = response?.data.message;
                    this.errors = response?.data.errors;
                    console.log(response?.data);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        deleteGame() {
            const url = this?.requestRoute;
            this.axios.delete(
                url,
            ).then(response => {
                if (response.data?.success) {
                    this.$router.push('/applications/games')
                } else {
                    this.isUpdateError = true;
                    this.errorMsg = response?.data.message;
                    this.errors = response?.data.errors;
                    console.log(response?.data);
                }
            }).catch(error => {
                console.log(error);
            });
        },
    },
    created() {
        this.updateData();
    },
}

</script>
