
export default {

    namespace: 'header',

    state: {
        activeIndex: 0
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'save' });
        },
    },

    reducers: {
        activeIndex(state, { payload }) {
            let { activeIndex } = payload;
            console.log(`来自reducer的${activeIndex}`);
            return {
                activeIndex: activeIndex
            }
        }
    },

};
