<template>
  <div class="w-[428px] flex flex-col items-center space-y-[19px] relative">
  <!-- 5초만의 회원 가입 말풍선 -->
    <div class="absolute top-[-20px] w-[200px] flex items-center justify-center">
      <img src="./icons/loginBox.svg" alt="빠른 회원가입" class="w-full" />
      <p
        class="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[70%] 
               text-[13px] font-bold text-primaryRed whitespace-nowrap"
      >
        5초만에 빠른 회원가입
      </p>
    </div>
<!-- 카카오 로그인 버튼  ( 구현 안됨 ) 공식 색상 #FEE500-->
    <button
      type="button"
      class="w-full h-[47px] bg-[#FEE500] rounded flex items-center justify-center font-bold text-lg"
    >
      <div class="flex items-center justify-center gap-3">
        <img src="./icons/kakaoLogin.svg" alt="카카오 로그인" class="w-8 h-8" />
        <span>카카오로 로그인</span>
      </div>
    </button>
<!-- 네이버 로그인 버튼 ( 구현 안됨 )  공식 색상 #03C75A -->
    <button
      type="button"
      class="w-full h-[47px] bg-[#03C75A] text-black1 rounded flex items-center justify-center font-bold text-lg"
    >
      <div class="flex items-center justify-center gap-3">
        <img src="./icons/naverLogin.svg" alt="네이버 로그인" class="w-8 h-8" />
        <span>네이버로 로그인</span>
      </div>
    </button>
  </div>
</template>
