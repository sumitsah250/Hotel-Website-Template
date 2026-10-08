import { createContext, useContext } from "react";

// Tells hero/first-screen animations when the preloader has lifted.
export const IntroContext = createContext({ introDone: false });
export const useIntro = () => useContext(IntroContext);
