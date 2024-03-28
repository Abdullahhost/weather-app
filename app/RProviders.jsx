"use client";

import { Provider } from "react-redux";

import storeMain from "../setting/store/storeMain";

export const RProviders = ({ children }) => {
  return <Provider store={storeMain}>{children}</Provider>;
};
