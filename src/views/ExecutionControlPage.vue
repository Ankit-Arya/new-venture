<template>
      <div class="min-h-screen flex bg-zinc-50">
    <!-- Sidebar -->
    <!-- Sidebar -->
    <aside class="w-72 bg-slate-900 text-slate-200 flex flex-col">
      <!-- Brand -->
      <div class="px-6 py-5 border-b border-slate-800">
        <h1 class="text-xl font-semibold text-white">
          Work Dashboard
        </h1>
        <p class="text-xs text-slate-400 mt-1">
          Core Redirect Index
        </p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6">
        <p class="px-2 mb-3 text-xs font-semibold text-slate-400 uppercase">
          Core Actions
        </p>

        <ul class="space-y-1">
          <!-- Execution Control -->
          <RouterLink
            to="/execution-control"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Execution Control
          </RouterLink>

          <!-- Past Executions -->
          <RouterLink
            to="/live-notice-board"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Past Executions
          </RouterLink>

          <!-- Demo -->
          <RouterLink
            to="/demo"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Watch Demo
          </RouterLink>

          <!-- Download -->
          <RouterLink
            to="/download-trip-chart"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Download Report
          </RouterLink>
        </ul>
      </nav>


    </aside>
    <!-- Main Content -->
    <main class="flex-1 p-10 bg-white-300 border border-gray-900">
  
    <div class="max-w-5xl">

        
        <div class="mb-8">
        <h1 class="text-3xl font-semibold text-gray-800">
            Execution Control
        </h1>
        <p class="text-gray-500 mt-1">
            Monitor, inspect, and abort running executions
        </p>
        </div>

  
      <input
        v-model="executionIdInput"
        type="text"
        placeholder="Enter Execution ID"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <div class="flex flex-col gap-3">
        <button
          @click="goToStatus"
          :disabled="!executionIdInput.trim()"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Check Status
        </button>
        <button
          @click="showConfirmModal = true"
          :disabled="!executionIdInput.trim() || isCancelling"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Abort Execution
        </button>
      </div>
  
      <!-- Feedback -->
      <p v-if="errorMsg" class="text-red-500 mt-2">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-green-600 mt-2">{{ successMsg }}</p>
  
      <!-- Confirmation Modal -->
      <div
        v-if="showConfirmModal"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 border border-red-200 text-center">
          <h2 class="text-xl font-semibold text-red-600 mb-4">Abort Simulation?</h2>
          <p class="text-gray-700 mb-6">
            This will permanently stop execution ID <strong>{{ executionIdInput }}</strong>.
            Are you sure?
          </p>
          <div class="flex justify-center gap-4">
            <button
              @click="confirmAbort"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              Yes, Abort
            </button>
            <button
              @click="showConfirmModal = false"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </main>  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const executionIdInput = ref('')
  const errorMsg = ref('')
  const successMsg = ref('')
  const isCancelling = ref(false)
  const showConfirmModal = ref(false)
  
  const goToStatus = () => {
    const id = executionIdInput.value.trim()
    if (!id) return (errorMsg.value = 'Please enter a valid Execution ID.')
    errorMsg.value = ''
    router.push({ name: 'TripChartingStatus', params: { executionId: id } })
  }
  
  const confirmAbort = async () => {
    showConfirmModal.value = false
    await cancelSimulation()
  }
  
  const cancelSimulation = async () => {
    const id = executionIdInput.value.trim()
    if (!id) return (errorMsg.value = 'Please enter a valid Execution ID to cancel.')
  
    errorMsg.value = ''
    successMsg.value = ''
    isCancelling.value = true
  
    try {
      const res = await fetch(`http://localhost:8000/cancel/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.detail || 'Failed to cancel simulation.')
      }
      const data = await res.json()
      successMsg.value = data.message || 'Simulation cancelled successfully.'
    } catch (err) {
      errorMsg.value = err.message || 'An error occurred while cancelling.'
    } finally {
      isCancelling.value = false
    }
  }
  </script>
  