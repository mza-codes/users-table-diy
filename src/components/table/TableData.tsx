import { ReactNode } from "react";

type Props = {
    msg: ReactNode;
};

export default function TableData({ msg }: Props) {
    return <td className="p-1 border-2 border-slate-400 hover:bg-opacity-50">{msg}</td>;
}
