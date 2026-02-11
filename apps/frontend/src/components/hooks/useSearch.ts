import { useQuery } from "@tanstack/react-query"
import { client } from "../../utils/client"

export const useSearch = (query: string) => {
    return useQuery({
        queryKey: ["users", query],
        queryFn: async () => {
            // queryが無きゃ全研取得
            if (!query) {
                const res = await client.api.v1.users.$get()
                return await res.json()
            }
            // queryがあれば検索
            const res = await client.api.v1.search.$get({
                query: {q: query}
            })
            return await res.json()
        }
    })
}