import { ref } from 'vue'

// 현재 연도 가져오기
const currentYear = new Date().getFullYear()

export default function useDateOptions() {
  const birthYear = ref(`${currentYear}`) 
  const birthMonth = ref('')
  const birthDay = ref('')

  // 연도 리스트 (1960 ~ 현재)
  const yearList = ref(
    Array.from({ length: currentYear - 1959 }, (_, i) => ({
      text: `${currentYear - i}`, 
      value: `${currentYear - i}`
    }))
  )

  // 월 리스트 (1 ~ 12)
  const monthList = ref(
    Array.from({ length: 12 }, (_, i) => ({
      text: `${i + 1}`,
      value: `${i + 1}`
    }))
  )

  // 일 리스트 (1 ~ 31)
  const dayList = ref(
    Array.from({ length: 31 }, (_, i) => ({
      text: `${i + 1}`,
      value: `${i + 1}`
    }))
  )

  return { birthYear, birthMonth, birthDay, yearList, monthList, dayList }
}
