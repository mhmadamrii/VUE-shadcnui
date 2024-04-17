<script setup lang="ts">
  import * as z from 'zod'
  import axios from 'axios'

  import { h, computed } from 'vue'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { Label } from '@/components/ui/label'
  import { toast } from 'vue-sonner'

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

  const hasErrors = computed(() => Object.keys(errors.value).length > 0)
  const hasEmptyFields = computed(() => {
    return Object.values(values).some((value) => !value)
  })

  const onSubmit = handleSubmit(async (values, { resetForm }) => {
    try {
      const res = await axios.post('https://dummyjson.com/users/add', {
        firstName: values?.firstName,
        lastName: values?.lastName,
      })
      if (res.status == 200 || res.status == 201) {
        toast.success('User has been added')
        resetForm()
      }
    } catch (error) {
      console.log('[ERROR_POST]', error)
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
          Make changes to your profile here. Click save when you're done.
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
        >
          Save changes
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
