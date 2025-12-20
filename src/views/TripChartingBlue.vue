<template>
    <div class="min-h-screen flex flex-col">
      <!-- Hero / Welcome Section -->
      <header class="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
        <!-- Decorative Circles -->
        <div class="absolute -top-16 -left-16 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
  
        <div class="relative z-10 max-w-3xl mx-auto">
          <h1 class="text-5xl font-extrabold text-gray-900 mb-4 animate-fadeInUp">
            DMRC Trip Charting
          </h1>
          <p class="text-lg text-gray-800 animate-fadeInUp delay-150">
            Upload timetable and configure stepping back timings
          </p>
        </div>
      </header>
  
      <!-- Upload + Form Section -->
      <section class="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 px-6">
        <div class="max-w-5xl mx-auto space-y-12">
          
          <!-- File Upload -->
          <div>
            <h2 class="text-2xl font-bold text-blue-800 mb-4">📁 Upload Timetable</h2>
            <div
              class="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-lg p-6 text-center cursor-pointer bg-white transition hover:bg-blue-300 py-20"
              @dragover.prevent
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
            >
              <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
              <p class="text-gray-600 text-2xl">
                Drag & drop your timetable file here, or click to browse
              </p>
              <p v-if="fileName" class="mt-2 text-green-600 font-medium">{{ fileName }} selected</p>
            </div>
          </div>
        <!-- 🧭 Timetable Type Selection (NEW UI) -->
        <div>
          <h2 class="text-2xl font-bold text-blue-800 mb-4">🗓️ Timetable Type</h2>
          <p class="text-gray-600 mb-4">
            Select whether the uploaded timetable is for a large run (like a weekend) or a small run (like Holi or other holidays).
          </p>
          <div class="flex flex-wrap gap-4">
            <label
              class="flex items-center gap-2 bg-white border border-blue-300 rounded-md px-4 py-2 shadow-sm hover:bg-blue-100 cursor-pointer transition"
            >
              <input type="radio" value="large" v-model="form.timetableType" />
              <span class="text-blue-800 font-medium">Large Run (Weekday)</span>
            </label>

            <label
              class="flex items-center gap-2 bg-white border border-blue-300 rounded-md px-4 py-2 shadow-sm hover:bg-blue-100 cursor-pointer transition"
            >
              <input type="radio" value="small" v-model="form.timetableType" />
              <span class="text-blue-800 font-medium">Small Run (Holiday)</span>
            </label>
          </div>
        </div>
          
        <!-- Stepping Back Entries -->
        <div>
          <h2 class="text-2xl font-bold text-blue-800 mb-4">🕒 Stepping Back Configuration</h2>
          <p class="text-gray-600 mb-4">Add stations and times where stepping back logic applies.</p>

          <!-- Hint Box -->
          <div class="bg-blue-50 border-l-4 border-blue-500 rounded-md p-4 mb-6 shadow-sm">
            <h3 class="text-blue-800 font-semibold text-lg mb-1">💡 Stepping Back Hints</h3>
            <ul class="text-blue-700 text-sm space-y-1">
              <li><span class="font-semibold">SBC1</span> → DSTO</li>
              <li><span class="font-semibold">SBC2</span> → VASI</li>
              <li><span class="font-semibold">SBC3</span> → NEC</li>
            </ul>
          </div>

          <transition-group name="fade" tag="div">
            <div
              v-for="(entry, idx) in form.steppingBack"
              :key="idx"
              class="relative bg-white border-2 border-blue-200 rounded-xl p-5 mb-5 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <input
                  v-model="entry.station"
                  placeholder="Station Name (e.g. SBC1)"
                  class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200"
                />
                <input
                  v-model="entry.start"
                  type="time"
                  class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200"
                />
                <input
                  v-model="entry.end"
                  type="time"
                  class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200"
                />
              </div>

              <!-- Larger and clearer remove button -->
              <button
                type="button"
                @click="removeEntry(idx)"
                class="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-lg font-bold transition-transform hover:scale-110"
              >
                ×
              </button>
            </div>
          </transition-group>

          <button
            type="button"
            @click="addEntry"
            class="mt-4 py-2 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            ➕ Add Stepping Back Entry
          </button>
        </div>
  
          <!-- Submit Button -->
          <div class="text-center">
            <button
              @click="submitSimulation"
              class="px-8 py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 
                    text-white text-lg font-semibold shadow-sm hover:shadow-md 
                    transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-emerald-300"
            >
              Submit 
            </button>
  
  
  
          </div>
        </div>
      </section>
    </div>
  </template>
  
  
  <script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const fileInput = ref(null)
const fileObj = ref(null)
const fileName = ref('')
const form = reactive({
  steppingBack: [],
  timetableType: 'large', // 🆕 default selection
})
const auth = useAuthStore()

/**
 * Generate a UUID safely across all browsers & environments.
 * Uses native crypto.randomUUID() if available, else falls back.
 */
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // fallback (RFC4122 version 4 compliant)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const triggerFileInput = () => fileInput.value.click()

const handleFileUpload = (e) => {
  const file = e.target.files?.[0]
  if (file) {
    fileObj.value = file
    fileName.value = file.name
  }
}

const handleDrop = (e) => {
  const file = e.dataTransfer.files?.[0]
  if (file) {
    fileObj.value = file
    fileName.value = file.name
  }
}

const addEntry = () => form.steppingBack.push({ station: '', start: '', end: '' })
const removeEntry = (idx) => form.steppingBack.splice(idx, 1)

const submitSimulation = async () => {
  if (!fileObj.value) {
    alert('Please upload a timetable file')
    return
  }

  const executionId = generateUUID()
  const payload = new FormData()
  payload.append('execution_id', executionId)
  payload.append('file', fileObj.value)
  payload.append('user_id', auth.user?.id || '')
  payload.append('user_name', auth.user?.username || '')
  payload.append('user_email', auth.user?.email || '')
  payload.append('stepping_back', JSON.stringify(form.steppingBack))
  payload.append('timetable_type', form.timetableType) // 🆕 Pass selected option to backend


  try {
    // const res = await fetch('http://34.131.163.51:8000/simulateL34', {
    const res = await fetch('http://localhost:8000/simulateL34', {
      method: 'POST',
      body: payload,
    })
    const data = await res.json()

    if (!data.execution_id) throw new Error('No execution ID returned')

    router.push({
      name: 'TripChartingStatus',
      params: { executionId: data.execution_id },
    })
  } catch (err) {
    console.error('Submission failed', err)
    alert('Failed to submit simulation')
  }
}
</script>

