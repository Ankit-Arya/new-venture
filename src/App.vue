<template>
  <div class="min-h-screen bg-slate-100 flex flex-col">

    <!-- NAVBAR -->
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
  <div class="w-full px-6">
    <div class="flex items-center justify-between h-16">

      <!-- System Identity (Left-aligned) -->
      <RouterLink to="/" class="flex flex-col">
        <span class="text-lg font-semibold text-slate-900">
          Crew Scheduling System
        </span>
        <!-- <span class="text-xs text-slate-500">
          Enterprise Operations Platform
        </span> -->
      </RouterLink>

      <!-- Actions (Right-aligned) -->
      <div class="flex items-center gap-3 text-sm font-medium">

        <template v-if="!isLoggedIn">
          <button
            @click="openLogin"
            class="px-4 py-2 rounded-md border border-slate-300 text-slate-700
                   hover:bg-slate-100"
          >
            Sign In
          </button>

          <button
            @click="openSignup"
            class="px-4 py-2 rounded-md border border-slate-400 text-slate-700
                   hover:bg-slate-200"
          >
            Request Access
          </button>
        </template>

        <template v-else>
          <span class="hidden sm:inline-block text-slate-600 mr-2">
            {{ userEmail }}
          </span>

          <RouterLink
            to="/metro-home"
            class="px-4 py-2 rounded-md bg-slate-800 text-white
                   hover:bg-slate-900"
          >
            Operations Workspace
          </RouterLink>

          <button
            @click="logout"
            class="px-4 py-2 rounded-md border border-slate-300 text-slate-700
                   hover:bg-slate-100"
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
    <footer class="bg-slate-800 text-slate-300 text-xs text-center py-4">
      © {{ new Date().getFullYear() }} Enterprise Scheduling Platform. All rights reserved.
    </footer>

    <!-- LOGIN MODAL -->
    <div
      v-if="showLogin"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md relative border border-slate-200">

        <button
          @click="showLogin = false"
          class="absolute top-3 right-3 text-xl text-slate-500 hover:text-slate-700"
        >
          ×
        </button>

        <h2 class="text-xl font-semibold text-slate-900 mb-4">
          User Authentication
        </h2>

        <form @submit.prevent="login" class="space-y-4">

          <input
            v-model="loginEmail"
            type="email"
            placeholder="User Email"
            class="w-full p-2 border rounded border-slate-300"
            required
          />

          <input
            v-model="loginPassword"
            type="password"
            placeholder="Password"
            class="w-full p-2 border rounded border-slate-300"
            required
          />

          <!-- CAPTCHA -->
          <div class="border rounded p-3 bg-slate-50">
            <div class="flex justify-between items-center mb-2 text-sm">
              <span class="font-medium">
                {{ loginCaptchaQuestion }}
              </span>
              <button
                type="button"
                @click="generateLoginCaptcha"
                class="text-slate-600 hover:underline"
              >
                Refresh
              </button>
            </div>

            <input
              v-model="loginCaptchaInput"
              placeholder="Enter verification result"
              class="w-full p-2 border rounded border-slate-300"
            />
          </div>

          <button
            class="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-900"
          >
            Authenticate
          </button>

        </form>

        <p v-if="loginError" class="text-red-600 mt-3 text-sm">
          {{ loginError }}
        </p>
      </div>
    </div>

    <!-- SIGNUP MODAL -->
    <div
      v-if="showSignup"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md relative border border-slate-200">

        <button
          @click="showSignup = false"
          class="absolute top-3 right-3 text-xl text-slate-500 hover:text-slate-700"
        >
          ×
        </button>

        <h2 class="text-xl font-semibold text-slate-900 mb-4">
          Access Registration
        </h2>

        <form @submit.prevent="signup" class="space-y-4">

          <input
            v-model="signupEmail"
            type="email"
            placeholder="Official Email Address"
            class="w-full p-2 border rounded border-slate-300"
            required
          />

          <input
            v-model="signupPassword"
            type="password"
            placeholder="Password"
            class="w-full p-2 border rounded border-slate-300"
            required
          />

          <!-- CAPTCHA -->
          <div class="border rounded p-3 bg-slate-50">
            <div class="flex justify-between items-center mb-2 text-sm">
              <span class="font-medium">
                {{ signupCaptchaQuestion }}
              </span>
              <button
                type="button"
                @click="generateSignupCaptcha"
                class="text-slate-600 hover:underline"
              >
                Refresh
              </button>
            </div>

            <input
              v-model="signupCaptchaInput"
              placeholder="Enter verification result"
              class="w-full p-2 border rounded border-slate-300"
            />
          </div>

          <button
            class="w-full bg-slate-700 text-white py-2 rounded-md hover:bg-slate-800"
          >
            Submit Request
          </button>

        </form>

        <p v-if="signupError" class="text-red-600 mt-3 text-sm">
          {{ signupError }}
        </p>
      </div>
    </div>

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

/* ---------- LOGIN CAPTCHA ---------- */
const loginCaptchaA = ref(0)
const loginCaptchaB = ref(0)
const loginCaptchaInput = ref('')

const generateLoginCaptcha = () => {
  loginCaptchaA.value = Math.floor(Math.random() * 9) + 1
  loginCaptchaB.value = Math.floor(Math.random() * 9) + 1
  loginCaptchaInput.value = ''
}
const loginCaptchaQuestion = computed(
  () => `${loginCaptchaA.value} + ${loginCaptchaB.value} = ?`
)

/* ---------- SIGNUP CAPTCHA ---------- */
const signupCaptchaA = ref(0)
const signupCaptchaB = ref(0)
const signupCaptchaInput = ref('')

const generateSignupCaptcha = () => {
  signupCaptchaA.value = Math.floor(Math.random() * 9) + 1
  signupCaptchaB.value = Math.floor(Math.random() * 9) + 1
  signupCaptchaInput.value = ''
}
const signupCaptchaQuestion = computed(
  () => `${signupCaptchaA.value} + ${signupCaptchaB.value} = ?`
)

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

  if (parseInt(loginCaptchaInput.value) !== loginCaptchaA.value + loginCaptchaB.value) {
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
  }
}

/* ---------- SIGNUP ---------- */
const signup = async () => {
  signupError.value = ''

  if (parseInt(signupCaptchaInput.value) !== signupCaptchaA.value + signupCaptchaB.value) {
    signupError.value = 'Invalid CAPTCHA'
    generateSignupCaptcha()
    return
  }

  try {
    await axios.post('http://localhost:8000/signup', {
      email: signupEmail.value,
      password: signupPassword.value
    })

    alert('Signup successful! Please login.')
    showSignup.value = false
    showLogin.value = true
  } catch (err) {
    signupError.value = err.response?.data?.detail || 'Signup failed'
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
