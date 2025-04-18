
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

type MockUser = {
    id: number;
    name: string;
}

export default async function MockUsers() {

    const authObj = await auth();
    const userObj = await currentUser();

    console.log("Auth Object: ", authObj, userObj);

    const response = await fetch("https://6801e32081c7e9fbcc439fae.mockapi.io/users");
    const users = await response.json();

    async function addUser(fromData: FormData) {
        "use server";
        const name = fromData.get("name");
        const response = await fetch("https://6801e32081c7e9fbcc439fae.mockapi.io/users", {
            method: "POST",
            body: JSON.stringify({ name }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const newUser = await response.json();
        revalidatePath("/mock-users");
        console.log(newUser);
        return newUser;
    }

    return (
        <div className="py-10">
            <form action={addUser} className="mb-4">
                <input type="text" name="name" required className="border p-2 mr-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
            </form>
            <div className="grid grid-cols-4 gap-4 py-10">
            {users.map((user: MockUser) => (
            <div
                key={user.id}
                className="p-4 bg-white shadow-md rounded-lg text-gray-700"
            >
                {user.name}
            </div>
            ))}
        </div>
      </div>

     );
}