
const showModal = (obj, key) => {
    Object.keys(obj).forEach((item) => {
        if (item === key) {
            obj[item] = true;
        } else {
            obj[item] = false;
        }
    });
    return obj;
}

const hideModal = (obj, key) => {
    Object.keys(obj).forEach((item) => {
        obj[item] = false;
    });
    return obj;
}


export default {
    namespace: 'modal',

    state: {
        loginVisible: false,
        registerVisible: false
    },

    reducers: {
        show(state, { payload }) {
            const { modalVisible } = payload;
            return Object.assign({}, state, showModal(state, modalVisible));
        },

        hide(state) {
            return Object.assign({}, state, hideModal(state));
        }
    },

    effects: {
        *fetch({ payload: { data } }, { call, put }) {
            console.log(data);
        }

    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/') {
                    dispatch({ type: 'fetch', payload: { data: 1111 } })
                }
            });
        }
    }
}