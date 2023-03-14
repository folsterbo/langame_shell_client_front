<template>
    <div class="modal-field field-check">
        <div class="field-title">
            {{ title }}
        </div>
        <div class="field-value">
            <input
                type="checkbox"
                v-model="checkValue"
                @change="currentStatus = !currentStatus"
            >
            <span>{{ checkLabel }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FieldCheck',
    props: {
        title: {
            type: String,
        },
        value: {
            type: Boolean,
            required: true,
        },
		trueLabel: {
			type: String,
			required: false,
			default: 'Активная запись',
		},
		falseLabel: {
			type: String,
			required: false,
			default: 'Архивная запись',
		},
    },
    data: function () {
        return {
            checkValue: this.value,
            currentStatus: false,
        }
    },
    computed: {
        checkLabel: function () {
			return this?.checkValue ? this.trueLabel : this.falseLabel;
        },
    },
    watch: {
        checkValue: function (newVal) {
            this.$emit('update:value', newVal);
        },
        value: function (newVal) {
            this.checkValue = newVal;
        },
        currentStatus: function (status) {
            this.$emit('input-changes', status);
        },
    },
}
</script>

<style lang="scss" scoped>
.modal-field.field-check {
    display: flex;
    flex-direction: column;
    .field-title {
        margin-bottom: 0;
    }

    .field-value {
        display: flex;
        align-items: center;
    }
}
@supports(-webkit-appearance: none) or (-moz-appearance: none) {
    input[type='checkbox'] {
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 24px;
        width: 24px;
        outline: none;
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin-right: 12px;
        cursor: pointer;
        border: 2px solid #1867c0;
        border-radius: 4px;
        padding: 0;

        &:checked {
            background-color: #F5F5F5;
            border-color: #1867c0;

            &:after {
                content: '';
                display: block;
                position: absolute;
                width: 7px;
                height: 11px;
                border: 2px solid #1867c0 ;
                border-top: 0;
                border-left: 0;
                right: 6px;
                top: 2px;
                transform: rotateZ(45deg);
            }

            &:hover {
                background-color: #e7f0fb;
            }
        }

        &:disabled {
            opacity: .9;

            &:checked {
                background-color: gray;
            }
        }

        &:hover {
            &:not(:checked) {
                &:not(:disabled) {
                    border-color: #1867c0;
                    background-color: #e7f0fb;
                }
            }
        }
    }
}
</style>
