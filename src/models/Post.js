import { getPosts, getLatestPosts } from '../services/index';
import socket from '../socket';
import { message } from 'antd';

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
            return history.listen(({ pathname, query }) => {

                if (pathname.indexOf('/UserPage') >= 0) {
                    console.log('注册socket事件');
                    socket.on('clientMessage', (data, postValue) => {
                        //console.log(`我收到了新消息: ${data}`, test);
                        console.log('正不正常 你心里没有点b数吗', postValue);
                        dispatch({ type: 'insertPost', payload: { data: postValue } });
                        message.info(`${data}发送了新消息`);
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

            console.log('正常的insertPost', postValue);

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
