import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './components/Header';
import MainSection from './components/MainSection';
import * as TodoActions from './actions/TodoActions';

import {logFacebook, unlogFacebook} from './facebook/store';

@connect(state => ({
  todos: state.todos
}))
export default class TodoApp extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log("Did mount !!!!!!!!!!");
    
    function findFbLogged() {
      
    }
    
    const dispatch = this.props.dispatch;
    function whatWasAdded({removed, cookie, cause}) {
      if (cookie && cookie.domain === ".facebook.com") {
        console.log("event facebook event")
        if (cookie.name === "c_user") {
          if (removed) {
            console.log("event Facebook has been logout................");
            dispatch(unlogFacebook());
          } else {
            console.log("Event", {removed, cookie, cause});
            dispatch(logFacebook());
          }
        }
      }
    }
    
    chrome.cookies.onChanged.addListener(whatWasAdded)
  }

  testCookie() {
    function createUrlFromCookie(c) {
      return `http${c.secure ? "s" : ""}://${c.domain}${c.path}`;
    };
    function reloadFBTabs() {
      console.log("Will reload tabs");
      chrome.tabs.query({url:"*://*.facebook.com/*"}, function(rr){ rr.forEach(function(r){
        console.log("Tab", r);
        chrome.tabs.reload(r.id)}
      )});
    }
    
    const details = {
      domain: ".facebook.com",
    };
    console.log(details);
    chrome.cookies.getAll(details, (cookies) => {
      cookies.forEach((one) => {
        if (one.name === "c_user") {
          console.log("will remove this cookie", one);
          chrome.cookies.remove({
            url: createUrlFromCookie(one),
            name: one.name,
          }, (d) => {
            console.log("cookie removed", d);
            reloadFBTabs();
          });
        }
      });
      
    });
  }

  render() {
    const { todos, dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    return (
      <div>
        <button onClick={this.testCookie}>Show</button>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}
/*
function between(s) {
  var start = "<body";
  var end = "</body";
var  s.substring(s.indexOf(start) + start.length, s.indexOf(end));
}


var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.facebook.com/settings?tab=security&section=sessions&view", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // innerText does not let the attacker inject HTML elements.
    console.log(xhr.responseText);
  }
}
xhr.send();

*/