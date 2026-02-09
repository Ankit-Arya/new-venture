<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 p-6">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8">
      <h1 class="text-2xl font-semibold text-cyan-400">
        Duty Summary Viewer
      </h1>

      <div class="mt-4 flex gap-3 items-center">
        <input
          v-model="executionId"
          placeholder="Enter Execution ID"
          class="w-72 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm
                 focus:outline-none focus:border-cyan-500"
        />
        <button
          @click="loadData"
          class="bg-cyan-600 hover:bg-cyan-500 px-5 py-2 rounded
                 text-sm font-medium"
        >
          Load
        </button>
      </div>

      <p v-if="error" class="text-red-400 mt-3 text-sm">
        {{ error }}
      </p>
    </div>

    <!-- Duty Cards -->
    <div class="max-w-7xl mx-auto space-y-8">
      <div
        v-for="(duty, dutyNo) in duties"
        :key="dutyNo"
        class="bg-slate-900 border border-slate-800 rounded-xl p-6"
      >
        <!-- Duty Header -->
        <div class="flex flex-wrap items-center gap-3 mb-6">
          <h2 class="text-lg font-semibold text-cyan-300">
            Duty {{ dutyNo }}
          </h2>

          <span class="px-3 py-1 rounded-full bg-slate-800 text-xs text-cyan-300">
            {{ duty.meta.Sign_On }} → {{ duty.meta.Sign_Off }}
          </span>

          <span class="px-3 py-1 rounded-full bg-emerald-900 text-xs text-emerald-300">
            Total: {{ duty.meta.ACTUAL_DUTYHOURS }}
          </span>
        </div>

        <!-- Timeline -->
        <div class="relative pl-8 border-l border-slate-700 space-y-8">
          <div
            v-for="(trip, idx) in duty.trips"
            :key="idx"
            class="relative"
          >
            <!-- Timeline Marker -->
            <div
              class="absolute -left-[11px] top-3 w-5 h-5
                     rounded-full bg-cyan-500 ring-4 ring-slate-900"
            ></div>

            <!-- Trip Card -->
            <div class="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <div class="flex justify-between items-center">
                <div class="text-cyan-300 font-medium">
                  🚆 Train {{ trip.Train_No }}
                </div>
                <div class="text-xs text-slate-400">
                  Run: {{ trip.Trip_Duration }}
                </div>
              </div>

              <div class="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p class="text-slate-400 text-xs uppercase">From</p>
                  <p class="font-medium">{{ trip.LocationPick }}</p>
                  <p class="text-cyan-400 text-xs">{{ trip.Trip_Start }}</p>
                </div>

                <div class="text-right">
                  <p class="text-slate-400 text-xs uppercase">To</p>
                  <p class="font-medium">{{ trip.LocationRelieve }}</p>
                  <p class="text-cyan-400 text-xs">{{ trip.Trip_End }}</p>
                </div>
              </div>

              <!-- Tags -->
              <div class="mt-4 flex flex-wrap gap-3 text-xs">
                <span
                  v-if="trip.breaks"
                  class="px-2 py-1 rounded bg-yellow-900 text-yellow-300"
                >
                  ⏸ Break: {{ trip.breaks }}
                </span>

                <span
                  v-if="trip.Single_Run"
                  class="px-2 py-1 rounded bg-purple-900 text-purple-300"
                >
                  ⚡ Single Run
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const executionId = ref(route.params.executionId || "")
const error = ref("")
const duties = ref({})

const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:8000`

function groupByDuty(rows = []) {
  const grouped = {}

  rows.forEach(row => {
    const dutyNo = row.Duty_No
    if (!dutyNo) return

    if (!grouped[dutyNo]) {
      grouped[dutyNo] = {
        meta: row,
        trips: []
      }
    }

    if (row.Train_No) {
      grouped[dutyNo].trips.push(row)
    }
  })

  return grouped
}

async function loadData() {
  error.value = ""
  duties.value = {}

  if (!executionId.value) {
    error.value = "Execution ID is required"
    return
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/duty?execution_id=${executionId.value}`
    )

    if (!res.ok) {
      throw new Error("No data found for this Execution ID")
    }

    const data = await res.json()
    duties.value = groupByDuty(data.rows)

  } catch (err) {
    error.value = err.message || "Failed to load data"
  }
}

onMounted(() => {
  if (executionId.value) {
    loadData()
  }
})
</script>
