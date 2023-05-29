import { TableUser } from "../types";
import UserTable from "./UserTable";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";

export default function TableV2() {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["table-data"],
        queryFn: () =>
            fetch("https://randomuser.me/api?results=20")
                .then((res) => {
                    console.count("FETCHED FROM API");
                    return res.json();
                })
                .then((data) => {
                    const array: TableUser[] = data?.results?.map((user: User) => {
                        return {
                            age: user.dob.age,
                            city: user.location.city,
                            country: user.location.country,
                            email: user.email,
                            name: `${user.name.first} ${user.name.last}`,
                        };
                    });
                    console.count("Parsed after fetch()");
                    return array;
                }),
        retry(failureCount, error) {
            return failureCount >= 2 ? false : true;
        },
    });

    if (isLoading)
        return (
            <div className="p-2">
                <Loader inline={1} color="#555" />
            </div>
        );

    return (
        <section className="relative w-full col gap-2 py-10 px-4">
            <h2 className="text-4xl mb-4 underline underline-offset-8 text-center font-semibold">
                Users Table
            </h2>
            {isError || !data ? (
                <div className="p-4 rounded-xl text-center">
                    <span className="font-semibold ">Error Fetching Data!</span>
                </div>
            ) : (
                <UserTable users={data ?? []} />
            )}
        </section>
    );
}

var dbUser = {
    gender: "male",
    name: {
        title: "Mr",
        first: "Paul",
        last: "Osullivan",
    },
    location: {
        street: {
            number: 6723,
            name: "Grange Road",
        },
        city: "Oranmore",
        state: "Limerick",
        country: "Ireland",
        postcode: 27786,
        coordinates: {
            latitude: "2.8787",
            longitude: "-91.9548",
        },
        timezone: {
            offset: "+5:30",
            description: "Bombay, Calcutta, Madras, New Delhi",
        },
    },
    email: "paul.osullivan@example.com",
    login: {
        uuid: "cbba3b83-0159-4398-b160-a10f4b15a846",
        username: "happybear707",
        password: "avatar",
        salt: "dhuMlKFS",
        md5: "c5ff5164cb6fb23b6a319d71d30b745d",
        sha1: "57d06ba5233d2a0604920c271601a408210d27b4",
        sha256: "bce8d88ae86a681ca09ff7a7127869b5a0408aeadb0ef008023f42577694b69a",
    },
    dob: {
        date: "1951-03-12T16:39:49.901Z",
        age: 72,
    },
    registered: {
        date: "2002-06-19T06:19:57.339Z",
        age: 20,
    },
    phone: "021-703-6523",
    cell: "081-221-6550",
    id: {
        name: "PPS",
        value: "1493198T",
    },
    picture: {
        large: "https://randomuser.me/api/portraits/men/99.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/99.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/99.jpg",
    },
    nat: "IE",
};

type User = typeof dbUser;
