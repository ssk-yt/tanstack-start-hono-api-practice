// userの中身の型定義の他に、userを受け取るときの型定義も必要
type User = {
    id: number
    name: string
    profile: string | null
    dateOfBirth: string | null
    createdAt: string
    updatedAt: string
}

type UserTableProps = {
  users: User[] // User型のデータが入ったリスト
}

export const UserTable = ({ users }: UserTableProps) => { // usersという変数を使う
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border p-2 text-left">ID</th>
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Profile</th>
                    <th className="border p-2 text-left">Birth Date</th>
                    <th className="border p-2 text-left">Created At</th>
                    <th className="border p-2 text-left">Updated At</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => ( // userというobjectを使って、任意の形にする
                    <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{user.id}</td>
                    <td className="border p-2 font-bold">{user.name}</td>
                    <td className="border p-2">{user.profile || '-'}</td>
                    <td className="border p-2">{user.dateOfBirth || '-'}</td>
                    <td className="border p-2 text-sm text-gray-600">
                        {user.createdAt}
                    </td>
                    <td className="border p-2 text-sm text-gray-600">
                        {user.updatedAt}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}