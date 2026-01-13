<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">

    <!-- HEADER -->
    <header class="border-b bg-white">
      <div class="max-w-7xl mx-auto px-6 py-10 text-center">
        <h1 class="text-3xl md:text-5xl font-bold text-slate-900">
          DMRC Trip Charting Solution
        </h1>
        <p class="mt-3 text-slate-600">
          Upload timetable and configure stepping back parameters for chart generation.
        </p>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-1">
      <section class="max-w-7xl mx-auto px-6 py-16 space-y-16">

        <!-- PARAMETERS + TIMETABLE TYPE -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <!-- APPROVED PARAMETERS -->
          <div>
            <h2 class="text-2xl font-semibold text-slate-900 mb-4">
              Approved Input Parameters (ATO)
            </h2>

            <div class="bg-white border border-slate-300 rounded-lg p-6">
              <p class="text-sm text-slate-500 mb-4">
                Backend-controlled execution parameters (read-only).
              </p>

              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="flex justify-between border rounded p-2">
                  <span class="text-slate-600">Duty Hours Max</span>
                  <span class="font-medium">~ 08:30</span>
                </div>

                <div class="flex justify-between border rounded p-2">
                  <span class="text-slate-600">Running Hours</span>
                  <span class="font-medium">Uncapped</span>
                </div>

                <div class="flex justify-between border rounded p-2">
                  <span class="text-slate-600">Single Run Max</span>
                  <span class="font-medium">03:00</span>
                </div>

                <div class="flex justify-between border rounded p-2">
                  <span class="text-slate-600">Short Break</span>
                  <span class="font-medium">30 min</span>
                </div>

                <div class="flex justify-between border rounded p-2">
                  <span class="text-slate-600">Long Break</span>
                  <span class="font-medium">50 min</span>
                </div>
              </div>
            </div>
          </div>

          <!-- TIMETABLE TYPE -->
          <div>
            <h2 class="text-2xl font-semibold text-slate-900 mb-4">
              Timetable Type
            </h2>

            <p class="text-slate-600 mb-4">
              Select the applicable timetable category to optimize chart generation.
            </p>

            <div class="space-y-3">
              <label class="flex items-center gap-3 border rounded-lg p-4 bg-white cursor-pointer hover:border-blue-600">
                <input type="radio" value="large" v-model="form.timetableType" />
                <span class="font-medium">Weekday</span>
              </label>

              <label class="flex items-center gap-3 border rounded-lg p-4 bg-white cursor-pointer hover:border-blue-600">
                <input type="radio" value="small" v-model="form.timetableType" />
                <span class="font-medium">
                  Sat / Sun / Holidays / Special Operations
                </span>
              </label>
            </div>
          </div>

        </div>

        <!-- STEPPING BACK -->
        <div>
          <h2 class="text-2xl font-semibold text-slate-900 mb-4">
            Stepping Back Configuration
          </h2>

          <p class="text-slate-600 mb-6">
            Configure terminal and intermediate stepping back intervals.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- SBC1 -->
            <div class="bg-white border rounded-lg p-6">
              <h3 class="font-semibold mb-4">SBC1 → ILOK</h3>

              <div class="space-y-3">
                <select v-model="form.sbc1.enabled" class="w-full border rounded p-2">
                  <option :value="false">Disabled</option>
                  <option :value="true">Enabled</option>
                </select>

                <div class="grid grid-cols-2 gap-3">
                  <input type="time" v-model="form.sbc1.start" :disabled="!form.sbc1.enabled"
                         class="border rounded p-2" />
                  <input type="time" v-model="form.sbc1.end" :disabled="!form.sbc1.enabled"
                         class="border rounded p-2" />
                </div>
              </div>
            </div>

            <!-- SBC2 -->
            <div class="bg-white border rounded-lg p-6">
              <h3 class="font-semibold mb-4">SBC2 → KTNR</h3>

              <div class="space-y-3">
                <select v-model="form.sbc2.enabled" class="w-full border rounded p-2">
                  <option :value="false">Disabled</option>
                  <option :value="true">Enabled</option>
                </select>

                <div class="grid grid-cols-2 gap-3">
                  <input type="time" v-model="form.sbc2.start" :disabled="!form.sbc2.enabled"
                         class="border rounded p-2" />
                  <input type="time" v-model="form.sbc2.end" :disabled="!form.sbc2.enabled"
                         class="border rounded p-2" />
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- UPLOAD / DOWNLOAD -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

          <!-- UPLOAD -->
          <div>
            <h2 class="text-2xl font-semibold mb-4">
              Upload Timetable (Template Format)
            </h2>

            <div
              class="border-2 border-dashed rounded-lg p-8 text-center bg-white cursor-pointer hover:border-blue-600"
              @dragover.prevent
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
            >
              <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />

              <p class="text-slate-600">
                Drag & drop timetable file here or click to browse.
              </p>

              <p v-if="fileName" class="mt-2 text-green-600 font-medium">
                {{ fileName }} selected
              </p>
            </div>

            <div class="mt-6 text-center">
              <button
                @click="submitSimulation"
                class="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
              >
                Submit for Processing
              </button>
            </div>
          </div>

          <!-- DOWNLOAD -->
          <div>
            <h2 class="text-2xl font-semibold mb-4">
              Download Timetable Template
            </h2>

            <div class="border rounded-lg p-6 bg-white text-center">
              <p class="text-slate-600">
                Download the approved timetable template file.
              </p>
            </div>

            <div class="mt-6 text-center">
              <a
                href="/L5-timetable.csv"
                download
                class="inline-block bg-slate-900 hover:bg-slate-800 text-white px-10 py-3 rounded-md font-semibold"
              >
                Download Template
              </a>
            </div>
          </div>

        </div>

      </section>
    </main>

  </div>
</template>



<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

/* ----------------------------------
   Router & Store
---------------------------------- */
const router = useRouter()
const auth = useAuthStore()

/* ----------------------------------
   File Upload
---------------------------------- */
const fileInput = ref(null)
const fileObj = ref(null)
const fileName = ref('')

const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:8000`

const triggerFileInput = () => {
  fileInput.value?.click()
}

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

/* ----------------------------------
   Form State (MATCHES TEMPLATE)
---------------------------------- */
const form = reactive({
  // Stepping Back (Fixed SBCs)
  sbc1: {
    enabled: false,
    start: '',
    end: '',
  },
  sbc2: {
    enabled: false,
    start: '',
    end: '',
  },

  // Other configuration
  timetableType: 'large',
  // dutyHours: '00:00',
  // runningHours: '00:00',
  singleRunMax: '00:00',
  breakSmall: 0,
  breakLarge: 0,
})

/* ----------------------------------
   Helpers
---------------------------------- */
function generateUUID() {
  if (crypto?.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/* ----------------------------------
   Submit
---------------------------------- */
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

  // 🆕 Stepping Back (Explicit SBCs)
  payload.append(
    'stepping_back',
    JSON.stringify({
      SBC1: form.sbc1,
      SBC2: form.sbc2,
    })
  )

  payload.append('timetable_type', form.timetableType)
  payload.append('duty_hours', form.dutyHours)
  payload.append('running_hours', form.runningHours)
  payload.append('single_run_max', form.singleRunMax)
  payload.append('break_small', String(form.breakSmall))
  payload.append('break_large', String(form.breakLarge))

  try {
    const res = await fetch(`${API_BASE_URL}/simulateL5`, {
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
    console.error(err)
    alert('Failed to submit simulation')
  }
}
</script>



