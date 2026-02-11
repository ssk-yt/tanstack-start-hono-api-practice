import { createFileRoute } from '@tanstack/react-router'
import {
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { client } from '../utils/client'
import { useUsers } from "../components/hooks/useUsers"
import { UserTable } from '@/components/UserTable'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  // TanStack Query で API を叩く
  const { data, isLoading, error } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      // client.api.hello.$get() まで型補完が効きます
      const res = await client.api.v1.hello.$get()
      if (!res.ok) {
        throw new Error('Server Error')
      }
      return await res.json()
    },
  })

  // ユーザー検索
  const {data: users, isloading: usersIsLoading, error: usersError } = useUsers()

  // ローディングとエラーのチェックは全てのhooksの後で行う
  if (isLoading || usersIsLoading) return <div className='p-6'>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (usersError) return <div className='p-6 text-red-600'>エラーが起きました</div>

  return (
    <div className='p-6'>
        <div className="p-2">
          <h3>API Response:</h3>
          {/* ここに "hello from tanstack start" が表示されます */}
          <p className="text-lg font-bold text-green-600">
            {data?.message}
          </p>
      </div>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">ユーザー検索</h1>
        {users && <UserTable users={users} />}
      </div>
    </div>
    )


}