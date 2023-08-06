import { createContext } from 'react';

export type SubscribeContextType = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

export const SubscribeContext = createContext<SubscribeContextType>({
  showModal: true,
  setShowModal: () => {},
});
