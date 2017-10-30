import { getUsers } from '../services/index';

export default {
    namespace: 'qqnumber',
    state: {
        userList: []
    },
    effects: {
        *fetchUser({ payload }, { call, put }) {
            let result = yield getUsers({
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            yield put({ type: 'saveUsers', payload: result });
        }
    },
    reducers: {
        saveUsers(state, { payload }) {
            const { data } = payload;
            return Object.assign({}, state, {
                userList: data
            })
        }
    }
}