<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Header / Hero Section -->
    <header class="bg-gradient-to-r from-gray-900 via-red-800 to-gray-700 text-white py-16 px-6 shadow-lg relative">


      <!-- Heading -->
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-4xl font-extrabold mb-4 animate-fadeIn">Crew Scheduling Software</h1>
        <p class="text-lg text-gray-200 animate-fadeIn delay-200">
          Designed and developed by the CSS Cell at DMRC, this fast, efficient and user-friendly system is transforming crew scheduling.
        </p>
      </div>
    </header>

    <!-- Animated Highlights Section -->
    <section class="flex-1 max-w-5xl mx-auto py-16 px-6 space-y-12">
      <!-- Highlight 1 -->
      <div class="bg-white rounded-xl shadow-md p-8 flex items-center space-x-6 animate-slideInLeft">
        <div class="text-5xl text-red-700">📘</div>
        <div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">100+ Trip Charts Generated</h3>
          <p class="text-gray-600">Enabling better planning and smoother operations across the network.</p>
        </div>
      </div>

      <!-- Highlight 2 -->
      <div class="bg-white rounded-xl shadow-md p-8 flex items-center space-x-6 animate-slideInRight">
        <div class="text-5xl text-blue-700">💼</div>
        <div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">Manpower Cost Savings</h3>
          <p class="text-gray-600">Automation has saved hundreds of hours in manual planning and coordination.</p>
        </div>
      </div>

      <!-- Highlight 3 -->
      <div class="bg-white rounded-xl shadow-md p-8 flex items-center space-x-6 animate-slideInLeft">
        <div class="text-5xl text-green-700">📄</div>
        <div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">Crew Control & TO Reports</h3>
          <p class="text-gray-600">Instantly generate reports for crew management and train operations in a few clicks.</p>
        </div>
      </div>

      <!-- Highlight 4 -->
      <div class="bg-white rounded-xl shadow-md p-8 flex items-center space-x-6 animate-slideInRight">
        <div class="text-5xl text-purple-700">⚡</div>
        <div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-2">Fast, Efficient, Scalable</h3>
          <p class="text-gray-600">Built for the scale of DMRC with enterprise-grade performance.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No script needed for static animations
</script>

<style>
/* Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animation Classes */
.animate-fadeIn {
  animation: fadeIn 0.8s ease-in-out forwards;
}
.delay-200 {
  animation-delay: 0.2s;
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease-out both;
}

.animate-slideInRight {
  animation: slideInRight 0.8s ease-out both;
}
</style>
