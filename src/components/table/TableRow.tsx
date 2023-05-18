import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    n?: number;
};

export default function TableRow({ children, n = 1 }: Props) {
    const bg = n % 2 === 0 ? `bg-gray-200` : `bg-gray-300`;
    return <tr className={`${bg} p-3`}>{children}</tr>;
}
