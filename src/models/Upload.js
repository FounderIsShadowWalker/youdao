import upload from '../utils/upload';
import socket from '../socket';

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
            // 通知新用户   
            // console.log('post message', payload);
            // socket.emit('message', payload);
            yield upload.upload(payload, 'light');   //上传
            yield put({ type: 'clearPost' });        //清除剪贴板

            //yield put({ type: 'post/getPosts', payload: { username: payload.username } });  //刷新post
            yield put({ type: 'post/insertPosts', payload: { username: payload.username } });
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
