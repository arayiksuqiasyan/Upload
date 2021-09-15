import {lazy} from "react";

export const HomePage = lazy(()=>import("./home"))
export const SubPage = lazy(()=>import("./sub"))
export const TextPage = lazy(()=>import("./text"))
export const BasketPage = lazy(()=>import("./deleted"))