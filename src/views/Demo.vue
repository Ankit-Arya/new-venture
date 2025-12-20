<template>
    <div class="min-h-screen flex bg-gray-50">
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
  <main class="flex-1 p-10 bg-white-300 border border-gray-900 px-4 py-4">
  <section class="bg-white-300 ">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          🎥 Trip Charting Demo
        </h2>
        <p class="text-gray-600 text-base max-w-2xl">
          This demo showcases the workflow and simulation process for entering and managing trip charting data in the DMRC system.
        </p>
      </div>

      <!-- Video Embed -->
      <div class="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
        <div class="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/abc123DEF"
            title="Trip Charting Demo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
  </main>
  </div>
</template>

<script setup>
// No script logic needed for static video
</script>

<style scoped>
/* Optional: for browsers not supporting Tailwind's aspect-ratio plugin */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

.aspect-w-16 iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
