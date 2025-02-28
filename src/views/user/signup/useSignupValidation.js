import { ref, watch } from 'vue'

export default function useSignupValidation() {
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const name = ref('')
  const phone = ref('')

  const birthYear = ref(null)
  const birthMonth = ref(null)
  const birthDay = ref(null)

  const emailError = ref('')
  const passwordError = ref('')
  const confirmPasswordError = ref('')
  const nameError = ref('')
  const phoneError = ref('')
  const birthError = ref('')

  // 이메일 유효성 검사
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    emailError.value = emailRegex.test(email.value) ? '' : '올바른 이메일 형식이 아닙니다.'
  }

  // 비밀번호 유효성 검사
  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./]).{8,16}$/
    passwordError.value = passwordRegex.test(password.value)
      ? ''
      : '영문, 숫자, 특수문자 포함 8~16자'
  }

  // 비밀번호 확인 유효성 검사
  const validateConfirmPassword = () => {
    confirmPasswordError.value =
      password.value === confirmPassword.value ? '' : '비밀번호가 일치하지 않습니다.'
  }

  // 이름 유효성 검사
  const validateName = () => {
    nameError.value = name.value.trim() ? '' : '이름을 입력해주세요.'
  }

  // 전화번호 유효성 검사
  const formatPhoneNumber = (value) => {
    value = value.replace(/[^0-9]/g, '')

    if (value.length >= 11) {
      value = value.slice(0, 11)
    }

    if (value.length >= 4 && value.length <= 7) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`
    } else if (value.length >= 8) {
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`
    }

    return value
  }

  const validatePhone = () => {
    const phoneRegex = /^010-\d{4}-\d{4}$/
    phone.value = formatPhoneNumber(phone.value)
    phoneError.value = phoneRegex.test(phone.value)
      ? ''
      : '휴대폰 번호 형식이 올바르지 않습니다. (예: 010-1234-5678)'
  }
  const updateBirth = (field, value) => {
    console.log(`변경 감지됨: ${field} → ${value}`)

    if (field === 'year') birthYear.value = value
    if (field === 'month') birthMonth.value = value
    if (field === 'day') birthDay.value = value

    validateBirth()
  }

  const validateBirth = () => {
    console.log('생년월일 변경 감지:', {
      birthYear: birthYear.value,
      birthMonth: birthMonth.value,
      birthDay: birthDay.value,
    })

    if (!birthYear.value || !birthMonth.value || !birthDay.value) {
      birthError.value = '생년월일을 입력해주세요.'
    } else {
      birthError.value = ''
    }
  }

  watch([birthYear, birthMonth, birthDay], validateBirth)

  return {
    email,
    password,
    confirmPassword,
    name,
    phone,
    birthYear,
    birthMonth,
    birthDay,
    emailError,
    passwordError,
    confirmPasswordError,
    nameError,
    phoneError,
    birthError,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateName,
    validatePhone,
    validateBirth,
    formatPhoneNumber,
    updateBirth,
  }
}
