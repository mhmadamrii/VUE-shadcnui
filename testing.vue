<script setup lang="ts">
  import axios from 'axios'
  import { ref, onMounted } from 'vue'

  const posts = ref([])
  const selectedUsers = ref([])

  onMounted(async () => {
    try {
      const response = await axios.get('https://dummyjson.com/users')
      posts.value = response.data.users
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  })

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
  }
</script>

<template>
  <div class="p-4 sm:ml-64">
    <div
      class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
    >
      <button
        @click="deleteSelectedUsers"
        :disabled="selectedUsers.length === 0"
        class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
      >
        Delete Selected
      </button>
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
              <input
                type="checkbox"
                @change="toggleSelection(post)"
                :checked="selectedUsers.includes(post)"
              />
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
