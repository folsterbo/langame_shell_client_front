<template>
    <div class="d-flex flex-column">
        <div class="back-navigation text-subtitle-1" @click="$router.push('/applications/programs')">
            <i class="mdi mdi-chevron-left"></i>
            Назад
        </div>
        <h2 class="pt-2 mb-6">Редактирование программы</h2>
        <div class="d-flex justify-space-between">
            <div class="d-flex flex-column two-columns">
                <field-edit title="Название программы" placeholder="Введите название программы" :initial-value.sync="programName"
                    class="mb-6"></field-edit>

                <field-edit title="Путь к программе" placeholder="Введите путь к программе" :initial-value.sync="programPath1"
                    class="mb-4"></field-edit>
                <field-edit placeholder="Введите путь к программе" :initial-value.sync="programPath2" class="mb-4"></field-edit>
                <field-edit placeholder="Введите путь к программе" :initial-value.sync="programPath3" class="mb-6"></field-edit>

                <field-edit title="Путь к иконке" placeholder="Введите путь к иконке" :initial-value.sync="programIcon"
                    class="mb-6"></field-edit>

                <field-edit title="Аргумент командной строки" placeholder="Введите аргумент командной строки" :initial-value.sync="programArgs"
                    class="mb-6"></field-edit>

                <field-edit title="Рабочая директория" placeholder="Укажите рабочую директорию" :initial-value.sync="programWorkDir"
                    class="mb-6"></field-edit>

                <field-edit title="Скрипт запуска" placeholder="Введите скрипт запуска" :initial-value.sync="programDescription"
                    class="mb-6"></field-edit>

                <div class="text-subtitle-1 mb-2">Дополнительно</div>
                <field-check class="mb-6" :value.sync="isForAdmin" true-label="Запускать от имени администратора"
                    false-label="Запускать от имени администратора"></field-check>

                    <div class="d-flex justify-space-between">
                    <v-btn color="two-columns" x-large @click="deleteProgram()">Удалить</v-btn>
                    <v-btn color="primary two-columns" x-large @click="updateProgram()">Сохранить</v-btn>
                </div>
            </div>
            <div class="d-flex flex-column two-columns align-center">
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

export default {
    name: 'ProgramEdit',
    components: { FieldEdit, FieldCheck },
    props: {
    },
    data: function () {
        return {
            form: {
                avatar: null,
            },
            programData: {
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
            return process.env.VUE_APP_HOST + '/shell/programs/' + this.$route.params.id;
        },
        programName: {
            get: function () {
                return this?.programData?.name ?? '';
            },
            set: function (newVal) {
                this.programData.name = newVal;
            },
        },
        programIcon: {
            get: function () {
                return this?.programData?.icon ?? '';
            },
            set: function (newVal) {
                this.programData.icon = newVal;
            },
        },
        programPath1: {
            get: function () {
                return this?.programData?.path1 ?? '';
            },
            set: function (newVal) {
                this.programData.path1 = newVal;
            },
        },
        programPath2: {
            get: function () {
                return this?.programData?.path2 ?? '';
            },
            set: function (newVal) {
                this.programData.path2 = newVal;
            },
        },
        programPath3: {
            get: function () {
                return this?.programData?.path3 ?? '';
            },
            set: function (newVal) {
                this.programData.path3 = newVal;
            },
        },
        programArgs: {
            get: function () {
                return this?.programData?.args ?? '';
            },
            set: function (newVal) {
                this.programData.args = newVal;
            },
        },
        programWorkDir: {
            get: function () {
                return this?.programData?.work_dir ?? '';
            },
            set: function (newVal) {
                this.programData.work_dir = newVal;
            },
        },
        programDescription: {
            get: function () {
                return this?.programData?.description ?? '';
            },
            set: function (newVal) {
                this.programData.description = newVal;
            },
        },
        isForAdmin: {
            get: function () {
                if (this.programData.is_for_admin) {
                    return true
                } return false
            },
            set: function (newVal) {
                this.programData.is_for_admin = newVal;
            },
        },
    },
    methods: {
        updateData() {
            this.axios.get(
                this.requestRoute
            ).then(response => {
                if (response.data?.success) {
                    this.programData = response?.data?.payload;
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
        updateProgram() {
            const url = this?.requestRoute;
            const data = this?.programData;

            this.axios.put(url,
                { data },
            ).then(response => {
                if (response.data?.success) {
                    this.$router.push('/applications/programs')
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
        deleteProgram() {
            const url = this?.requestRoute;
            this.axios.delete(
                url,
            ).then(response => {
                if (response.data?.success) {
                    this.$router.push('/applications/programs')
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
