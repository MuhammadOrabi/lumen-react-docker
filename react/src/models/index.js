/**
 * Created by wangsiyuan on 14/12/17.
 */
import app from './app';

const models = [
    app
];

export default models.map((model) => {
    const { reducers, initialState = false } = model;
    if (!initialState) return model;

    return {
        ...model,
        reducers: {
            ...reducers,
            resetModel: () => ({ ...initialState })
        }
    };
});
