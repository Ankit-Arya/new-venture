<template>
  <div class="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-start px-4 py-12">
    <!-- Title -->
    <h1 class="text-3xl md:text-4xl font-bold mb-10 text-center">
      🚇 Select a Metro Line to Proceed
    </h1>

    <!-- Grid of Metro Lines -->
    <div class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="line in lines"
        :key="line.name"
        @click="!line.locked && goToTripChart(line.path)"
        :class="[
          'group rounded-xl p-6 text-xl font-semibold flex items-center justify-center border-2 transition-all duration-300 shadow-sm',
          line.border,
          {
            'cursor-not-allowed opacity-50': line.locked,
            'cursor-pointer hover:scale-[1.02] hover:shadow-md': !line.locked,
            [line.hover]: !line.locked,
            [line.textHover]: !line.locked,
          }
        ]"
      >
        {{ line.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const lines = [
  {
    name: 'Red Line',
    path: 'red',
    border: 'border-red-300',
    hover: 'hover:bg-red-600',
    textHover: 'hover:text-white',
  },
  {
    name: 'Blue Line',
    path: 'blue',
    border: 'border-blue-300',
    hover: 'hover:bg-blue-600',
    textHover: 'hover:text-white',
    // locked: true,
  },
  {
    name: 'Yellow Line',
    path: 'yellow',
    border: 'border-yellow-300',
    hover: 'hover:bg-yellow-400',
    textHover: 'hover:text-black',
    locked: true,
  },
  {
    name: 'Green Line',
    path: 'green',
    border: 'border-green-300',
    hover: 'hover:bg-green-600',
    textHover: 'hover:text-white',
  },
  {
    name: 'Pink Line',
    path: 'pink',
    border: 'border-pink-300',
    hover: 'hover:bg-pink-500',
    textHover: 'hover:text-white',
    locked: true,
  },
  {
    name: 'Magenta Line',
    path: 'magenta',
    border: 'border-purple-300',
    hover: 'hover:bg-purple-600',
    textHover: 'hover:text-white',
    locked: true,
  },
  {
    name: 'Orange Line',
    path: 'orange',
    border: 'border-orange-300',
    hover: 'hover:bg-orange-500',
    textHover: 'hover:text-black',
    locked: true,
  },
  {
    name: 'Aqua Line',
    path: 'aqua',
    border: 'border-cyan-300',
    hover: 'hover:bg-cyan-500',
    textHover: 'hover:text-black',
    locked: true,
  },
  {
    name: 'Golden Line (Coming Soon)',
    path: 'golden',
    border: 'border-yellow-400',
    hover: 'hover:bg-yellow-500',
    textHover: 'hover:text-black',
    locked: true,
  },
]

function goToTripChart(linePath) {
  router.push(`/trip-charting-${linePath}`)
}
</script>
