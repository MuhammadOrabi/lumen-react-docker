/**
 * Created by wangsiyuan on 14/12/17.
 */
const initialState = {
    demoString: window.localLanguage.Hello,
    isError: false
};

export default {
    initialState,
    namespace: 'app',
    state: initialState,
    effects: {
    },
    reducers: {
        showError (state) {
            return { ...state, isError: true };
        }
    }
};

