<script setup lang="ts">
import { useDealSlideStore } from "~/store/deal-slide.store"
import { convertPrice } from "~/utils/convertPrice"
import dayjs from "dayjs"

const store = useDealSlideStore()
</script>

<template>
    <div class="border-border bg-black/20 rounded p-3">
        <div class="uppercase bold text-xl mb-4">О сделке</div>
        <KanbanSlideoverLabel label-text="Наименование">
            <h2>{{ store.card?.name }}</h2>
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Сумма">
            {{ convertPrice(store.card?.price || 0) }}
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Статус">
            <UiBadge variant="outline">
                {{ store.card?.status }}
            </UiBadge>
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Клиент">
            {{ store.card?.companyName }}
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Дата-Создания">
            {{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}
        </KanbanSlideoverLabel>
    </div>
</template>

<style scoped>

</style>