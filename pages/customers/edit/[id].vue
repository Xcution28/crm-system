<script setup lang="ts">
import type { ICustomer } from "~/types/deals.types"
import {useMutation, useQuery} from "@tanstack/vue-query"
import { DB } from "~/utils/appwrite"
import { v4 as uuid } from 'uuid'


interface InputFileEvent extends Event {
    target: HTMLInputElement
}

interface ICustomerFormState
    extends Pick<ICustomer, 'avatar_url' | 'email' | 'name' | 'from_source'> {}

useSeoMeta({
    title: 'Редактирование компании'
})

const route = useRoute()
const customerId = route.params.id as string

const { handleSubmit, defineField, setFieldValue, setValues, values } = useForm<ICustomerFormState>()

const { data, isSuccess } = useQuery({
    queryKey: ['get customer', customerId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)
})

watch(isSuccess, () => {
    const initialData = data.value as unknown as ICustomerFormState
    setValues({
        email: initialData.email,
        avatar_url: initialData.avatar_url,
        from_source: initialData.from_source || '',
        name: initialData.name
    })
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [fromSource, fromSourceAttrs] = defineField('from_source')

const { mutate, isPending } = useMutation({
    mutationKey: ['update customer', customerId],
    mutationFn: (data: ICustomerFormState) =>
        DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, customerId, data)
})

const { mutate: uploadImage, isPending: isUploadImagePending } = useMutation({
    mutationKey: ['upload image'],
    mutationFn: (file: File) => storage.createFile(STORAGE_ID, uuid(), file),
    onSuccess(data) {
        const response = storage.getFileDownload(STORAGE_ID, data.$id)
        setFieldValue('avatar_url', response.href)
    }
})

const onSubmit = handleSubmit(values => {
    mutate(values)
})
</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">
            Редактирование {{ (data as unknown as ICustomerFormState)?.name }}
        </h1>
        <form @submit="onSubmit" class="form">
            <UiInput
                placeholder="Наименование"
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                class="input"
            />
            <UiInput
                placeholder="Email"
                v-model="email"
                v-bind="emailAttrs"
                type="text"
                class="input"
            />
            <UiInput
                placeholder="Откуда пришел?"
                v-model="fromSource"
                v-bind="fromSourceAttrs"
                type="text"
                class="input"
            />
            <img
                v-if="values.avatar_url || isUploadImagePending"
                :src="values.avatar_url"
                alt=""
                width="50"
                height="50"
                class="rounded-full my-4"
            />
            <div class="grid w-full max-w-sm items-center gap-1.5 input">
                <label>
                    <div class="text-sm mb-2">Логотип</div>
                    <UiInput
                        type="file"
                        :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
                        :disabled="isUploadImagePending"
                    />
                </label>
            </div>
            <UiButton :disabled="isPending" variant="secondary" class="mt-3">
                {{ isPending ? 'Загрузка...' : 'Сохранить' }}
            </UiButton>
        </form>
    </div>
</template>

<style scoped>
.input {
    @apply border-[#161c26] mb-4 placeholder:text-[#748092] focus:border-border
    transition-colors;
}
</style>
