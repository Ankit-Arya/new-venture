<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">

    <!-- HEADER -->
    <header class="border-b bg-white">
      <div class="max-w-7xl mx-auto px-6 py-10 text-center">

        <p class="text-sm tracking-widest uppercase text-slate-500 mb-3">
          Enterprise Rail Operations Platform
        </p>

        <h1 class="text-4xl md:text-6xl font-bold text-slate-900">
          Crew Scheduling
          <span class="text-blue-700 ml-2 text-3xl align-top">v2</span>
        </h1>

        <p class="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          A centralized scheduling and crew management system designed for
          large-scale metro and rail operations.
        </p>

      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-1">

      <section class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

        <!-- LEFT: SYSTEM CAPABILITIES -->
        <div>
          <h2 class="text-2xl font-semibold text-slate-900 mb-6">
            Core System Capabilities
          </h2>

          <div class="space-y-6">

            <div class="border-l-4 border-blue-600 pl-4">
              <h3 class="font-semibold text-slate-900">
                Automated Schedule Generation
              </h3>
              <p class="text-slate-600 mt-1">
                Produces validated crew schedules and trip charts at scale,
                ensuring compliance with operational rules and duty norms.
              </p>
            </div>

            <div class="border-l-4 border-blue-600 pl-4">
              <h3 class="font-semibold text-slate-900">
                Resource Optimization
              </h3>
              <p class="text-slate-600 mt-1">
                Improves utilization of available crew by reducing manual
                dependencies and minimizing planning inefficiencies.
              </p>
            </div>

            <div class="border-l-4 border-blue-600 pl-4">
              <h3 class="font-semibold text-slate-900">
                Standardized Reporting
              </h3>
              <p class="text-slate-600 mt-1">
                Generates operational and administrative reports with
                consistent formats suitable for audits and reviews.
              </p>
            </div>

            <div class="border-l-4 border-blue-600 pl-4">
              <h3 class="font-semibold text-slate-900">
                Enterprise Scalability
              </h3>
              <p class="text-slate-600 mt-1">
                Designed to support expanding networks, increasing fleet size,
                and future operational complexity.
              </p>
            </div>

          </div>
        </div>

        <!-- RIGHT: OPERATIONAL FLOW -->
        <div>
          <h2 class="text-2xl font-semibold text-slate-900 mb-6">
            Operational Workflow
          </h2>

          <ol class="space-y-6">

            <li class="flex items-start gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                1
              </span>
              <p class="text-slate-600">
                Input of service requirements, crew availability, and operational constraints.
              </p>
            </li>

            <li class="flex items-start gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                2
              </span>
              <p class="text-slate-600">
                Automated generation of crew schedules and duty allocations.
              </p>
            </li>

            <li class="flex items-start gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                3
              </span>
              <p class="text-slate-600">
                Validation against operational rules, safety norms, and workload limits.
              </p>
            </li>

            <li class="flex items-start gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                4
              </span>
              <p class="text-slate-600">
                Generation of reports and schedules for operational deployment.
              </p>
            </li>

          </ol>
        </div>

      </section>

    </main>

  </div>
</template>


<script setup>
// Enterprise-ready static landing component
</script>
