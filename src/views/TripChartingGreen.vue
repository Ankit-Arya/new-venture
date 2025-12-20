<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero / Welcome Section -->
    <header class="relative overflow-hidden py-3 px-6 text-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <!-- Decorative Circles -->
      <div class="absolute -top-16 -left-16 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-3xl font-extrabold text-gray-900 mb-4 animate-fadeInUp">
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
        
        <!-- Additional Time Configurations -->
        <div>
  <h2 class="text-2xl font-bold text-blue-800 mb-4">⏱️ Additional Time Settings</h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

    <div class="bg-slate-50 border border-slate-200 rounded-lg p-5">
  <div class="mb-4">
    <h3 class="text-sm font-semibold text-slate-800">
      Execution Parameters (Backend Controlled)
    </h3>
    <p class="text-xs text-slate-500 mt-1">
      These values are fixed and applied during execution.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <!-- Duty Hours -->
    <div class="flex justify-between">
      <span class="text-slate-600">Duty Hours</span>
      <span class="font-medium text-slate-900">08:10</span>
    </div>

    <!-- Running Hours -->
    <div class="flex justify-between">
      <span class="text-slate-600">Running Hours</span>
      <span class="font-medium text-slate-900">06:00</span>
    </div>

    <!-- Single Run Max -->
    <div class="flex justify-between">
      <span class="text-slate-600">Single Run Max</span>
      <span class="font-medium text-slate-900">03:00</span>
    </div>

    <!-- Break Small -->
    <div class="flex justify-between">
      <span class="text-slate-600">Break Small</span>
      <span class="font-medium text-slate-900">30 min</span>
    </div>

    <!-- Break Large -->
    <div class="flex justify-between">
      <span class="text-slate-600">Break Large</span>
      <span class="font-medium text-slate-900">50 min</span>
    </div>
  </div>
</div>

    <!-- <div>
      <label class="font-semibold text-blue-700">Duty Hours</label>
      <input
        type="time"
        v-model="form.dutyHours"
        value="00:00"
        @input="validateHH($event, 'dutyHours')"
        class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200"
      />

    </div> -->

    <!-- <div>
      <label class="font-semibold text-blue-700">Running Hours</label>
      <input
            type="time"
            v-model="form.runningHours"
            value="00:00"
            @input="validateHH($event, 'runningHours')"
            class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200"
          />
    </div> -->

    <!-- <div>
      <label class="font-semibold text-blue-700">Single Run Max</label>
      <input
            type="time"
            v-model="form.singleRunMax"
            value="00:00"
            @input="validateHH($event, 'singleRunMax')"
            class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200"
          />
    </div> -->

    <!-- Minute-only fields -->
    <!-- <div>
      <label class="font-semibold text-blue-700">Break Small (minutes)</label>
      <input type="number" min="0" v-model.number="form.breakSmall"
             class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200">
    </div>

    <div>
      <label class="font-semibold text-blue-700">Break Large (minutes)</label>
      <input type="number" min="0" v-model.number="form.breakLarge"
             class="p-2 rounded border border-gray-300 w-full focus:ring focus:ring-blue-200">
    </div> -->

  </div>
</div>
        <!-- 🧭 Timetable Type Selection (NEW UI) -->
        <div>
          <h2 class="text-2xl font-bold text-blue-800 mb-4">🗓️ Timetable Type</h2>
          <p class="text-gray-600 mb-4">
            The results will always be optimized. Choosing the correct run type (large or small) helps the system use the best settings for your timetable.

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
        


        <!-- Stepping Back Configuration -->
        <div>
          <h2 class="text-2xl font-bold text-blue-800 mb-4">🕒 Stepping Back Configuration</h2>
          <p class="text-gray-600 mb-6">
            Configure stepping back times for SBC1 and SBC2.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <!-- SBC1 -->
            <div class="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">
                SBC1 → ILOK
              </h3>

              <div class="space-y-3">
                <select
                  v-model="form.sbc1.enabled"
                  class="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                >
                  <option :value="false">Disabled</option>
                  <option :value="true">Enabled</option>
                </select>

                <div class="grid grid-cols-2 gap-3">
                  <input
                    v-model="form.sbc1.start"
                    type="time"
                    :disabled="!form.sbc1.enabled"
                    class="p-2 border rounded focus:ring focus:ring-blue-200"
                  />
                  <input
                    v-model="form.sbc1.end"
                    type="time"
                    :disabled="!form.sbc1.enabled"
                    class="p-2 border rounded focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>

            <!-- SBC2 -->
            <div class="bg-white border-2 border-blue-200 rounded-xl p-5 shadow-sm">
              <h3 class="text-lg font-semibold text-blue-800 mb-3">
                SBC2 → KTNR
              </h3>

              <div class="space-y-3">
                <select
                  v-model="form.sbc2.enabled"
                  class="w-full p-2 border rounded focus:ring focus:ring-blue-200"
                >
                  <option :value="false">Disabled</option>
                  <option :value="true">Enabled</option>
                </select>

                <div class="grid grid-cols-2 gap-3">
                  <input
                    v-model="form.sbc2.start"
                    type="time"
                    :disabled="!form.sbc2.enabled"
                    class="p-2 border rounded focus:ring focus:ring-blue-200"
                  />
                  <input
                    v-model="form.sbc2.end"
                    type="time"
                    :disabled="!form.sbc2.enabled"
                    class="p-2 border rounded focus:ring focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>


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
    const res = await fetch('http://localhost:8000/simulateL5', {
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



