<template>
    <div :class="{'modal-field field-edit': true, 'validate-danger': isDangerField, 'validate-warning': isWarningField}">
        <div v-if="title" class="field-title text-subtitle-1 mb-2"
        :class="{'disabled': disabled}"
        >
            {{ title }}
        </div>
        <div class="field-value">
            <input
                :type="type"
                v-model="currentValue"
                v-focus="isFocused"
                :class="{'input': true, 'danger': isDangerField, 'warning': isWarningField}"
                :placeholder="placeholder"
                :disabled="disabled"
                :isValidationErrorsForbidden="isValidationErrorsForbidden"
                @focus="isInputFocused = true, $emit('field-edit-focus')"
                @blur="isInputFocused = false, $emit('field-edit-blur')"
            >
            <div class="input-items">
                <div v-show="this.isInputFocused" class="clear" @mousedown="resetInput" :class="{'disabled': !currentValue || disabled}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><path d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"></path></svg>
                </div>
            </div>
        </div>
        <div v-if="hasValidateError && !this.isInputFocused"
            :class="{'field-validate-error': true, 'danger': isDangerField}"
		>
            {{ validate }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'FieldEdit',
    props: {
        title: {
            type: String,
        },
        type: {
            type: String,
            default: function () {
                return 'text';
            },
        },
        initialValue: {
            type: String,
            required: true,
        },
        validator: {
            type: Object,
            required: false,
            default: function () {
                return {};
            },
        },
        isFocused: {
            type: Boolean,
            required: false,
            default: function () {
                return false;
            },
        },
        placeholder: {
            type: String,
            required: false,
            default: function () {
                return '';
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        isValidationErrorsForbidden: {
            type: Boolean,
            default: true,
        },
        isOgrnField: {
            type: Boolean,
            default: false,
        }
    },
    data: function () {
        return {
            currentValue: '',
            saveValue: false,
            currentStatus: false,
            hasValidateError: false,
            isInputFocused: false,
            isInit: false,
        }
    },
    computed: {
        validate: function() {
            if (!(this.isInit || this.currentValue)) {
                return ''
            }
            if (this?.validator?.rule_required && this.currentValue.length < 1 && this?.isValidationErrorsForbidden) {
                return this?.validator?.rule_required_description || 'Не заполнено обязательное поле';
            }
            if (this?.validator?.rule_min && this.currentValue.length < this.validator.rule_min) {
                return this?.validator?.rule_min_description || 'Недостаточно символов ';
            }
            if (this?.validator?.rule_max && this.currentValue.length > this.validator.rule_max) {
                return this?.validator?.rule_max_description || 'Превышено кол-во символов';
            }
            if (this?.validator?.rule_regex && this.currentValue.length < 1) {
                return '';
            }
            if (this?.validator?.rule_regex &&  -1 === this.currentValue.search(this.validator.rule_regex)) {
                return this?.validator?.rule_regex_help || this?.validator?.rule_regex_description || 'Не соответствует формату';
            }
            if (this?.isOgrnField) {
                let num = parseInt((parseInt(this.currentValue.slice(0, -1)) % 11).toString().slice(-1));
                if (num !== parseInt(this.currentValue[12])) {
                    return 'Некорректное контрольное число';
                }
            }
            return '';
        },
        isDangerField: function() {
           if (this.hasValidateError && this.isValidationErrorsForbidden && !this.isInputFocused) {
               return true
           } return false
        },
        isWarningField: function() {
           if (this.hasValidateError && !this.isValidationErrorsForbidden && !this.isInputFocused) {
               return true
           } return false
        },
    },
    methods: {
        resetInput() {
            this.currentValue = '';
        },
        typeChecking(newVal) {
            if (typeof this.saveValue === 'boolean') {
                this.saveValue = this.initialValue;
                this.$emit('update:initialValue', newVal);
            }
        },
    },
    updated() {
        this.isInit = true;
    },
    watch: {
        currentValue: function (newVal) {
            this.typeChecking(newVal)
            if (this.saveValue !== this.currentValue) {
                this.currentStatus = true;
                this.$emit('update:initialValue', newVal);
            } else {
                this.currentStatus = false;
                this.$emit('update:initialValue', newVal);
            }
            this.hasValidateError = !!this.validate;
        },
        initialValue: function (newVal) {
            this.currentValue = newVal;
        },
        currentStatus: function (status) {
            this.$emit('input-changes', status);
        },
        hasValidateError: function (newVal) {
            return newVal
                ? this.$emit('validate-errors-detected')
                : this.$emit('validate-errors-resolved');
        },
    },
    directives: {
        focus: {
            inserted: function (el, binding) {
                if (true === binding.initialValue) {
                    el.focus();
                }
            },
        },
    },
}
</script>

<style lang="scss" scoped>
input {
    background-color: #e7f0fb;
    border-radius: 4px;
    width: 100%;
    outline: none;
    border: 2px solid #e7f0fb;
    padding: 12px 42px 12px 10px;
    font-size: 16px;
    line-height: 24px;
    text-overflow: ellipsis;
}
input:focus {
    border: 2px solid #1867c0;
}
input:disabled {
    background-color: #D1D5DF;
    border: 2px solid #D1D5DF;
}
input.danger {
    background-color: rgba(238,63,88,.16);
    border: 2px solid rgba(238,63,88,.16);
}
.input-items {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    top: 0;
    height: 100%;
    margin-right: 16px;
}
.clear {
    cursor: pointer;
    fill: rgb(18, 18, 18, .5);
}
.clear:hover {
    fill: rgb(18, 18, 18);
}

.clear.disabled {
    display: none;
}
.field-value {
    position: relative;
}
.field-validate-error {
    font-size: 14px;
    margin-top: 4px;
    color: red;
}
</style>
