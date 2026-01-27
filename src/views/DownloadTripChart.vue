<template>
            <div class="min-h-screen flex bg-zinc-50">
    <!-- SIDEBAR -->
    <aside class="w-72 bg-slate-800 text-slate-200 flex flex-col border-r border-slate-700">


      <!-- Brand / Context -->
      <div class="px-6 py-5 border-b border-slate-800">
        <h1 class="text-lg font-semibold text-white">
          Operations Workspace
        </h1>
        <p class="text-xs text-slate-400 mt-1">
          Scheduling & Control Interface
        </p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6">

        <p class="px-2 mb-3 text-xs font-semibold text-slate-400 uppercase">
          Operational Functions
        </p>

        <ul class="space-y-1">

          <RouterLink
            to="/execution-control"
            class="flex items-center px-3 py-2 rounded-md text-sm font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Schedule Execution Control
          </RouterLink>

          <RouterLink
            to="/live-notice-board"
            class="flex items-center px-3 py-2 rounded-md text-sm font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Execution History
          </RouterLink>

          <RouterLink
            to="/download-trip-chart"
            class="flex items-center px-3 py-2 rounded-md text-sm font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Reports & Downloads
          </RouterLink>

        </ul>
      </nav>

    </aside>
        <!-- Main Content -->
  <main class="flex-1 p-10 bg-slate-300 border border-gray-900">
  <div class="p-6 max-w-xl mx-auto bg-white rounded-md shadow-md border border-gray-200">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Download Trip Chart</h2>

    <div class="mb-4">
      <label for="executionId" class="block text-sm font-medium text-gray-700 mb-1">Execution ID</label>
      <input
        id="executionId"
        v-model="executionId"
        type="text"
        placeholder="Enter execution ID"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div class="flex items-center space-x-3">
      <button
        @click="downloadFile"
        :disabled="loading || !executionId"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Downloading...' : 'Download' }}
      </button>

      <button
        v-if="error"
        @click="downloadFile"
        class="text-sm text-red-600 hover:underline"
      >
        Retry
      </button>
    </div>

    <p v-if="success" class="mt-4 text-green-600 text-sm">
      ✅ File downloaded successfully.
    </p>

    <p v-if="error" class="mt-4 text-red-600 text-sm">
      ❌ {{ error }}
    </p>
  </div>
  </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const executionId = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)
const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:8000`

const downloadFile = async () => {
  if (!executionId.value) return

  loading.value = true
  error.value = ''
  success.value = false
  console.log('executionId--',executionId)
  console.log('executionId.value--',executionId.value)
  try {
    // const response = await fetch(`http://34.131.163.51:8000/download/${executionId.value}`)
    const response = await fetch(`${API_BASE_URL}/download/${executionId.value}`)
    if (!response.ok) {
      const data = await response.json()
      error.value = data?.error || 'Unknown error'
      loading.value = false
      return
    }

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `trip_chart_${executionId.value}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    success.value = true
  } catch (e) {
    error.value = 'Failed to download file. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
