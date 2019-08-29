const LocalStorageName = "ReduxStore";

const getState = () => {
  let State = {};
  const localState = localStorage[LocalStorageName];
  if (localState) {
    State = JSON.parse(localState);
  }
  return State;
};

const saveReduxState = () => (dispatch, getState) => {
  const ReduxState = JSON.stringify(getState());
  try {
    localStorage.setItem(LocalStorageName, ReduxState);
  } catch (e) {
    if (isQuotaExceeded(e)) {
      // Do something
    }
  }
};

const isQuotaExceeded = e => {
  let quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
            quotaExceeded = true;
          }
          break;
        default:
          break;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
};

export { getState, saveReduxState };
