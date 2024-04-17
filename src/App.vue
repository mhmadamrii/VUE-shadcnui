<script setup lang="ts">
  import axios from 'axios'
  import DialogForm from './components/DialogForm.vue'
  import DialogEdit from './components/DialogEdit.vue'
  import HeaderTable from './components/HeaderTable.vue'
  import Sidebar from './components/Sidebar.vue'
  import TableSkeleton from './components/TableSkeleton.vue'

  import { ref, onMounted } from 'vue'
  import { Toaster, toast } from 'vue-sonner'
  import { Button } from '@/components/ui/button'
  import { Slider } from '@/components/ui/slider'
  import { Switch } from '@/components/ui/switch'
  import { Checkbox } from '@/components/ui/checkbox'
  import { Input } from '@/components/ui/input'
  import { Skeleton } from '@/components/ui/skeleton'

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'

  const posts = ref([])
  const selectedUsers = ref([])
  const totalPosts = ref(0)
  const isLoading = ref(true)

  const toggleSelection = (user) => {
    if (selectedUsers.value.includes(user)) {
      selectedUsers.value = selectedUsers.value.filter((u) => u !== user)
    } else {
      selectedUsers.value.push(user)
    }
  }
  const deleteSelectedUsers = async () => {
    try {
      const normalSelectedUsers = JSON.parse(
        JSON.stringify(selectedUsers.value),
      )

      const deleteRequest = normalSelectedUsers.map(async (user) => {
        const res = await axios.delete(`https://dummyjson.com/users/${user.id}`)
        return res
      })
      const response = await Promise.all(deleteRequest)
      totalPosts.value = totalPosts.value - normalSelectedUsers.length
      // console.log(totalPosts)
      const sum = totalPosts.value + 2

      // console.log('response delete', response)
    } catch (error) {
      console.log('[ERROR_DELETE_USRE]', error)
    }

    posts.value = posts.value.filter(
      (user) => !selectedUsers.value.includes(user),
    )
    selectedUsers.value = []
    toast.success('User has been deleted')
  }

  onMounted(async () => {
    await new Promise((res, rej) => setTimeout(() => res(), 1500))
    try {
      const response = await axios.get('https://dummyjson.com/users')
      posts.value = response.data.users
      totalPosts.value = JSON.parse(JSON.stringify(posts.value))
      totalPosts.value = posts.value.length
      isLoading.value = false
    } catch (error) {
      console.error('[ERROR_WHILE_FETCHING_POSTS]', error)
    }
  })
</script>

<template>
  <Toaster richColors />
  <Sidebar />

  <div class="sm:ml-64 h-screen">
    <div class="p-4 flex justify-between gap-3 py-3">
      <h1 class="text-lg font-semibold">Users ({{ totalPosts }})</h1>
      <div class="flex gap-2">
        <Button
          v-if="selectedUsers.length >= 1"
          @click="deleteSelectedUsers"
          :disabled="selectedUsers.length === 0"
          class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >Delete User</Button
        >
        <DialogForm />
      </div>
    </div>

    <div
      class="p-4 m-4 border-2 border-gray-200 flex rounded-lg dark:border-gray-700"
    >
      <div v-if="isLoading" class="w-full">
        <TableSkeleton />
      </div>
      <Table v-if="!isLoading">
        <TableCaption>A list of active users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Opt</TableHead>
            <TableHead> First Name </TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead class="text-right"> Bank Credential</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="post in posts" :key="post.id">
            <TableCell>
              <Checkbox @update:checked="toggleSelection(post)" id="terms" />
            </TableCell>
            <TableCell class="font-medium">
              {{ post.firstName }}
            </TableCell>
            <TableCell> {{ post.lastName }}</TableCell>
            <TableCell> {{ post.email }}</TableCell>
            <TableCell class="text-right">
              {{ post.bank.cardNumber }}
            </TableCell>
            <TableCell>
              <DialogEdit :existingUser="post" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 mt-10">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="41"
              fill="none"
              viewBox="0 0 54 41"
            >
              <path
                fill="#2A2E4E"
                d="M54 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              ></path>
              <path
                fill="#2A2E4E"
                fill-rule="evenodd"
                d="M13.75 40.794C6.156 40.794 0 34.638 0 27.044V1h5v26.044a8.75 8.75 0 0 0 8.75 8.75c4.893 0 8.75-3.771 8.75-8.544h5v7.5a1.25 1.25 0 0 0 2.5 0v-8.875a6.25 6.25 0 0 1-7.5-6.125V7.25a6.25 6.25 0 1 1 12.5 0v27.5a1.25 1.25 0 1 0 2.5 0V7.25a6.25 6.25 0 1 1 12.5 0v27.5a6.25 6.25 0 0 1-10 5A6.222 6.222 0 0 1 36.25 41a6.222 6.222 0 0 1-3.75-1.25 6.251 6.251 0 0 1-9.466-2.47c-2.456 2.197-5.723 3.514-9.284 3.514Zm30-4.794c-.69 0-1.25-.56-1.25-1.25V7.25a1.25 1.25 0 1 1 2.5 0v27.5c0 .69-.56 1.25-1.25 1.25ZM30 19.75a1.25 1.25 0 0 1-2.5 0V7.25a1.25 1.25 0 1 1 2.5 0v12.5Z"
                clip-rule="evenodd"
              ></path>
              <path
                fill="#2A2E4E"
                fill-rule="evenodd"
                d="M7.5 27.25a6.25 6.25 0 1 0 12.5 0v-20a6.25 6.25 0 1 0-12.5 0v20Zm6.25 1.25c-.69 0-1.25-.56-1.25-1.25v-20a1.25 1.25 0 1 1 2.5 0v20c0 .69-.56 1.25-1.25 1.25Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <ul
            class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
          >
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="#" class="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr
          class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
        />
        <span
          class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2023
          <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a
          >. All Rights Reserved.</span
        >
      </div>
    </footer>
  </div>
</template>
