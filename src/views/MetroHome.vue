<template>
  <div class="min-h-screen flex bg-slate-100">

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

    <!-- MAIN CONTENT -->
    <main class="flex-1 px-10 py-12 bg-white border-l border-slate-200">

      <!-- Primary Action Panel -->
      <section class="max-w-5xl mx-auto">

        <div class="border border-slate-200 rounded-xl p-12 shadow-sm">

          <h2 class="text-2xl font-semibold text-slate-900 mb-4">
            Generate Operational Schedule
          </h2>

          <p class="text-slate-600 max-w-3xl mb-8">
            Initiate a new scheduling cycle based on selected line, service
            requirements, and crew availability. Generated outputs will be
            validated against operational constraints before release.
          </p>

          <RouterLink
            to="/select-line"
            class="inline-flex items-center justify-center
                   px-6 py-3 rounded-md
                   bg-blue-700 text-white font-medium
                   hover:bg-blue-800 transition"
          >
            Start Schedule Generation
          </RouterLink>

        </div>

      </section>

    </main>

    <!-- CONFIRMATION MODAL -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 border border-slate-200">

        <h2 class="text-lg font-semibold text-slate-900 mb-3">
          Confirm Operation Termination
        </h2>

        <p class="text-slate-600 mb-6">
          This action will immediately terminate the selected execution.
          This operation cannot be undone.
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="showConfirmModal = false"
            class="px-4 py-2 rounded-md bg-slate-200 text-slate-800 hover:bg-slate-300"
          >
            Cancel
          </button>
          <button
            @click="confirmAbort"
            class="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Terminate Execution
          </button>
        </div>

      </div>
    </div>

  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const executionIdInput = ref('')
const errorMsg = ref('')
const successMsg = ref('')
const isCancelling = ref(false)
const showConfirmModal = ref(false)


const liveNotices = ref([])

const fetchNotices = async () => {
  try {
    // const res = await fetch('http://34.131.163.51:8000/notices')
    const res = await fetch('http://localhost:8000/notices')
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    liveNotices.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch notices:', err)
  }
}

onMounted(() => {
  fetchNotices()
})


function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      // alert('Copied: ' + text)
    })
    .catch(() => {
      // alert('Failed to copy')
    })
}



// 🔁 Format timestamp to readable
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

// ✅ Check Status
const goToStatus = () => {
  const id = executionIdInput.value.trim()
  if (!id) {
    errorMsg.value = 'Please enter a valid Execution ID.'
    return
  }
  errorMsg.value = ''
  router.push({ name: 'TripChartingStatus', params: { executionId: id } })
}

// 🚨 Cancel Confirmation
const confirmAbort = async () => {
  showConfirmModal.value = false
  await cancelSimulation()
}

// ❌ Cancel Simulation API
const cancelSimulation = async () => {
  const id = executionIdInput.value.trim()
  if (!id) {
    errorMsg.value = 'Please enter a valid Execution ID to cancel.'
    return
  }

  errorMsg.value = ''
  successMsg.value = ''
  isCancelling.value = true

  try {
    // const res = await fetch(`http://34.131.163.51:8000/cancel/${id}`, {
    const res = await fetch(`http://localhost:8000/cancel/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const errData = await res.json()
      throw new Error(errData.detail || 'Failed to cancel simulation.')
    }

    const data = await res.json()
    successMsg.value = data.message || 'Simulation cancelled successfully.'
  } catch (err) {
    console.error('❌ Cancel failed:', err)
    errorMsg.value = err.message || 'An error occurred while cancelling.'
  } finally {
    isCancelling.value = false
  }
}

const downloadFile = async (fileId) => {
  try {
    // const res = await fetch(`http://34.131.163.51:8000/files/${fileId}`)
    const res = await fetch(`http://localhost:8000/files/${fileId}`)
    if (!res.ok) throw new Error('Failed to download file')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    // Get filename from Content-Disposition header
    const disposition = res.headers.get('Content-Disposition')
    let filename = 'downloaded_file'
    if (disposition && disposition.includes('filename=')) {
      filename = disposition.split('filename=')[1].replace(/['"]/g, '')
    }

    const link = document.createElement('a')
    link.href = url
    link.download = filename  // Use extracted filename here
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.error(err)
  }
}

</script>

