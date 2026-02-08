<template>
    <div class="min-h-screen bg-slate-950 text-slate-100 p-6">
      <!-- Header -->
      <div class="max-w-7xl mx-auto mb-6">
        <h1 class="text-2xl font-semibold text-cyan-400">
          Duty Summary Viewer
        </h1>
  
        <div class="mt-4 flex gap-3">
          <input
            v-model="executionId"
            placeholder="Enter Execution ID"
            class="w-64 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          />
          <button
            @click="loadData"
            class="bg-cyan-600 hover:bg-cyan-500 px-5 py-2 rounded text-sm font-medium"
          >
            Load
          </button>
        </div>
  
        <p v-if="error" class="text-red-400 mt-3 text-sm">
          {{ error }}
        </p>
      </div>
  
      <!-- Placards -->
      <div class="max-w-7xl mx-auto space-y-6">
        <div
          v-for="(duty, dutyNo) in duties"
          :key="dutyNo"
          class="bg-slate-900 border border-slate-800 rounded-lg p-5"
        >
          <!-- Duty Header -->
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-lg font-semibold text-cyan-300">
                Duty {{ dutyNo }}
              </h2>
              <p class="text-sm text-slate-400">
                {{ duty.meta.Sign_On }} → {{ duty.meta.Sign_Off }}
                | Total: {{ duty.meta.ACTUAL_DUTYHOURS }}
              </p>
            </div>
          </div>
  
          <!-- Trips -->
          <div class="space-y-3">
            <div
              v-for="(trip, idx) in duty.trips"
              :key="idx"
              class="grid grid-cols-6 gap-3 bg-slate-950 rounded p-3 text-sm"
            >
              <div>
                <p class="text-slate-400">Train</p>
                <p class="font-medium">{{ trip.Train_No }}</p>
              </div>
  
              <div>
                <p class="text-slate-400">From</p>
                <p>{{ trip.LocationPick }}</p>
                <p class="text-cyan-400">{{ trip.Trip_Start }}</p>
              </div>
  
              <div>
                <p class="text-slate-400">To</p>
                <p>{{ trip.LocationRelieve }}</p>
                <p class="text-cyan-400">{{ trip.Trip_End }}</p>
              </div>
  
              <div>
                <p class="text-slate-400">Run</p>
                <p>{{ trip.Trip_Duration }}</p>
              </div>
  
              <div>
                <p class="text-slate-400">Break</p>
                <p>{{ trip.breaks || "—" }}</p>
              </div>
  
              <div>
                <p class="text-slate-400">Single Run</p>
                <p>{{ trip.Single_Run || "—" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

  <script setup>
  import { ref } from "vue"
  
  const executionId = ref("")
  const error = ref("")
  const duties = ref({})
  
  function groupByDuty(rows) {
    const result = {}
  
    rows.forEach(row => {
      const dutyNo = row.Duty_No
      if (!dutyNo) return
  
      if (!result[dutyNo]) {
        result[dutyNo] = {
          meta: row,
          trips: []
        }
      }
  
      if (row.Train_No) {
        result[dutyNo].trips.push(row)
      }
    })
  
    return result
  }
  
  async function loadData() {
    error.value = ""
    duties.value = {}
  
    if (!executionId.value) {
      error.value = "Please enter an execution ID"
      return
    }
  
    try {
      const res = await fetch(
        `http://localhost:8000/api/duty?execution_id=${executionId.value}`
      )
  
      if (!res.ok) {
        throw new Error("Execution ID not found")
      }
  
      const data = await res.json()
      duties.value = groupByDuty(data.rows)
  
    } catch (err) {
      error.value = err.message
    }
  }
  </script>
  