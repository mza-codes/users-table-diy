import { atom } from "jotai";
import { TableUser } from "./types";

export const usersAtom = atom<TableUser[] | null>(null);
