import { AudioSession } from '../models/audio_session.model';
import * as FileSystem from 'expo-file-system';

const key = 'lastPlayed';

const fileUri: string = `${FileSystem.documentDirectory}session.json`;

export const saveSession = async (session: AudioSession) => {
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(session), {
      encoding: 'utf8',
    });
    // await SecureStore.setItemAsync(key, JSON.stringify(session));
  } catch (e) {
    console.log('Error storing the auth token', e);
  }
};

export const retrieveSession = async (): Promise<AudioSession | undefined> => {
  try {
    const session = await FileSystem.readAsStringAsync(fileUri, {
      encoding: 'utf8',
    });
    // const session = await SecureStore.getItemAsync(key);
    if (session) return JSON.parse(session);
  } catch (e) {
    console.log('Error retrieving session', e);
    return undefined;
  }
};
