<template>
    <div class="d-flex flex-column">
        <div class="d-flex flex-wrap">
            <div v-for="(program, i) in programs" :key="i" class="d-flex flex-column align-center px-2 pb-2 pt-10 program"
            @click="programSet(program['name'])">
                <div class="program-img"></div>
                <div class="d-flex text-subtitle-1 program-name pt-2">{{ program.name }}</div>
                <div class="program-edit" v-show="isVisible(program)">
                    <v-btn icon color="indigo" @click="editProgram(program['id'])">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="indigo" @click="deleteProgram(program['id'])">
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
        <v-alert v-if="programClicked"  dismissible type="success" class="alert" @input="programClicked=false">Программа {{ lastClickedProgramName }} запущена</v-alert>
    </div>
</template>

<script>
export default {
    name: 'ThePrograms',
    components: {},
    props: {
    },
    data: function () {
        return {
            lastHoveredProgramId: 0,
            programClicked: false,
            lastClickedProgramName: '',
            programs: [],
        }
    },
    computed: {
        requestRoute: function () {
            return process.env.VUE_APP_HOST + '/shell/programs';
        },
    },
    methods: {
        isVisible(program) {
            return program['id'] === this.lastHoveredProgramId;
        },
        editProgram(id) {
            this.$router.push('/applications/programs/' + id)
        },
        programSet(name) {
            this.lastClickedProgramName = name;
            this.programClicked = true;
        },
        updateData() {
            this.axios.get(
                this.requestRoute,
            ).then(response => {
                if (response.data?.success) {
                    this.programs = response?.data?.items;
                } else {
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

<style  lang="scss">
.program {
    width: 150px;
    position: relative;
}

.program-edit {
    position: absolute;
    top: 2px;
    right: 20px;
    display: flex;
}

.program-img {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    background-color: #1867c0;
    object-fit: scale-down;
    object-position: center center;
}

.program:hover {
    cursor: pointer;
}

.program-name {
    width: 80px;
}
.alert {
    position: fixed;
    bottom: 0;
    right: 32px;
}
</style>
