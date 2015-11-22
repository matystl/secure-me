import {vendors_map} from "../../../app/vendors.js";
/*
chrome.storage.local.get('todos', (obj) => {
  let todos = obj.todos;
  if (todos) {
    todos = JSON.parse(todos);
    if (todos.filter((todo) => !todo.marked).length > 0) {
      chrome.browserAction.setBadgeText({ text: len.toString() });
    }
  } else {
    // Initial
    chrome.browserAction.setBadgeText({ text: '1' });
  }
});
*/



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

if (chrome.browserAction) {
  chrome.browserAction.setBadgeText({ text:  Object.keys(logged).length.toString() });
}

console.log()


const whatWasAdded = (a) => {
  
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
  chrome.browserAction.setBadgeText({ text:  Object.keys(logged).length.toString() });
}
chrome.cookies.onChanged.addListener(whatWasAdded)