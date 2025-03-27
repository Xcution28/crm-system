import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { useDealSlideStore } from "~/store/deal-slide.store"
import { DB } from "~/utils/appwrite"
import { COLLECTION_COMMENTS, DB_ID } from "~/utils/app.constants"
import { v4 as uuid } from 'uuid'
import { ref } from "vue"


export function useCreateComment({ refetch }: { refetch: () => void }) {
    const store = useDealSlideStore()
    const commentRef = ref<string>()

    const { mutate } = useMutation({
        mutationKey: ['add comments', commentRef.value],
        mutationFn: () => DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
            text: commentRef.value,
            deal: store.card?.id
        }),
        onSuccess: () => {
            refetch()
            commentRef.value = ''
        }
    })

    const writeComment = () => {
        if (!commentRef.value) return
        mutate()
    }

    return {
        writeComment,
        commentRef
    }
}