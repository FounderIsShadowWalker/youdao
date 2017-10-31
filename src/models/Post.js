import { getPosts, getLatestPosts } from '../services/index';
const size = 5;

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
        //这是刷新获取post的方法，每次获取3条
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

        //这是获取最新插入的那条消息
        *insertPosts({ payload }, { call, put, select }) {
            let postValue = yield getLatestPosts({
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            yield put({ type: 'insertPost', payload: postValue });
        }
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },

        savePost(state, { payload }) {
            const { data } = payload;
            return Object.assign({}, state, {
                data: [...state.data, ...data[0].messages],
                index: state.data.length + state.size,
                spin: false
            })
        },

        setSpin(state) {
            return Object.assign({}, state, {
                spin: true
            })
        },

        insertPost(state, { payload }) {
            const { data } = payload;
            return Object.assign({}, state, {
                data: [...data[0].messages, ...state.data],
                index: state.data.length + 1,
                spin: false
            })
        }
    },

};
