const safeJSON = {
  parse: (v, fallback = null) => {
    try {
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  stringify: (v) => JSON.stringify(v),
};

export const storage = {
  get(key, fallback = null) {
    return safeJSON.parse(localStorage.getItem(key), fallback);
  },
  set(key, value) {
    localStorage.setItem(key, safeJSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  // limpa só chaves do app
  clearApp(prefix = "pomo") {
    Object.keys(localStorage).forEach(
      (k) => k.startsWith(prefix) && localStorage.removeItem(k)
    );
  },
};
