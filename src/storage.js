const STORAGE_KEYS = {
  requests: 'requests',
  ui: 'uiState',
  drafts: 'formDrafts',
};

const safeParse = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return parsed === null || parsed === undefined ? fallback : parsed;
  } catch (error) {
    console.error('Не удалось разобрать сохранённые данные', error);
    return fallback;
  }
};

export const storageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, 'ok');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn('Локальное хранилище недоступно', error);
    return false;
  }
};

export const loadRequests = () => {
  if (!storageAvailable()) return [];
  const saved = window.localStorage.getItem(STORAGE_KEYS.requests);
  const data = safeParse(saved, []);
  return Array.isArray(data) ? data : [];
};

export const saveRequests = (requests) => {
  if (!storageAvailable()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.requests, JSON.stringify(requests));
  } catch (error) {
    console.error('Не удалось сохранить заявки', error);
  }
};

export const loadUIState = () => {
  if (!storageAvailable()) return {};
  const saved = window.localStorage.getItem(STORAGE_KEYS.ui);
  const state = safeParse(saved, {});
  return typeof state === 'object' && state !== null ? state : {};
};

export const saveUIState = (state) => {
  if (!storageAvailable()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.ui, JSON.stringify(state));
  } catch (error) {
    console.error('Не удалось сохранить состояние интерфейса', error);
  }
};

export const loadDrafts = () => {
  if (!storageAvailable()) return {};
  const saved = window.localStorage.getItem(STORAGE_KEYS.drafts);
  const state = safeParse(saved, {});
  return typeof state === 'object' && state !== null ? state : {};
};

export const saveDrafts = (drafts) => {
  if (!storageAvailable()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.drafts, JSON.stringify(drafts));
  } catch (error) {
    console.error('Не удалось сохранить черновики', error);
  }
};

export const STORAGE_KEYS_MAP = STORAGE_KEYS;
