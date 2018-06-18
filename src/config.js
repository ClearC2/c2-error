let config = {
  debug: false,
  toastOptions: {
    autoClose: false,
    closeOnClick: false
  },
  reportAjaxError: null,
  reportComponentError: null,
  getInfo: () => {
    return {
      url: window.location.href
    }
  }
}

export function setConfig (cfg = {}) {
  config = {...config, ...cfg}
}

export function getConfig () {
  return {...config}
}