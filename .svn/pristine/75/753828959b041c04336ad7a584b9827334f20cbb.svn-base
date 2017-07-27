import Vue from 'vue';
import VeeValidate, {
  Validator
} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';

const dictionary = {
  zh_CN
};
const config = {
  errorBagName: 'errors2', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'zh_CN',
  dictionary: null,
  strict: true,
  enableAutoClasses: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true
};

//配置验证规则
const validateRules = {
    mobile: {
      messages: {
        zh_CN: field => '手机号码输入不正确',
      },
      validate: value => {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
      }
    },
    idCard: {
      messages: {
        zh_CN: field => '身份证号码输入不正确',
      },
      validate: value => {
        var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        //18位
        var regs =
          /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        return reg.test(value) || regs.test(value);
      }
    },
    passWord: {
      messages: {
        zh_CN: field => '密码需为8-16位数字与字母组合',
      },
      validate: value => {
        let reg1 = /\d+/;
        let reg2 = /[a-zA-Z]/;
        return value.length >= 8 && value.length <= 16 &&reg1.test(value) && reg2.test(value);
      }
    }
  }
  /*
  表单校验方法
  param:form 为vue实例的fields
  */
  /*Vue.prototype.$formValidate = (form) => {
      let invalid = true;
      Object.keys(form).some(key => {
          if (!form[key].valid) {
              invalid = false;
              return;
          }
      });
      return invalid;
  }*/
  //添加验证规则
Object.keys(validateRules).forEach((key) => {
  Validator.extend(key, validateRules[key]);
});

Validator.updateDictionary(dictionary);
Vue.use(VeeValidate, config);
