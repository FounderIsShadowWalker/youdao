import { getPosts, getLatestPosts, saveRemark } from '../services/index';
import socket from '../socket';
import { message } from 'antd';

const size = 5;

export default {

    namespace: 'post',

    state: {
        index: 0,
        size: size,
        spin: false,
        insert: false,
        data: [

        ]
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
            return history.listen(({ pathname, query }) => {

                if (pathname.indexOf('/UserPage') >= 0) {
                    socket.on('clientMessage', (data) => {
                        //console.log(`我收到了新消息: ${data}`, test);
                        //dispatch({ type: 'newPostHint', payload: { data } });     //不要插入了 提示就好了
                        dispatch({ type: 'setInsert' });
                        message.info(`${data}发送了新消息`);
                    })

                    socket.on('clientRemark', (data, username) => {
                        dispatch({ type: 'setInsert' });
                        message.info(`${data}评论了你`);
                    })
                }
            })
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

            if (payload.reload) {
                yield put({ type: 'reloadPost', payload: postValue });
            } else {
                yield put({ type: 'savePost', payload: postValue });
            }

            yield put({ type: 'clearSpin' });
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
        },

        *saveRemark({ payload }, { call, put, select }) {
            let { username, rusername, time, text } = payload;

            yield saveRemark({
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            yield put({
                type: 'setRemark', payload: {
                    username,
                    rusername,
                    time,
                    text
                }
            });

            payload.resolve();
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

        reloadPost(state, { payload }) {
            const { data } = payload;
            return Object.assign({}, state, {
                data: [...data[0].messages],
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
        },
        clearInsert(state) {
            return Object.assign({}, state, {
                insert: false,
                index: 0,
                spin: true
            })
        },
        setInsert(state) {
            return Object.assign({}, state, {
                insert: true,
                spin: false
            })
        },
        clearSpin(state) {
            return Object.assign({}, state, {
                spin: false
            })
        },
        setRemark(state, { payload }) {
            let { data } = state, { time } = payload, index = 0;

            data.map((message, i) => {
                if (message.time === time) {
                    index = i;
                }
            })

            data[index].remarks.push(payload);

            message.info('评论成功');

            return Object.assign({}, state, {
                data
            })
        }
    }
};
