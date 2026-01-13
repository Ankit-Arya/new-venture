<template>
  <div class="min-h-screen flex bg-slate-50 text-slate-800">

    <!-- Sidebar -->
    <aside class="w-72 bg-slate-900 text-slate-200 flex flex-col">
      <!-- Brand -->
      <div class="px-6 py-5 border-b border-slate-800">
        <h1 class="text-xl font-semibold text-white">
          CSS Dashboard
        </h1>

      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6">


        <ul class="space-y-1">
          <!-- Execution Control -->
          <RouterLink
            to="/execution-control"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-l font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Trip Chart Status/Control
          </RouterLink>

          <!-- Past Executions -->
          <RouterLink
            to="/live-notice-board"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-l font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Trip Chart/Time Table Archive
          </RouterLink>



          <!-- Download -->
          <RouterLink
            to="/download-trip-chart"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-l font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Download Trip Chart
          </RouterLink>

          <!-- Demo -->
          <RouterLink
            to="/demo"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-l font-medium
                   text-slate-300 transition
                   hover:bg-slate-800 hover:text-white"
            active-class="bg-slate-800 text-white"
          >
            Watch Demo
          </RouterLink>
        </ul>
      </nav>


    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1">
      <div class="max-w-5xl px-10 py-12">

        <!-- Page Header -->
        <div class="mb-10">
          <h1 class="text-3xl font-semibold text-slate-900">
            Execution Control
          </h1>
          <p class="text-slate-600 mt-1">
            Monitor, inspect, and abort running executions.
          </p>
        </div>

        <!-- CONTROL PANEL -->
        <div class="bg-white border border-slate-300 rounded-lg p-6 max-w-xl space-y-6">

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              Execution ID
            </label>
            <input
              v-model="executionIdInput"
              type="text"
              placeholder="Enter execution identifier"
              class="w-full px-4 py-2 border border-slate-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="flex gap-3">
            <button
              @click="goToStatus"
              :disabled="!executionIdInput.trim()"
              class="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700
                     text-white font-medium disabled:opacity-50"
            >
              Check Status
            </button>

            <button
              @click="showConfirmModal = true"
              :disabled="!executionIdInput.trim() || isCancelling"
              class="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700
                     text-white font-medium disabled:opacity-50"
            >
              Abort Execution
            </button>
          </div>

          <!-- Feedback -->
          <p v-if="errorMsg" class="text-sm text-red-600">
            {{ errorMsg }}
          </p>
          <p v-if="successMsg" class="text-sm text-green-600">
            {{ successMsg }}
          </p>

        </div>
      </div>
    </main>

    <!-- CONFIRMATION MODAL -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg border border-slate-300 max-w-md w-full p-6">
        <h2 class="text-lg font-semibold text-slate-900 mb-3">
          Confirm Abort Execution
        </h2>

        <p class="text-slate-600 mb-6">
          This action will permanently stop execution ID
          <span class="font-semibold text-slate-900">
            {{ executionIdInput }}
          </span>.
          This operation cannot be undone.
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="showConfirmModal = false"
            class="px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300
                   text-slate-800 font-medium"
          >
            Cancel
          </button>

          <button
            @click="confirmAbort"
            class="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700
                   text-white font-medium"
          >
            Abort Execution
          </button>
        </div>
      </div>
    </div>

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
      const res = await fetch(`http://72.61.236.129:8000/cancel/${id}`, { method: 'DELETE' })
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
  