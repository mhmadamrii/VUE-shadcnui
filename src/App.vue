<script setup lang="ts">
  import axios from 'axios'
  import DialogForm from './components/DialogForm.vue'
  import HeaderTable from './components/HeaderTable.vue'
  import Sidebar from './components/Sidebar.vue'

  import { ref, onMounted } from 'vue'
  import { Toaster, toast } from 'vue-sonner'
  import { Button } from '@/components/ui/button'
  import { Slider } from '@/components/ui/slider'
  import { Switch } from '@/components/ui/switch'
  import { Checkbox } from '@/components/ui/checkbox'
  import { Input } from '@/components/ui/input'
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

  const toggleSelection = (user) => {
    if (selectedUsers.value.includes(user)) {
      selectedUsers.value = selectedUsers.value.filter((u) => u !== user)
    } else {
      selectedUsers.value.push(user)
    }
  }

  const deleteSelectedUsers = () => {
    posts.value = posts.value.filter(
      (user) => !selectedUsers.value.includes(user),
    )
    selectedUsers.value = []
    toast.success('User has been deleted')
  }

  onMounted(async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users')
      console.log('response', response)
      posts.value = response.data.users
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  })
</script>

<template>
  <Toaster richColors />
  <Sidebar />

  <div class="p-4 sm:ml-64">
    <div class="flex justify-between gap-3 py-3">
      <Input type="email" placeholder="Search" />
      <Button
        v-if="selectedUsers.length >= 1"
        @click="deleteSelectedUsers"
        :disabled="selectedUsers.length === 0"
        class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
        >Delete User</Button
      >
      <DialogForm />
    </div>

    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
    >
      <Table>
        <TableCaption>A list of active users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Opt</TableHead>
            <TableHead> First Name </TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead class="text-right"> Amount </TableHead>
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
              <Button>Edit</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
