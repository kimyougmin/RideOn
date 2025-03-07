import { ref } from 'vue'

export const showAlert = ref(false)
export const alertType = ref('success')
export const alertMessage = ref('')

//  유효성 검사 함수
export const validateUserInput = (user) => {
  // 전화번호 검사 (010으로 시작 & 11자리)
  const phoneRegex = /^010\d{8}$/
  if (!phoneRegex.test(user.phone.replace(/-/g, ''))) {
    alertType.value = 'error'
    alertMessage.value = '휴대폰 번호는 010으로 시작하며 11자리여야 합니다.'
    showAlert.value = true
    return false
  }

  // 닉네임 검사 (2글자 이상)
  if (user.nickname.length < 2) {
    alertType.value = 'error'
    alertMessage.value = '닉네임은 2글자 이상이어야 합니다.'
    showAlert.value = true
    return false
  }

  // 생년월일 검사 (0000-0-0 or 0000-00-00)
  const birthDateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/
  if (!birthDateRegex.test(user.birthDate)) {
    alertType.value = 'error'
    alertMessage.value = '생년월일 형식이 올바르지 않습니다. (예: 2000-01-01)'
    showAlert.value = true
    return false
  }

  // 비밀번호 검사 (입력한 경우만 검사)
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./]).{8,16}$/
  if (user.password && !passwordRegex.test(user.password)) {
    alertType.value = 'error'
    alertMessage.value =
      '비밀번호는 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다.'
    showAlert.value = true
    return false
  }

  return true 
}
