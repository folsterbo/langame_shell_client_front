<template>
    <div>
        <input type="file" accept="image/*" class="d-none" ref="file" @change="change">
        <div class="game-avatar" @mouseover="handleMouseOver()" @mouseout="handleMouseOut()">
            <img :src="src" alt="Avatar" class="game-avatar-img">
            <div class="game-avatar-btn-group" v-show="isVisible">
                <v-btn icon color="white" @click="browse()" class="game-avatar-load" large>
                    <v-icon>mdi-image-plus</v-icon>
                </v-btn>
                <v-btn v-if="file" icon color="white" @click="remove()" class="game-avatar-trash" large>
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'GameAvatarInput',
    props: {
        value: File,
        defaultSrc: String,
    },
    data() {
        return {
            src: this.defaultSrc,
            file: null,
            isVisible: false,
            fileName: null,
        }
    },
    methods: {
        handleMouseOver() {
            this.isVisible = true;
        },
        handleMouseOut() {
            this.isVisible = false;
        },
        browse() {
            this.$refs.file.click()
        },
        remove() {
            this.file = null;
            this.src = this.defaultSrc;
            this.$emit('input', this.file);
        },
        change(e) {
            this.file = e.target.files[0];
            this.fileName = e.target.files[0].name;
            this.$emit('fileChanged', this.fileName);
            this.$emit('input', this.file);
            let reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e) => {
                this.src = e.target.result;
            }
        }
    }
}
</script>

<style  lang="scss">
.game-avatar {
    display: flex;
    border-radius: 12px;
    width: 150px;
    height: 240px;
    position: relative;
    overflow: hidden;
}

.game-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    background-color: #dbe7f5;
}

.game-avatar-btn-group {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    bottom: 0;
    background-color: #1867c0;
}
</style>
