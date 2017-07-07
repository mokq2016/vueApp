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
                zh_CN: field => '身份证号输入不正确',
            },
            validate: value => {
                return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
            }
        }
    }
    /*
    表单校验方法
    param:form 为vue实例的fields
    */
Vue.prototype.$formValidate = (form) => {
    let invalid = true;
    Object.keys(form).some(key => {
        if (!form[key].valid) {
            invalid = false;
            return;
        }
    });
    return invalid;
}
//添加验证规则
Object.keys(validateRules).forEach((key) => {
	Validator.extend(key,validateRules[key]);
});

Validator.updateDictionary(dictionary);
Vue.use(VeeValidate, config);
