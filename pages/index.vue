<script setup lang="ts">
import type { ICard, IColumn } from "~/components/kanban/kanban.types"
import { useKanbanQuery } from "~/components/kanban/useKanbanQuery"
import { convertPrice } from "~/utils/convertPrice"
import { useMutation } from "@tanstack/vue-query";
import type { EnumStatus } from "~/types/deals.types"
import dayjs from "dayjs"
import { generateGradient } from "~/components/kanban/generate-gradient"
import { useDealSlideStore } from "~/store/deal-slide.store"

useSeoMeta({
    title: 'Home | CRM System',
})

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const store = useDealSlideStore()

const { data, isLoading, refetch } = useKanbanQuery()

type TypeMutationVariables = {
    docId: string
    status?: EnumStatus
}

const { mutate } = useMutation({
    mutationKey: ['move card'],
    mutationFn: ({ docId, status }: TypeMutationVariables) =>
        DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
            status,
        }),
    onSuccess: () => {
        refetch()
    }
})

const handleDragStart = (card: ICard, column: IColumn) => {
    dragCardRef.value = card
    sourceColumnRef.value = column
}

const handleDragEnd = (event: DragEvent) => {
    event.preventDefault()
}

const handleDrop = (targetColumn: IColumn) => {
    if (dragCardRef.value && sourceColumnRef.value) {
        mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
    }
}
</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">CRM System</h1>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="grid grid-cols-5 gap-16">
                <div
                    v-for="(column, idx) in data"
                    :key="column.id"
                    class="min-h-screen"
                    @dragover="handleDragEnd"
                    @drop="() => handleDrop(column)"
                >
                    <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center" :style="generateGradient(idx, data?.length)">{{ column.name }}</div>
                    <div>
                        <KanbanCreateDeal :refetch="refetch" :status="column.id" />
                        <UiCard
                            v-for="card in column.items"
                            :key="card.id"
                            class="mb-3"
                            draggable="true"
                            @dragstart="() => handleDragStart(card, column)"
                            role="button"
                            @click="store.set(card)"
                        >
                            <UiCardHeader>
                                <UiCardTitle>{{ card.name }}</UiCardTitle>
                                <UiCardDescription>{{ convertPrice(card.price) }}</UiCardDescription>
                            </UiCardHeader>
                            <UiCardContent>{{ card.companyName }}</UiCardContent>
                            <UiCardFooter>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
                        </UiCard>
                    </div>
                </div>
            </div>
            <KanbanSlideover />
        </div>
    </div>
</template>
