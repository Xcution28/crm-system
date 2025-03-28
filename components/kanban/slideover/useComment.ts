import { useDealSlideStore } from "~/store/deal-slide.store"
import { COLLECTION_DEALS, DB_ID } from "~/utils/app.constants"
import { useQuery } from "@tanstack/vue-query"
import { DB } from "~/utils/appwrite"


export function useComment() {
    const store = useDealSlideStore()
    const cardId = store.card?.id || ''

    return useQuery({
        queryKey: ['deal', cardId],
        queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId)
    })
}
