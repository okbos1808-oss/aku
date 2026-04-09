import { getUserData } from "@/lib/data";

const UserTable = async () => {
  const users = await getUserData();
  if (!users.length) return <h1 className="text-2xl">No User Found</h1>;

  return (
    <table className="min-w-full bg-white mt-3">
      <thead className="border-b border-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Email</th>
          <th className="py-3 px-6 text-left text-sm">Role</th>
    
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (  // ✅ changed {} to () to implicitly return
          <tr key={user.id}>
            <td className="py-3 px-6">{user.name}</td>
            <td className="py-3 px-6">{user.email}</td>
            <td className="py-3 px-6">{user.role}</td>
          
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;