<script setup lang="ts">
  import axios from 'axios'
  import { ref, onMounted } from 'vue'
  import { Toaster, toast } from 'vue-sonner'
  import Sidebar from './components/Sidebar.vue'
  import DialogForm from './components/DialogForm.vue'

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

  // Function to toggle user selection
  const toggleSelection = (user) => {
    if (selectedUsers.value.includes(user)) {
      // If user is already selected, deselect it
      selectedUsers.value = selectedUsers.value.filter((u) => u !== user)
    } else {
      // If user is not selected, select it
      selectedUsers.value.push(user)
    }
  }

  // Function to delete selected users
  const deleteSelectedUsers = () => {
    posts.value = posts.value.filter(
      (user) => !selectedUsers.value.includes(user),
    )
    selectedUsers.value = [] // Clear selected users after deletion
    toast.success('Event has been created')
  }

  onMounted(async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users')
      console.log('response', response)
      posts.value = response.data.users
      // console.log('Fetched posts:', posts.value);
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
      <Button @click="deleteSelectedUsers" :disabled="selectedUsers.length === 0"
        class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">Delete Selected</Button>
      <Dialog>
        <DialogTrigger as-child>
          <Button>Add User</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right"> Name </Label>
              <Input id="name" value="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="username" class="text-right"> Username </Label>
              <Input id="username" value="@peduarte" class="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit"> Save changes </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <Table>
        <TableCaption>A list of active users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Opt</TableHead>
            <TableHead class="w-[100px]"> Invoice </TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead class="text-right"> Amount </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="post in posts" :key="post.id">
            <TableCell>
              <!-- <Checkbox id="terms" /> -->
              <input type="checkbox" @change="toggleSelection(post)" :checked="selectedUsers.includes(post)" />
            </TableCell>
            <TableCell class="font-medium">
              {{ post.firstName }}
            </TableCell>
            <TableCell> {{ post.lastName }}</TableCell>
            <TableCell> {{ post.lastName }}</TableCell>
            <TableCell> {{ post.email }}</TableCell>
            <TableCell class="text-right">
              {{ post.bank.cardNumber }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>