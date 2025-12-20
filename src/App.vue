<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- NAVBAR -->
    <nav class="bg-white shadow sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex justify-between items-center h-16">
          <RouterLink to="/" class="text-xl font-bold text-gray-900">
            Transit Operations Management System
          </RouterLink>

          <div class="flex items-center gap-3">
            <template v-if="!isLoggedIn">
              <button
                @click="openLogin"
                class="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Sign In
              </button>

              <button
                @click="openSignup"
                class="px-5 py-2 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition"
              >
                Request Access
              </button>
            </template>

            <template v-else>
              <span class="text-gray-600 mr-3">{{ userEmail }}</span>
              <RouterLink
                to="/metro-home"
                class="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
              >
                Workspace
              </RouterLink>
              <button
                @click="logout"
                class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- MAIN -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-900 text-gray-300 text-xs text-center py-4">
      © {{ new Date().getFullYear() }} Enterprise Scheduling Platform. All rights reserved.
    </footer>

    <!-- LOGIN MODAL -->
    <transition name="fade">
      <div
        v-if="showLogin"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">

          <!-- Header -->
          <div class="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-6 py-4">
            <h2 class="text-2xl font-semibold">Sign In</h2>
            <p class="text-gray-200 text-sm">Enter your credentials to access the platform</p>
          </div>

          <!-- Body -->
          <div class="px-6 py-8">
            <form @submit.prevent="login" class="space-y-5">

              <div>
                <label class="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  v-model="loginEmail"
                  type="email"
                  placeholder="you@example.com"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label class="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  v-model="loginPassword"
                  type="password"
                  placeholder="********"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  required
                />
              </div>

              <!-- CAPTCHA -->
              <div class="bg-gray-50 border rounded-lg p-4">
                <div class="flex justify-between items-center mb-2 text-sm">
                  <span class="font-medium">{{ loginCaptchaQuestion }}</span>
                  <button
                    type="button"
                    @click="generateLoginCaptcha"
                    class="text-cyan-600 hover:underline text-sm"
                  >
                    Refresh
                  </button>
                </div>
                <input
                  v-model="loginCaptchaInput"
                  placeholder="Enter result"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                />
              </div>

              <button
                class="w-full py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 shadow-md transition"
              >
                Sign In
              </button>

            </form>
            <p v-if="loginError" class="text-red-600 mt-3 text-sm">{{ loginError }}</p>
          </div>

        </div>
      </div>
    </transition>

    <!-- SIGNUP MODAL -->
    <transition name="fade">
      <div
        v-if="showSignup"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">

          <!-- Header -->
          <div class="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-4">
            <h2 class="text-2xl font-semibold">Request Access</h2>
            <p class="text-gray-300 text-sm">Register your account to join the enterprise platform</p>
          </div>

          <!-- Body -->
          <div class="px-6 py-8">
            <form @submit.prevent="signup" class="space-y-5">

              <div>
                <label class="block text-gray-700 font-medium mb-1">Official Email</label>
                <input
                  v-model="signupEmail"
                  type="email"
                  placeholder="you@company.com"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label class="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  v-model="signupPassword"
                  type="password"
                  placeholder="********"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition"
                  required
                />
              </div>

              <!-- CAPTCHA -->
              <div class="bg-gray-50 border rounded-lg p-4">
                <div class="flex justify-between items-center mb-2 text-sm">
                  <span class="font-medium">{{ signupCaptchaQuestion }}</span>
                  <button
                    type="button"
                    @click="generateSignupCaptcha"
                    class="text-gray-700 hover:underline text-sm"
                  >
                    Refresh
                  </button>
                </div>
                <input
                  v-model="signupCaptchaInput"
                  placeholder="Enter result"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition"
                />
              </div>

              <button
                class="w-full py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 shadow-md transition"
              >
                Submit Request
              </button>

            </form>
            <p v-if="signupError" class="text-red-600 mt-3 text-sm">{{ signupError }}</p>
          </div>

        </div>
      </div>
    </transition>

  </div>
</template>



<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { useAuthStore } from './stores/auth.js'
  
  const router = useRouter()
  const auth = useAuthStore()
  
  /* ---------- STATE ---------- */
  const showLogin = ref(false)
  const showSignup = ref(false)
  
  const loginEmail = ref('')
  const loginPassword = ref('')
  const signupEmail = ref('')
  const signupPassword = ref('')
  
  const loginError = ref('')
  const signupError = ref('')
  
  /* ---------- CAPTCHA UTILITY ---------- */
  function generateRandomCaptcha(length = 5) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // exclude confusing chars
    let captcha = ''
    for (let i = 0; i < length; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return captcha
  }
  
  /* ---------- LOGIN CAPTCHA ---------- */
  const loginCaptchaText = ref('')
  const loginCaptchaInput = ref('')
  
  const generateLoginCaptcha = () => {
    loginCaptchaText.value = generateRandomCaptcha()
    loginCaptchaInput.value = ''
  }
  
  const loginCaptchaQuestion = computed(() => loginCaptchaText.value)
  
  /* ---------- SIGNUP CAPTCHA ---------- */
  const signupCaptchaText = ref('')
  const signupCaptchaInput = ref('')
  
  const generateSignupCaptcha = () => {
    signupCaptchaText.value = generateRandomCaptcha()
    signupCaptchaInput.value = ''
  }
  
  const signupCaptchaQuestion = computed(() => signupCaptchaText.value)
  
  /* ---------- MODALS ---------- */
  const openLogin = () => {
    showLogin.value = true
    showSignup.value = false
    generateLoginCaptcha()
  }
  
  const openSignup = () => {
    showSignup.value = true
    showLogin.value = false
    generateSignupCaptcha()
  }
  
  /* ---------- LOGIN ---------- */
  const login = async () => {
    loginError.value = ''
  
    if (loginCaptchaInput.value.toUpperCase() !== loginCaptchaText.value) {
      loginError.value = 'Invalid CAPTCHA'
      generateLoginCaptcha()
      return
    }
  
    try {
      const res = await axios.post('http://127.0.0.1:8000/login', {
        email: loginEmail.value,
        password: loginPassword.value
      })
  
      auth.login(res.data.access_token)
      showLogin.value = false
      router.push('/metro-home')
    } catch (err) {
      loginError.value = err.response?.data?.detail || 'Login failed'
      generateLoginCaptcha()
    }
  }
  
  /* ---------- SIGNUP ---------- */
  const signup = async () => {
    signupError.value = ''
  
    if (signupCaptchaInput.value.toUpperCase() !== signupCaptchaText.value) {
      signupError.value = 'Invalid CAPTCHA'
      generateSignupCaptcha()
      return
    }
  
    try {
      await axios.post('http://127.0.0.1:8000/signup', {
        email: signupEmail.value,
        password: signupPassword.value
      })
  
      alert('Signup successful! Please login.')
      showSignup.value = false
      showLogin.value = true
    } catch (err) {
      signupError.value = err.response?.data?.detail || 'Signup failed'
      generateSignupCaptcha()
    }
  }
  
  /* ---------- AUTH ---------- */
  const logout = () => {
    auth.logout()
    router.push('/')
  }
  
  onMounted(() => auth.initFromStorage())
  
  const isLoggedIn = computed(() => auth.isLoggedIn)
  const userEmail = computed(() => auth.user?.email || '')
  </script>
  