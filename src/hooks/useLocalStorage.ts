export const useLocalStorage = () => {
  function setDataInLocalStorage(key: string, data: string) {
    localStorage.setItem(key, data);
  }
  function getDataFromLocalStorage<T>(key: string) {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  }
  return { setDataInLocalStorage, getDataFromLocalStorage };
};
