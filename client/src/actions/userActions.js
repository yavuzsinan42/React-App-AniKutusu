import {AUTH, SIGNUP_FAIL} from '../constants/actionsConstants.js'
import * as api from '../axios'

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData)
        dispatch({type: AUTH, payload: data})

        navigate("/")
    }
    catch (error) {
        dispatch({type: SIGNUP_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}