import zhCn from './zh-cn';
import enUs from './en-us';

const languages = {
    'zh-cn': zhCn,
    'en-us': enUs
};

const langStringDefault = 'zh-cn';
const langString = window.navigator
    && window.navigator.language
    && window.navigator.language.toString().toLowerCase()
    || langStringDefault;

window.localLanguage = languages[langString] || languages['zh-cn'];

