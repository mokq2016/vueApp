<template>
    <input
        class="el-input-money"
        :value="currentValue"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
        @change.native = 'true'
        :disabled="disabled"
        :size="size"
        :max="max"
        :min="min"
        :decimalPlaces="decimalPlaces"
        :placeholder="placeholder"
        ref="input"
    ></input>
</template>
<script>
  import '../common/common';

  export default {
      name: 'ElInputMoney',
      props: {
          max: {
              type: [Number, Function],
              default: Infinity,
          },
          min: {
              type: [Number, Function],
              default: -Infinity,
          },
          value: {
              type: [Number, String],
              default: '0.00',
          },
          decimalPlaces: {
              type: Number,
              default: 2,
          },
          placeholder: String,
          disabled: Boolean,
          size: String,
      },
      data() {
          return {
              currentValue: '0.00',
              oldValue: '',
              displayValue: '',
          };
      },
      watch: {
          value: {
              immediate: true,
              handler(value) {
                  console.log(value)
              },
          },
      },
      methods: {
          handleBlur(e) {
              this.setCurrentValue(this.currentValue);
              this.$emit('input', this.currentValue);
              //this.displayValue = this.currentValue.toMoney();
              if (this.oldValue === this.currentValue) return;
                this.value = this.currentValue
             /* if (e) {
                  this.$emit('input', this.currentValue);
              }*/

              

              this.oldValue = this.currentValue;
          },
          handleFocus() {

              //this.$refs.input.inputSelect();
              //
          },
          handleInput(e) {
            var target = e.target || e.srcElement;
            this.currentValue = target.value;
              //this.currentValue = value.replace(/,/g, '');
          },
          setCurrentValue(value) {
              if ((`${value}`).trim() === '') return;
              let newVal = Number(value);
              if (isNaN(newVal)) {
                  this.currentValue = this.oldValue;
                  return;
              }
              if (newVal >= this.max) newVal = this.max;
              if (newVal <= this.min) newVal = this.min;
              if (this.oldValue === newVal) return;
              this.currentValue = newVal.toFixed(this.decimalPlaces);
          },
      },
  };
</script>

