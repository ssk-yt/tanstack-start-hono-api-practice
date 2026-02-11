import { useQuery } from "@tanstack/react-query"
import { client } from "../../utils/client"

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],  // queryの状態を保存する名前。これが変更されると、queryFnが再度走る
        queryFn: async () => {
            const res = await client.api.v1.users.$get()
            return await res.json()
        }
    })
}