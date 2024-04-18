<script setup lang="ts">
  import axios from 'axios'
  import DialogForm from './components/DialogForm.vue'
  import DialogEdit from './components/DialogEdit.vue'
  import HeaderTable from './components/HeaderTable.vue'
  import Sidebar from './components/Sidebar.vue'
  import TableSkeleton from './components/TableSkeleton.vue'
  import Footer from './components/Footer.vue'

  import { ref, onMounted } from 'vue'
  import { BASE_URL } from '@/lib/constants'
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
        const res = await axios.delete(`${BASE_URL}/${user.id}`)
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
      const response = await axios.get(BASE_URL)
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
            <TableHead>First Name </TableHead>
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
    <Footer />
  </div>
</template>
