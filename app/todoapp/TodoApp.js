import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './components/Header';
import MainSection from './components/MainSection';
import * as TodoActions from './actions/TodoActions';

import {logFacebook, unlogFacebook} from './facebook/store';

import {vendors_map} from "../vendors.js";
    
const rest = "airbnb.svg  dropbox.svg        icloud.png  linkedin.svg  slack.svg  spotify.svg  twitter.svg  vk.png";


class Center extends Component {
  render() {
    const {padding = "20px", children, flex} = this.props;
    return ( <div style={{"flex-grow": 2, display: "flex", "justify-content":"center", "flex-direction":"column", padding: padding, flex}}>
      {children}
    </div>);
  }
}


@connect(state => ({
  todos: state.todos
}))
export default class TodoApp extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  state = {
    vendors: {
      
    }
  }

  componentDidMount() {
    console.log("Did mount !!!!!!!!!!");

    var logged = {};
    function forEachVendor(c) {
      Object.keys(vendors_map).forEach((key) => {
       c(key, vendors_map[key]);
      });
    };
    forEachVendor((key, vendor) => {
      console.log(vendor);
      var isLogged = false;
      chrome.cookies.getAll({domain:vendor.cookie.domain}, (cookies) => {
        cookies.forEach((one) => {
          if (one.name === vendor.cookie.name) {
            isLogged = true;
            logged[key] = true;
            console.log("Sluzba "+ vendor.name + "is logged");
          }
        });
      });
    });
    console.log (logged);
    
    this.setState({
      vendors: logged
    });
    
    

    const whatWasAdded = (a) => {
      var logged = this.state.vendors;
      
      var removed = a.removed;
      var cookie = a.cookie;
      var cause = a.cause;
      forEachVendor((key, vendor) => {
        if (cookie && cookie.domain === vendor.cookie.domain) {
          console.log("event", key)
          if (cookie.name === vendor.cookie.name) {
            if (removed) {
              console.log("event logout................");
              delete logged[key];
            } else {
              console.log("Event", {removed, cookie, cause});
              logged[key] = true;
            }
          }
        }
      });
      this.setState({vendors: logged})
    }
    chrome.cookies.onChanged.addListener(whatWasAdded)
  }
  

  logOut(item) {
    function createUrlFromCookie(c) {
      return `http${c.secure ? "s" : ""}://${c.domain}${c.path}`;
    };
    function reloadTabs() {
      console.log("Will reload tabs");
      chrome.tabs.query({url: item.reloadUrl}, function(rr){ rr.forEach(function(r){
        console.log("Tab", r);
        chrome.tabs.reload(r.id)}
      )});
    }
    
    const details = {
      domain: item.cookie.domain,
    };
    console.log("Details", details);
    
    chrome.cookies.getAll(details, (cookies) => {
      cookies.forEach((one) => {
        if (one.name === item.cookie.name) {
          console.log("will remove this cookie", one);
          chrome.cookies.remove({
            url: createUrlFromCookie(one),
            name: one.name,
          }, (d) => {
            console.log("cookie removed", d);
            reloadTabs();
          });
        }
      });
      
    });
  }
  
  openDetail(item) {
    chrome.tabs.create({url: item.detailUrl});
  }
  
  renderItem(item) {
    return (
      <div style={{height: "60px", display: "flex"}}>
        <Center padding="10px">
          <img src={item.logo} alt={item.name} style={{height:"40px", width: "auto"}} />
        </Center>
        <Center flex={1}>
          <div style={{"font-size":"20px"}}>{item.name}</div>
        </Center>
        {(item.detailUrl)?
          <Center padding="5px">
            <button onClick={() => this.openDetail(item)}>
              <img src="img/lock.svg" alt="Security details" style={{height:"40px", width: "auto"}} />
            </button>
          </Center>
         :
         null
        }
        <Center padding="5px">
          <button onClick={() => this.logOut(item)}>
            <img src="img/log-out.svg" alt="Log out" style={{height:"40px", width: "auto"}} />
          </button>
        </Center>
     </div> 
    );
  }

  render() {
    const { todos, dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);
    const vendors =  Object.keys(this.state.vendors);
    console.log(vendors);
    console.log(vendors.map((i) => vendors_map[i]));
    console.log(vendors_map);
    return (
      <div>
        {vendors.map((i) => {
          return this.renderItem(vendors_map[i])  
        })}
        {(vendors.length) ===0 ?
            <Center>Nothing logged</Center>
          :
            ""
        }
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