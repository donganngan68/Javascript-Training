export const getElementById = (id, parentSelector = document) => {
  return parentSelector.getElementById(id);
}

export const querySelector = (selector, parentSelector = document) => {
  return parentSelector.querySelector(selector);
}

export const querySelectorAll = (selector, parentSelector = document) => {
  return parentSelector.querySelectorAll(selector);
}


