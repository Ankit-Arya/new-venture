<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">

    <!-- HEADER -->
    <header class="border-b bg-white">
      <div class="max-w-7xl mx-auto px-6 py-10 text-center">
        <h1 class="text-3xl md:text-5xl font-bold text-slate-900">
          Metro Line Selection
        </h1>
        <p class="mt-3 text-slate-600">
          Select an operational metro line to proceed with trip chart generation.
        </p>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-1 w-full">
      <section class="max-w-7xl mx-auto px-6 py-16">

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div
            v-for="line in lines"
            :key="line.name"
            @click="!line.locked && goToTripChart(line.path)"
            :class="[
              'border rounded-lg p-8 flex items-center justify-center text-lg font-semibold transition-all duration-200',
              line.locked
                ? 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed'
                : 'bg-white border-slate-300 text-slate-900 cursor-pointer hover:border-blue-600 hover:bg-blue-50'
            ]"
          >
            {{ line.name }}
          </div>

        </div>

      </section>
    </main>

  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const lines = [

  {
    name: 'Multiple CCP Line',
    path: 'blue',
    border: 'border-blue-300',
    hover: 'hover:bg-blue-600',
    textHover: 'hover:text-white',
    // locked: true,
  },

  {
    name: 'Single CCP Line',
    path: 'green',
    border: 'border-green-300',
    hover: 'hover:bg-green-600',
    textHover: 'hover:text-white',
  },

]

function goToTripChart(linePath) {
  router.push(`/trip-charting-${linePath}`)
}
</script>
