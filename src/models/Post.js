import { getPosts } from '../services/index';

export default {

    namespace: 'post',

    state: {
        data: [

        ]
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *getPosts({ payload }, { call, put }) {  // eslint-disable-line


            let postValue = yield getPosts({
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })


            yield put({ type: 'savePost', payload: postValue });
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        savePost(state, { payload }) {
            const { data } = payload;
            return Object.assign({}, state, {
                data: data[0].messages
            })
        }
    },

};
