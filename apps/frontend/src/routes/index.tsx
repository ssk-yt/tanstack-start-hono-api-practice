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
import { useState } from "react"
import { client } from '../utils/client'
import { useUsers } from "../components/hooks/useUsers"
import { UserTable } from '@/components/UserTable'
import { useSearch } from "../components/hooks/useSearch"

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
  const [searchQuery , setSearchQuery] = useState()
  
  const {data: users, isLoading: usersIsLoading, error: usersError } = useSearch(searchQuery)
  
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
        <div className="flex gap-2">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='border p-2 rounded w-full max-w-md'
          />
        </div>
        {isLoading && <div className="text-gray-500">検索中...</div>}
        {error && <div className="text-red-500">エラーが発生しました</div>}
        {users && <UserTable users={users} />}
        {users && users.length === 0 && (
        <p className="text-gray-500">該当するユーザーはいません。</p>
      )}
      </div>
    </div>
    )


}