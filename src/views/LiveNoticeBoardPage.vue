<template>
  <div class="min-h-screen flex bg-slate-100">
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
    <main class="flex-1 p-10">
      <div class="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200">
        <div class="px-8 py-6 border-b border-slate-200">
          <h2 class="text-xl font-semibold text-slate-800">
            Executions
          </h2>
        </div>

        <div class="p-8">
          <ul class="space-y-4">
            <li
              v-for="notice in liveNotices"
              :key="notice.id"
              class="border-l-4 border-blue-600 bg-blue-50 rounded-md px-4 py-3
                     hover:bg-blue-100 transition"
            >
              <p class="text-sm text-slate-800 leading-relaxed">
                <strong>ID:</strong> {{ notice.executionId }}
                <button
                  @click="copyText(notice.executionId)"
                  class="ml-2 text-blue-600 hover:text-blue-800"
                >
                  📋
                </button>
                <br />
                <strong>By:</strong> {{ notice.initiatedBy }}<br />
                <strong>At:</strong> {{ formatTime(notice.timestamp) }}
              </p>

              <button
                @click="downloadFile(notice.file_id)"
                class="mt-3 inline-flex items-center px-3 py-1.5
                       text-xs font-medium rounded
                       bg-emerald-500 text-white
                       hover:bg-emerald-600 transition"
              >
                Download Report
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

  <script setup>
  import { ref, onMounted } from 'vue'
  
  const liveNotices = ref([])
  
  const fetchNotices = async () => {
    try {
      const res = await fetch('http://localhost:8000/notices')
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      liveNotices.value = await res.json()
    } catch (err) {
      console.error('Failed to fetch notices:', err)
    }
  }
  
  const copyText = (text) => navigator.clipboard.writeText(text).catch(() => {})
  
  const formatTime = (timestamp) => new Date(timestamp).toLocaleString()
  
  const downloadFile = async (fileId) => {
    try {
      const res = await fetch(`http://localhost:8000/files/${fileId}`)
      if (!res.ok) throw new Error('Failed to download file')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'downloaded_file'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error(err)
    }
  }
  
  onMounted(fetchNotices)
  </script>
  