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
  },
  dropbox: {
    cookie: {
      domain: ".www.dropbox.com",
      name: "lid"
    },
    name: "Dropbox",
    logo: "icons/dropbox.svg",
    reloadUrl: "*://*.dropbox.com/*",
    detailUrl: "https://www.dropbox.com/account#security"
  },
  linkedin: {
    cookie: {
      domain: ".www.linkedin.com",
      name: "li_at"
    },
    name: "",
    logo: "icons/linkedin.svg",
    reloadUrl: "*://*.linkedin.com/*",
    detailUrl: "https://www.linkedin.com/settings/sessions"
  },
  twitter: {
    cookie: {
      domain: ".twitter.com",
      name: "auth_token"
    },
    name: "Twitter",
    logo: "icons/twitter.svg",
    reloadUrl: "*://*.twitter.com/*",
    detailUrl: "https://twitter.com/settings/applications"
  },
  spotify: {
    cookie: {
      domain: ".spotify.com",
      name: "sp_dc"
    },
    name: "",
    logo: "icons/spotify.png",
    reloadUrl: "*://*.spotify.com/*",
    detailUrl: "https://www.spotify.com/my-en/account/overview/"
  },
};