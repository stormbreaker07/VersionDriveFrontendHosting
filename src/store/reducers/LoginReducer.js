import { LOGGED_OUT ,LOGGED_IN_REQUEST , LOGGED_IN_SUCCESS ,LOGGED_IN_ERROR, LOGGED_IN} from "../staticVariable";

const initialLogginState = {
    loading : false,
    data : {} ,
    status : LOGGED_OUT 
}




export const loginReducer = (state = initialLogginState , action) => {

    switch(action.type) {
        case LOGGED_IN_REQUEST : return{
            loading : true,
            data : action.payload ,
            status : LOGGED_OUT
        }
        case LOGGED_IN_SUCCESS : return{
            loading : false,
            data : action.payload,
            status : LOGGED_IN
        }
        case LOGGED_IN_ERROR : return{
            loading : false,
            data : action.payload,
            status : LOGGED_OUT
        }
        case LOGGED_OUT : return{
            loading : false,
            data : [],
            status : LOGGED_OUT
        }
        default : return state; 
    }
}