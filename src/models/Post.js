import { getPosts } from '../services/index';
const size = 3;

export default {

    namespace: 'post',

    state: {
        index: 0,
        size: size,
        spin: false,
        data: [

        ]
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },

    effects: {
        *getPosts({ payload }, { call, put, select }) {  // eslint-disable-line
            let postModel = yield select(state => state.post);
            let queryBody = {
                ...payload,
                index: postModel.index,
                size: postModel.size
            }
            let postValue = yield getPosts({
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(queryBody)
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
                data: [...state.data, ...data[0].messages],
                index: state.index + state.size,
                spin: false
            })
        },
        setSpin(state) {
            return Object.assign({}, state, {
                spin: true
            })
        }
    },

};
