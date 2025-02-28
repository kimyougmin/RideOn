<template>
  <section class="w-[728px] h-[822px] bg-white dark:bg-black8 p-8 rounded-lg shadow-md border border-black3 dark:border-black4 ml-[100px]">
    <!-- 제목 -->
    <h2 class="text-2xl font-bold text-black9 dark:text-white flex items-center gap-2">
      개인 정보 <span>⚙️</span>
    </h2>
    <p class="text-sm text-black6 dark:text-black3 mt-2 ">
      회원님의 개인정보를 안전하게 관리하세요. 프로필사진, 이름, 이메일, 비밀번호, 생년월일, 휴대폰 번호를 직접 수정할 수 있으며, 정기적인 비밀번호 변경을 권장합니다.
    </p>

    <!-- 프로필 이미지 -->
    <div class="flex flex-col items-center gap-3 mt-6">
      <div class="w-[88px] h-[88px] rounded-full overflow-hidden border border-black3 dark:border-black5">
        <img :src="user.profileImage || defaultProfile" alt="프로필 이미지" class="w-full h-full object-cover" />
      </div>
      <p class="text-lg font-bold dark:text-white">{{ user.nickname }}</p>
    </div>

    <!-- 입력 필드 -->
    <div class="mt-6 space-y-10"> 
      <div v-for="(field, key) in formFields" :key="key" class="flex flex-col items-center">
        <label class="block text-sm font-medium text-black7 dark:text-black3 text-center mb-2">
          {{ field.label }}
        </label>
        <input
          v-model="user[key]"
          :type="field.type"
          :disabled="field.disabled"
          class="w-[408px] h-[49px] p-3 border rounded text-base bg-transparent focus:border-primaryRed outline-none
                 dark:border-black5 dark:text-white dark:bg-black7 text-center"
        />
      </div>
    </div>

    <button
      class="w-[196px] h-[39px] border rounded text-lg font-bold mt-[46px] transition-all
             bg-black10 text-white border-black hover:bg-primaryRed hover:text-white
             dark:bg-black1 dark:text-white dark:border-black4 block mx-auto"
      @click="updateProfile"
    >
      수정 완료
    </button>
  </section>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

// 부모 컴포넌트에서 유저 데이터를 전달받음
const props = defineProps({
  userData: Object,
});

// 수정된 유저 정보 저장 (props를 직접 수정하지 않도록 복사)
const user = ref({ ...props.userData });

// 기본 프로필 이미지
const defaultProfile = '/images/userImg.svg';

// 입력 필드 정의
const formFields = ref({
  email: { label: '이메일', type: 'email', disabled: true },
  password: { label: '비밀번호', type: 'password', disabled: false },
  birthDate: { label: '생년월일', type: 'text', disabled: false },
  phone: { label: '휴대폰', type: 'text', disabled: false },
});

// 이벤트 전달
const emit = defineEmits(['updateUser']);

// 수정 완료 버튼 클릭 시 실행
const updateProfile = () => {
  emit('updateUser', user.value);
  alert('개인 정보가 수정되었습니다!');
};
</script>
