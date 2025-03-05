<script setup>
import { ref, computed, watch } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['success', 'error'].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])
const theme = useTheme()
const isDarkMode = computed(() => theme.global.current.value.dark)

// 내부 상태는 props.visible을 반영
const visibleInternal = ref(props.visible)
watch(
  () => props.visible,
  (newVal) => {
    visibleInternal.value = newVal
  }
)

const handleClose = () => {
  visibleInternal.value = false
  emit('close')
}
</script>

<template>
  <div class="alert-container" v-if="visibleInternal">
    <v-alert
      v-if="type === 'success'"
      color="success"
      icon="mdi-check-circle"
      class="custom-alert"
      :class="{ 'dark-mode': isDarkMode }"
      dense
      outlined
    >
      <div class="alert-content">
        <span>{{ message || '성공적으로 처리되었습니다!' }}</span>
        <button class="close-btn" @click="handleClose">확인</button>
      </div>
    </v-alert>

    <v-alert
      v-if="type === 'error'"
      color="error"
      icon="mdi-alert-circle"
      class="custom-alert"
      :class="{ 'dark-mode': isDarkMode }"
      dense
      outlined
    >
      <div class="alert-content">
        <span>{{ message || '오류가 발생했습니다. 다시 시도해주세요.' }}</span>
        <button class="close-btn" @click="handleClose">확인</button>
      </div>
    </v-alert>
  </div>
</template>



<style scoped>
.alert-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: auto;
}
.custom-alert {
  min-width: 300px;
  position: relative;
}
.alert-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  color: inherit;
}
.custom-alert.dark-mode {
  background-color: #333 !important;
  color: #fff !important;
  border-color: #777 !important;
}
</style>
