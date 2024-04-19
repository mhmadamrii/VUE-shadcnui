<script setup lang="ts">
  import * as z from 'zod'
  import axios from 'axios'

  import { h, computed, ref } from 'vue'
  import { BASE_URL } from '@/lib/constants'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { Label } from '@/components/ui/label'
  import { toast } from 'vue-sonner'
  import { cn } from '@/lib/utils'

  import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'

  const formSchema = toTypedSchema(
    z.object({
      firstName: z.string().min(2).max(50),
      lastName: z.string().min(2).max(50),
    }),
  )

  const { handleSubmit, errors, values } = useForm({
    validationSchema: formSchema,
  })

  const isSubmitting = ref(false)
  const hasErrors = computed(() => Object.keys(errors.value).length > 0)
  const hasEmptyFields = computed(() => {
    return Object.values(values).some((value) => !value)
  })

  const onSubmit = handleSubmit(async (values, { resetForm }) => {
    isSubmitting.value = true
    try {
      const res = await axios.post(`${BASE_URL}/add`, {
        firstName: values?.firstName,
        lastName: values?.lastName,
      })
      if (res.status == 200 || res.status == 201) {
        toast.success('User has been added')
        resetForm()
      }
    } catch (error) {
      console.log('[ERROR_POST]', error)
    } finally {
      isSubmitting.value = false
    }
  })
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Add User</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add new user</DialogTitle>
        <DialogDescription>
          Make changes to your data here. Click add new user when you're done.
        </DialogDescription>
      </DialogHeader>
      <form class="w-full flex flex-col justify-between" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="firstName">
          <FormItem>
            <FormLabel>Firstname</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="lastName">
          <FormItem>
            <FormLabel>Lastname</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="shadcn"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button
          :disabled="hasErrors || hasEmptyFields"
          class="mt-4"
          type="submit"
          v-if="!isSubmitting"
        >
          Add New User
        </Button>
        <Button
          class="mt-4 bg-white hover:bg-white border-[2px] border-black"
          type="submit"
          v-if="isSubmitting"
        >
          <svg
            aria-hidden="true"
            class="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-black"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
