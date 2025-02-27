<script setup>
import useSignupValidation from './useSignupValidation'
import useDateOptions from './useDateOptions'
import { defineProps } from 'vue'
import { ref } from 'vue'
import { postSignupApi } from '@/apis/auth'
import { useRouter } from 'vue-router'

const router = useRouter();
const isDarkMode = ref(false);

const handleSignup = async () => {
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  validateName();
  validateBirth();
  validatePhone();

  if (!emailError.value && !passwordError.value && !confirmPasswordError.value && !nameError.value && !birthError.value && !phoneError.value) {
    try {
      // 생년월일을 명확한 문자열 형식으로 변환 (YYYY-MM-DD)
     const birthDate = `${birthYear.value}-${birthMonth.value}-${birthDay.value}`

      //  JSON 직렬화 시 base64 인코딩 방식 추가
      const additionalInfo = btoa(JSON.stringify({ phone: phone.value, birthDate: birthDate }));

      await postSignupApi({
        email: email.value,
        password: password.value,
        nickname: `${name.value}|${additionalInfo}`, 
      });

      alert('회원가입이 완료되었습니다.');
      router.push('/login'); 
    } catch (error) {
      alert('회원가입에 실패하였습니다. 잠시후 다시 시도해주세요.');
      console.log(error);
    }
  }
};




const props = defineProps({
  isDarkMode: Boolean
})

const {
  email,
  password,
  confirmPassword,
  name,
  phone,
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
  updateBirth,
  formatPhoneNumber,
} = useSignupValidation()

const { birthYear, birthMonth, birthDay, yearList, monthList, dayList } = useDateOptions()
</script>


<template>
  <form @submit.prevent="handleSignup" class="w-full flex flex-col items-center">
    <div class="w-[428px] space-y-[32px]">
      <div>
        <label class="block text-sm font-medium mb-1 text-black7 dark:text-black1">이메일</label>
        <input
          v-model="email"
          type="email"
          class="w-full h-[48px] p-3 border border-black4 rounded text-base bg-transparent focus:border-primaryRed outline-none
          dark:border-black1 dark:placeholder:text-black1 dark:text-black1 placeholder:text-black4"
          placeholder="이메일을 입력하세요."
          @blur="validateEmail"
        />
        <p class="text-primaryRed text-sm h-5">{{ emailError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-black7 dark:text-black3">비밀번호</label>
        <input
          v-model="password"
          type="password"
          class="w-full h-[48px] p-3 border border-black4 rounded text-base bg-transparent focus:border-primaryRed outline-none
          dark:border-black1 dark:placeholder:text-black1 dark:text-black1 placeholder:text-black4"
          placeholder="비밀번호를 입력하세요."
          @blur="validatePassword"
        />
        <p class="text-primaryRed text-sm h-5 ">{{ passwordError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-black7 dark:text-black3">비밀번호 확인</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="w-full h-[48px] p-3 border border-black4 rounded text-base bg-transparent focus:border-primaryRed outline-none
          dark:border-black1 dark:placeholder:text-black1 dark:text-black1 placeholder:text-black4"
          placeholder="비밀번호를 다시 입력해주세요."
          @blur="validateConfirmPassword"
        />
        <p class="text-primaryRed text-sm h-5 ">{{ confirmPasswordError }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1 text-black7 dark:text-black3">이름</label>
        <input
          v-model="name"
          type="text"
          class="w-full h-[48px] p-3 border border-black4 rounded text-base bg-transparent focus:border-primaryRed outline-none
          dark:border-black1 dark:placeholder:text-black1 dark:text-black1 placeholder:text-black4"
          placeholder="이름을 입력해주세요."
          @blur="validateName"
        />
        <p class="text-primaryRed text-sm h-5 ">{{ nameError }}</p>
      </div>

      <div>
  <label class="block text-sm font-medium mb-1 text-black7 dark:text-black3">생년월일</label>
  <div class="w-full flex space-x-2">
    <v-combobox 
  v-model="birthYear"
  label="연도"
  :items="yearList"
  item-title="text"
  item-value="value"
  :return-object="false"
  variant="outlined"
  class="w-1/3"
  @update:modelValue="updateBirth('year', $event)"
/>
<v-combobox 
  v-model="birthMonth"
  label="월"
  :items="monthList"
  item-title="text"
  item-value="value"
  :return-object="false"
  variant="outlined"
  class="w-1/3"
  @update:modelValue="updateBirth('month', $event)"
/>
<v-combobox 
  v-model="birthDay"
  label="일"
  :items="dayList"
  item-title="text"
  item-value="value"
 :return-object="false"
  variant="outlined"
  class="w-1/3"
  @update:modelValue="updateBirth('day', $event)"
/>

  </div>
  <p class="text-primaryRed text-sm h-5 ">{{ birthError }}</p>
</div>


      <div>
        <label class="block text-sm font-medium mb-1 text-black7 dark:text-black3 ">휴대폰 번호</label>
        <input
          v-model="phone"
          type="text"
          class="w-full h-[48px] p-3 border border-black4 rounded text-base bg-transparent focus:border-primaryRed outline-none
          dark:border-black1 dark:placeholder:text-black1 dark:text-black1 placeholder:text-black4"
          placeholder="010-0000-0000"
          @input="phone = formatPhoneNumber(phone)"
          @blur="validatePhone"
        />
        <p class="text-primaryRed text-sm h-5">{{ phoneError }}</p>
      </div>
    </div>

    <button 
      type="submit"
      class="w-[428px] h-[47px] border rounded text-lg font-bold mt-[26px] transition-all focus:ring-2 focus:ring-primaryRed flex items-center justify-center cursor-pointer dark:bg-black1 dark:text-black7"
      :class="isDarkMode ? 'bg-white text-black10 border-white hover:bg-primaryRed hover:text-white' : 'bg-black10 text-white border-black hover:bg-primaryRed hover:text-white'"
    >
      회원가입
    </button>
  </form>
</template>
