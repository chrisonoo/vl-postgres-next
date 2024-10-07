import { sql } from "@vercel/postgres";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";
import { seed } from "@/lib/seed";

const RefreshButton = dynamic(() => import("./refresh-button"), { ssr: false });

type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  createdAt: string;
};

export default async function Table() {
  let data: { rows: User[] };
  let startTime = Date.now();

  try {
    data = await sql<User>`SELECT * FROM users`;
  } catch (e: any) {
    if (e.message.includes('relation "users" does not exist')) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      await seed();
      startTime = Date.now();
      data = await sql<User>`SELECT * FROM users`;
    } else {
      throw e;
    }
  }

  const { rows: users } = data;
  const duration = Date.now() - startTime;

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Recent Users</h2>
          <p className="text-sm text-gray-500">
            Fetched {users.length} users in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {users.map((user) => (
          <div
            key={user.name}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
              <div className="space-y-1">
                <p className="font-medium leading-none">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {timeAgo(new Date(user.createdAt))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
