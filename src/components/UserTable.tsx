import { useRef, useState } from "react";
import { Field, TableUser } from "../types";
import TableHead from "./table/TableHead";
import TableRow from "./table/TableRow";
import TableData from "./table/TableData";

type Props = {
    users: TableUser[];
};

type ErrorMsg = Record<Field, string>;
type SortOrder = {
    [key in Field]: boolean;
};

const fields: Field[] = ["name", "email", "age", "city", "country"];

export default function UserTable({ users: storedUsers }: Props) {
    const [users, setUsers] = useState(storedUsers);

    const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
        const initialState = {} as SortOrder;
        fields.forEach((field) => {
            initialState[field] = false;
        });
        return initialState;
    });

    const [error, setError] = useState<ErrorMsg>(() => {
        const initial = {} as ErrorMsg;
        fields.forEach((field) => {
            initial[field] = "";
        });
        return initial;
    });

    const timerRef = useRef<number>();

    const handleSort = (key: Field) => {
        return () => {
            console.log("using key", key);
            const sortedUsers = [...users];

            sortedUsers.sort((a, b) => {
                const order = sortOrder[key];
                let result: number;

                if (a[key] !== b[key]) {
                    result = a[key] < b[key] ? -1 : 1;
                    result = order ? -result : result;
                } else {
                    const valueA = a[key]?.toLocaleString() || "";
                    const valueB = b[key]?.toLocaleString() || "";
                    result = valueA.localeCompare(valueB);
                }
                return result;
            });

            setSortOrder((c) => ({
                ...c,
                [key]: !sortOrder[key] ? true : false,
            }));
            setUsers(sortedUsers);
        };
    };

    const handleSearch = (key: Field, value: string) => {
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            if (!value || value?.length <= 0) return setUsers(storedUsers);

            let results: TableUser[] = [];
            if (key === "age") {
                results = storedUsers.filter((user) => user.age <= parseInt(value));
            } else {
                results = storedUsers.filter((user) => {
                    return user[key].toLowerCase().includes(value.toLowerCase());
                });
            }
            console.log("@get () => ", { key, value, results });
            if (results.length <= 0)
                setError((c) => ({
                    ...c,
                    [key]: "No Matches Found!",
                }));
            else if (error[key].length >= 1)
                setError((c) => ({
                    ...c,
                    [key]: "",
                }));

            setUsers(results);
        }, 200);
    };

    return (
        <table className="p-4">
            <tbody>
                <TableRow>
                    {fields.map((head) => (
                        <TableHead
                            handleSearch={handleSearch}
                            handleSorting={handleSort(head)}
                            head={head}
                            key={head}
                        />
                    ))}
                </TableRow>

                {users?.length <= 0 ? (
                    <TableRow>
                        {fields.map((field, i) => (
                            <TableData key={`${field}-${i}_e`} msg={error[field]} />
                        ))}
                    </TableRow>
                ) : (
                    users.map((user, i) => (
                        <TableRow key={i} n={i}>
                            {fields.map((field, i) => (
                                <TableData
                                    key={`${field}-${i}`}
                                    msg={
                                        <span className="text-gray-900 font-normal">
                                            {user[field]}
                                        </span>
                                    }
                                />
                            ))}
                        </TableRow>
                    ))
                )}
            </tbody>
        </table>
    );
}
