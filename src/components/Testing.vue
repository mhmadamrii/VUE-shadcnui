<script setup lang="ts">
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

  const searchUser = () => {}

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

<template></template>
