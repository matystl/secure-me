

const LOG_FACEBOOK = "log_facebook";
const UNLOG_FACEBOOK = "unlog_facebook";

const initState = {
	isLogged: false
}

export function reducer(state = initState, action) {
  switch (action.type) {
    case LOG_FACEBOOK: {
      return {...state, isLogged: true};  
    }
	case UNLOG_FACEBOOK: {
      return {...state, isLogged: false};  
    }
    default: return state;
  }
}

export function logFacebook() {
	return {
		type: LOG_FACEBOOK
	}	
}

export function unlogFacebook() {
	return {
		type: UNLOG_FACEBOOK
	}		
}