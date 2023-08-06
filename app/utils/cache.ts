import * as FileSystem from 'expo-file-system';

export type Data<T> = {
  payload: T;
  exp: number;
};

interface Dictionary<T> {
  [key: string]: T;
}

const CacheHelper = () => {
  const fileUri = FileSystem.cacheDirectory + 'cache.json';

  const openFile = async (): Promise<string | void> => {
    const { exists } = await FileSystem.getInfoAsync(fileUri);
    try {
      if (!exists) {
        await FileSystem.writeAsStringAsync(fileUri, '{}', {
          encoding: 'utf8',
        });
        return '{}';
      }
      return await FileSystem.readAsStringAsync(fileUri);
    } catch (error) {
      console.log('Error creating file: ', error);
    }
  };

  const getCache = async (): Promise<Dictionary<Data<any>>> => {
    const data = await openFile();
    return data ? JSON.parse(data) : {};
  };
  const putItem = async <T>(key: string, item: T) => {
    const cache = await getCache();
    cache[key] = {
      payload: item,
      exp: new Date().getTime() + 1000 * 60 * 60 * 2,
    };
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(cache), {
      encoding: 'utf8',
    });
  };

  const getItem = async <T>(key: string): Promise<T | null> => {
    const cache = await getCache();
    const data = cache[key];
    if (data && new Date().getTime() < data.exp) {
      return cache[key].payload;
    }
    return null;
  };

  const deleteItem = async (key: string) => {
    const cache = await getCache();
    delete cache[key];
    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(cache), {
      encoding: 'utf8',
    });
  };

  const clear = async () => {
    FileSystem.writeAsStringAsync(fileUri, '{}', { encoding: 'utf8' });
  };

  return {
    getItem,
    putItem,
    deleteItem,
    clear,
  };
};

export default CacheHelper;
