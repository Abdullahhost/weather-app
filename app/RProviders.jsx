"use client";

import { Provider } from "react-redux";

import storeMain from "../setting/store/storeMain";

export const ReduxProviders = ({ children }) => {
  return <Provider store={storeMain}>{children}</Provider>;
};
