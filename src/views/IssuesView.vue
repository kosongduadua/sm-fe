<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Issue Manager</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Issue List -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Issues</h2>
        <ul class="space-y-2">
          <li v-for="issue in issues" :key="issue.id" class="bg-white shadow rounded p-4">
            <h3 class="font-medium">{{ issue.title }}</h3>
            <p class="text-gray-600 text-sm mt-1">{{ issue.description }}</p>
            <div class="mt-2 space-x-2">
              <button
                @click="editIssue(issue)"
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                @click="deleteIssue(issue.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Issue Form -->
      <div>
        <h2 class="text-xl font-semibold mb-4">
          {{ isEditing ? 'Edit Issue' : 'Create New Issue' }}
        </h2>
        <form @submit.prevent="submitIssue" class="bg-white shadow rounded p-6">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              id="title"
              v-model="currentIssue.title"
              type="text"
              placeholder="Enter issue title"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1"
              >Description</label
            >
            <textarea
              id="description"
              v-model="currentIssue.description"
              placeholder="Enter issue description"
              required
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            {{ isEditing ? 'Update' : 'Create' }} Issue
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import IssueService from '@/services/IssueService'

interface Issue {
  id: number
  title: string
  description: string
}

const issues = ref<Issue[]>([])
const currentIssue = ref<Issue>({ id: 0, title: '', description: '' })
const isEditing = ref(false)

const fetchIssues = async () => {
  try {
    const response = await IssueService.getIssues()
    issues.value = response.data
  } catch (error) {
    console.error('Error fetching issues:', error)
  }
}

const submitIssue = async () => {
  try {
    if (isEditing.value) {
      await IssueService.updateIssue(currentIssue.value.id, currentIssue.value)
    } else {
      await IssueService.createIssue(currentIssue.value)
    }
    await fetchIssues()
    resetForm()
  } catch (error) {
    console.error('Error submitting issue:', error)
  }
}

const editIssue = (issue: Issue) => {
  currentIssue.value = { ...issue }
  isEditing.value = true
}

const deleteIssue = async (id: number) => {
  try {
    await IssueService.deleteIssue(id)
    await fetchIssues()
  } catch (error) {
    console.error('Error deleting issue:', error)
  }
}

const resetForm = () => {
  currentIssue.value = { id: 0, title: '', description: '' }
  isEditing.value = false
}

onMounted(fetchIssues)
</script>
