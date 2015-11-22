export const vendors_map = {
  facebook: {
    cookie: {
      domain: ".facebook.com",
      name: "c_user"
    },
    name: "Facebook",
    logo: "icons/facebook.svg",
    reloadUrl: "*://*.facebook.com/*",
    detailUrl: "https://www.facebook.com/settings?tab=security&section=sessions&view"
  },
  google: { 
    cookie: {
      domain: ".google.com",
      name: "SID"
    },
    name: "Google",
    logo: "icons/google.svg",
    reloadUrl: "*://*.google.com/*",
    detailUrl: "https://security.google.com/settings/security/activity"
  },
  github: {
    cookie: {
      domain: "github.com",
      name: "user_session"
    },
    name: "Github",
    logo: "icons/github.svg",
    reloadUrl: "*://*.github.com/*"
  }
  
};