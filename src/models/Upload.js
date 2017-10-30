import upload from '../utils/upload';

export default {

    namespace: 'upload',

    state: {
        fileList: [],
        text: ''
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line

        },
    },

    effects: {
        *postNote({ payload }, { call, put }) {  // eslint-disable-line
            var add = (async function () {
                return await upload.upload(payload, 'light')
            })();

            yield put({ type: 'clearPost' });
            yield put({ type: 'post/getPosts', payload: { username: payload.username } });
        }
    },

    reducers: {
        addPic(state, { payload }) {
            return Object.assign({}, state, {
                fileList: [...state.fileList, payload.fileList]
            });
        },
        deletePic(state, { payload }) {
            const { index } = payload;
            return Object.assign({}, state, {
                fileList: [...state.fileList.slice(0, index), ...state.fileList.slice(index + 1)]
            });
        },
        sendText(state, { payload }) {
            const { text } = payload;
            return Object.assign({}, state, {
                text: text
            })
        },
        clearPost(state) {
            return Object.assign({}, state, {
                fileList: [],
                text: ''
            })
        }
    },

};
