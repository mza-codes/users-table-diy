import { useState } from "react";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { Field } from "../../types";

type Props = {
    head: Field;
    handleSorting: () => void;
    handleSearch: (key: Field, value: string) => void;
};

export default function TableHead({ head, handleSorting, handleSearch }: Props) {
    const [sort, setSort] = useState(false);

    const handleSort = () => {
        setSort((c) => !c);
        handleSorting();
    };

    return (
        <th className="bg-gray-200 p-2 capitalize border-2 border-gray-600">
            <div className="relative row gap-2 items-center justify-between">
                <input
                    title="Enter Input to Search"
                    type="text"
                    placeholder={head}
                    onChange={({ target }) => handleSearch(head, target.value)}
                    name="none"
                    className="outline-none border-2 focus:border-gray-400/20 rounded-lg capitalize font-normal text-base bg-transparent py-1 px-2 max-w-[70%] placeholder:text-black text-black/60"
                />
                <button
                    title={sort ? "Descending" : "Ascending"}
                    onClick={handleSort}
                    className="text-xl hover:text-opacity-80 text-gray-900"
                >
                    {sort ? <BsSortDown /> : <BsSortUp />}
                </button>
            </div>
        </th>
    );
}

/** 
 * <button className="absolute right-0 bottom-0 top-0 text-sm p-2 text-gray-700">
                        <BiSearchAlt />
                    </button>
 */
