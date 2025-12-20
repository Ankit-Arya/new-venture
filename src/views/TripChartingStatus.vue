<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-gray-900 to-red-700 text-white p-6">
    <div class="w-full max-w-3xl bg-black bg-opacity-70 rounded-xl shadow-2xl p-8">
      
      <h1 class="text-3xl font-extrabold text-center mb-6 text-red-400 animate-pulse">
        🛠️ Real-Time Status
      </h1>

      <div class="space-y-3">
        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="flex items-start space-x-3 p-3 rounded-lg bg-gray-800 animate-fade-in"
        >
          <div class="text-xl w-6 flex-shrink-0">
            <span v-if="step.status === 'completed'" class="text-green-400">✅</span>
            <span v-else-if="step.status === 'running' || step.status === 'WIP'" class="text-yellow-400 animate-spin">🔄</span>
            <span v-else-if="step.status === 'pending'" class="text-gray-400">⏳</span>
            <span v-else-if="step.status === 'error'" class="text-red-400">❌</span>
            <span v-else class="text-gray-500">•</span>
          </div>

          <div>
            <p
              :class="[step.status === 'error' ? 'text-red-300 font-medium' : 'text-gray-300', 'text-sm md:text-base']"
            >
              {{ getStatusMessage(step) }}
            </p>
          </div>
        </div>
      </div>

      <p v-if="fileError" class="mt-4 text-red-500 text-sm">❌ {{ fileError }}</p>
      <p v-if="fileDownloaded" class="mt-4 text-green-400 text-sm">✅ Trip chart downloaded successfully</p>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const executionId = ref(route.params.executionId)

const steps = ref([])
const fileDownloaded = ref(false)
const fileError = ref('')

const POLLING_INTERVAL = 2000

let statusPolling = null
let filePolling = null

// --- Fetch simulation status ---
const fetchStatus = async () => {
  try {
    // const res = await fetch(`http://34.131.163.51:8000/status/${executionId.value}`)
    const res = await fetch(`http://localhost:8000/status/${executionId.value}`)
    if (!res.ok) throw new Error('Failed to fetch status')
    const data = await res.json()
    steps.value = data.steps

    const hasError = data.steps.some(s => s.status === 'error')
    if (hasError) {
      clearInterval(statusPolling)
      statusPolling = null
      fileError.value = 'Simulation failed. Files may not be generated.'
    }
  } catch (err) {
    console.error('Status polling error:', err)
  }
}

// --- Check if multiple files exist ---
const checkFileAvailability = async () => {
  // const baseUrl = 'http://34.131.163.51:8000/download/'
  const baseUrl = 'http://localhost:8000/download/'
  const possibleFiles = [
    `trip_chart_${executionId.value}.xlsx`,
    `duty_trip_break_summary_${executionId.value}.xlsx`,
    `log_${executionId.value}.txt`
  ]

  const availableFiles = []

  for (const fileName of possibleFiles) {
    try {
      const res = await fetch(`${baseUrl}${fileName}`, { method: 'HEAD' })
      if (res.ok) {
        availableFiles.push(fileName)
      }
    } catch (err) {
      console.warn(`⚠️ Could not check ${fileName}:`, err)
    }
  }

  return availableFiles
}

// --- Download a single file ---
const downloadFile = async (fileName) => {
  try {
    // const res = await fetch(`http://34.131.163.51:8000/download/${fileName}`)
    const res = await fetch(`http://localhost:8000/download/${fileName}`)
    if (!res.ok) throw new Error('File not ready')

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)

    console.log('✅ File downloaded successfully:', fileName)
  } catch (err) {
    console.error('File download failed:', err)
  }
}

// --- Download multiple files ---
const downloadAllFiles = async (fileNames) => {
  for (const fileName of fileNames) {
    await downloadFile(fileName)
  }
}

// --- Manual trigger (optional button) ---
const handleDownload = async () => {
  const availableFiles = await checkFileAvailability()

  if (availableFiles.length === 0) {
    alert('No downloadable files found yet.')
    return
  }

  if (confirm(`Found ${availableFiles.length} file(s):\n\n${availableFiles.join('\n')}\n\nDownload all?`)) {
    await downloadAllFiles(availableFiles)
  }
}

// --- Poll for file availability (silent unless success) ---
const pollFile = async () => {
  try {
    const availableFiles = await checkFileAvailability()

    if (availableFiles.length > 0) {
      console.log(`✅ ${availableFiles.length} file(s) found:`, availableFiles.join(', '))
      await downloadAllFiles(availableFiles)
      fileDownloaded.value = true

      // stop polling once downloaded
      if (filePolling) {
        clearInterval(filePolling)
        filePolling = null
      }
    }
    // silent on empty result — no spam logs
  } catch (err) {
    console.error('File polling error:', err)
  }
}

// --- Status message helper ---
const getStatusMessage = (step) => {
  switch (step.status) {
    case 'completed': return `${step.name} — Completed successfully`
    case 'running':
    case 'WIP': return `${step.name} — In progress...`
    case 'pending': return `${step.name} — Queued`
    case 'error': return `${step.name} — Failed to complete`
    default: return `${step.name} — Unknown status`
  }
}

// --- Mounting logic ---
onMounted(() => {
  console.log('⏳ Waiting for files to be generated...')
  statusPolling = setInterval(fetchStatus, POLLING_INTERVAL)
  filePolling = setInterval(pollFile, POLLING_INTERVAL)
  fetchStatus()
  pollFile()
})

// --- Cleanup ---
onUnmounted(() => {
  if (statusPolling) clearInterval(statusPolling)
  if (filePolling) clearInterval(filePolling)
})
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out both;
}
</style>


