<script setup>
import BasicHeader from '@/components/BasicHeader.vue';
import BasicFooter from '@/components/BasicFooter.vue';

</script>

<template>
  <div class="w-full block h-full dark:bg-black9">
    <BasicHeader/>
    <div class="flex flex-col justify-start items-center max-w-[1441px] relative gap-[130px]">
  <div class="self-stretch flex-grow-0 flex-shrink-0 h-[750px] relative">
    <img
      src="../../../public/bicyclePageImage/ridePageHero.png"
      class="w-full max-w-[1441px] h-[750px] absolute left-[-1px] top-[-1px] object-cover"
    />
    <div
      class="w-[1441px] h-[750px] absolute left-[-1px] top-[-1px]"
      style="background: linear-gradient(239.54deg, rgba(26,26,26,0.1) 5.9%, #1a1a1a 90.64%);"
    ></div>
    <p class="absolute left-[92px] top-[487px] text-6xl text-left text-[#f2f2f2]">
      Gear Up, Ride Strong
    </p>
    <div
      class="flex justify-center items-center absolute left-[92px] top-[591px] gap-2.5 px-8 py-3 rounded-[26.5px] border-2 border-[#fefefe]"
    >
      <p class="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-[#fefefe]">
        See More
      </p>
    </div>
    <p class="absolute left-[92px] top-[433px] text-[32px] font-light text-left text-[#fefefe]">
      Equip Yourself, Elevate Your Ride.
    </p>
  </div>
  <div
    class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[1256px] relative gap-8"
  >
    <p
      class="self-stretch flex-grow-0 flex-shrink-0 w-[1256px] text-[32px] font-bold text-left text-[#dc3644]"
    >
      Gear Categories
    </p>
    <div class="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-4">
      <div
        class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5"
      >
        <div
          class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-[#fefefe]"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-none"
          />
        </div>
        <p
          class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center text-black"
        >
          헬멧
        </p>
      </div>
      <div
        class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5"
      >
        <div
          class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-[#fefefe]"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"
          />
        </div>
        <p
          class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center text-black"
        >
          라이트
        </p>
      </div>
      <div
        class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5"
      >
        <div
          class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-[#fefefe]"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"
          />
        </div>
        <p
          class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center text-black"
        >
          물통 &#x26; 물통케이지
        </p>
      </div>
      <div
        class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5"
      >
        <div
          class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-[#fefefe]"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"
          />
        </div>
        <p
          class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center text-black"
        >
          자물쇠
        </p>
      </div>
      <div
        class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5"
      >
        <div
          class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-[#fefefe]"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"
          />
        </div>
        <p
          class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center text-black"
        >
          휴대폰 거치대
        </p>
      </div>
      <div
        class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 h-[242px] w-[196px] relative gap-5"
      >
        <div
          class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-[196px] w-[196px] relative gap-2.5 px-[26px] py-[30px] rounded-[150px] bg-[#fefefe]"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[150px] h-[148px] rounded-[106px] object-cover"
          />
        </div>
        <p
          class="self-stretch flex-grow-0 flex-shrink-0 w-[196px] text-2xl font-bold text-center text-black"
        >
          펌프
        </p>
      </div>
    </div>
  </div>
  <div
    class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[1256px] relative gap-8"
  >
    <div
      class="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-4"
    >
      <div
        class="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-10"
      >
        <svg
          width="514"
          height="2"
          viewBox="0 0 514 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0"
          preserveAspectRatio="none"
        >
          <line x1="0.5" y1="1.25" x2="513.5" y2="1.25" stroke="#979797" stroke-width="1.5"></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="513.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="513.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="513.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="513.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="513.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
        </svg>
        <p class="flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-[#dc3644]">
          Bike Parts
        </p>
        <svg
          width="513"
          height="2"
          viewBox="0 0 513 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0"
          preserveAspectRatio="none"
        >
          <line x1="0.5" y1="1.25" x2="512.5" y2="1.25" stroke="#979797" stroke-width="1.5"></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="512.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="512.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="512.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="512.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
          <line
            x1="0.5"
            y1="1.25"
            x2="512.5"
            y2="1.25"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.5"
          ></line>
        </svg>
      </div>
      <p
        class="self-stretch flex-grow-0 flex-shrink-0 w-[1256px] text-[40px] font-bold text-center text-black"
      >
        라이딩의 즐거움을 더할 최상의 선택
      </p>
      <p class="flex-grow-0 flex-shrink-0 w-[641px] text-xl font-medium text-center text-black">
        <span class="flex-grow-0 flex-shrink-0 w-[641px] text-xl font-medium text-center text-black"
          >라이딩에 필요한 모든 장비</span
        ><br /><span
          class="flex-grow-0 flex-shrink-0 w-[641px] text-xl font-medium text-center text-black"
          >내구성 높은 부품, 편안한 라이딩을 위한 용품, 그리고 스타일을 더할 액세서리까지</span
        >
      </p>
    </div>
    <div class="self-stretch flex-grow-0 flex-shrink-0 h-[255px] relative">
      <div class="w-[620px] h-[226.43px]">
        <svg
          width="621"
          height="190"
          viewBox="0 0 621 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-[-0.5px] top-[37.24px]"
          preserveAspectRatio="none"
        >
          <path d="M0.5 0.739105H620.5V189.435H0.5V0.739105Z" fill="#DC3644"></path>
        </svg>
        <p
          class="absolute left-[32.43px] top-[70px] text-[28px] font-bold text-left text-[#fefefe]"
        >
          자전거 부품
        </p>
        <img
          src="../../../public/bicyclePageImage/bikeDemo.webp"
          class="w-[325.63px] h-[226.43px] absolute left-[274.46px] top-[-0.5px] object-none"
        />
        <p class="absolute left-8 top-[115.37px] text-xs font-semibold text-left text-white">
          <span class="text-xs font-semibold text-left text-white"
            >타이어 / 안장 / 핸들 / 그립 / 테이프 / 페달 / 속도계</span
          ><br /><span class="text-xs font-semibold text-left text-white"
            >핸들바 / 변속기 / 크랭크 / 체인 / 라이트 / 브레이크</span
          ><br /><span class="text-xs font-semibold text-left text-white"
            >패드 / 프레임 / 휴대폰거치대 / 자전거자물쇠</span
          ><br /><span class="text-xs font-semibold text-left text-white">백미러 / 셀프정비 </span>
        </p>
      </div>
      <div class="w-[619px] h-[217px]">
        <div
          class="w-[619px] h-[188.39px] absolute left-[636.5px] top-[37.5px] bg-neutral-600"
        ></div>
        <p
          class="absolute left-[1096px] top-[92.6px] text-[28px] font-bold text-right text-[#fefefe]"
        >
          라이더 용품
        </p>
        <p
          class="absolute left-[1020px] top-[137.51px] text-xs font-semibold text-right text-white"
        >
          <span class="text-xs font-semibold text-right text-white"
            >헬멧 / 모자 / 두건 / 자전거장갑 /자전거슈즈</span
          ><br /><span class="text-xs font-semibold text-right text-white">
            슈커버 / 토커버 / 자전거양말 / 상하의세트</span
          ><br /><span class="text-xs font-semibold text-right text-white"
            >상의 / 저지 / 하의 / 빕 </span
          ><br /><span class="text-xs font-semibold text-right text-white">이너웨어 /보호대</span>
        </p>
        <img
          src="../../../public/bicyclePageImage/bikeDemo.webp"
          class="w-[188px] h-[213px] absolute left-[700.5px] top-[41.5px] object-none"
        />
      </div>
    </div>
  </div>
  <div class="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 gap-8">
    <div
      class="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[1256px] h-[77px] relative gap-5"
    >
      <p class="flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-[#dc3644]">
        <span class="flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-[#dc3644]"
          >Best</span
        ><br /><span
          class="flex-grow-0 flex-shrink-0 text-[32px] font-bold text-left text-[#dc3644]"
          >Product</span
        >
      </p>
      <svg
        width="933"
        height="2"
        viewBox="0 0 933 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0"
        preserveAspectRatio="none"
      >
        <line x1="0.5" y1="0.75" x2="932.5" y2="0.75" stroke="#979797" stroke-width="1.5"></line>
        <line
          x1="0.5"
          y1="0.75"
          x2="932.5"
          y2="0.75"
          stroke="black"
          stroke-opacity="0.2"
          stroke-width="1.5"
        ></line>
        <line
          x1="0.5"
          y1="0.75"
          x2="932.5"
          y2="0.75"
          stroke="black"
          stroke-opacity="0.2"
          stroke-width="1.5"
        ></line>
        <line
          x1="0.5"
          y1="0.75"
          x2="932.5"
          y2="0.75"
          stroke="black"
          stroke-opacity="0.2"
          stroke-width="1.5"
        ></line>
        <line
          x1="0.5"
          y1="0.75"
          x2="932.5"
          y2="0.75"
          stroke="black"
          stroke-opacity="0.2"
          stroke-width="1.5"
        ></line>
        <line
          x1="0.5"
          y1="0.75"
          x2="932.5"
          y2="0.75"
          stroke="black"
          stroke-opacity="0.2"
          stroke-width="1.5"
        ></line>
      </svg>
      <div
        class="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[164px] h-[46px] relative gap-[3px] px-5 py-[13px] rounded-[26px] bg-[#1a1a1a]"
      >
        <p
          class="flex-grow-0 flex-shrink-0 w-[100px] h-[18px] text-base font-bold text-center text-[#fefefe]"
        >
          구매하러 가기
        </p>
        <svg
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="flex-grow-0 flex-shrink-0 w-[21px] h-5 relative"
          preserveAspectRatio="none"
        >
          <path
            d="M15.5938 7.375L18.875 10.5M18.875 10.5L15.5938 13.625M18.875 10.5H3.125"
            stroke="#FEFEFE"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
    </div>
    <div
      class="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-[30px]"
    >
      <svg
        width="17"
        height="30"
        viewBox="0 0 17 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M15.5 29L1.5 15L15.5 1"
          stroke="#1A1A1A"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-4">
        <div
          class="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-4"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[302px] h-[302px] object-cover border border-black/20"
          />
          <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black">벨로샵</p>
          <p class="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-black">
            <span class="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-black"
              >벨로시닷 라이저바 핸들그립 자전거 그립</span
            ><br />
          </p>
          <p class="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-black">20,000원</p>
        </div>
        <div
          class="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-4"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[302px] h-[302px] object-cover border border-black/20"
          />
          <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black">벨로샵</p>
          <p class="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-black">
            가시론 스템 가민 브라이튼 듀얼 마운트
          </p>
          <p class="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-black">25,000원</p>
        </div>
        <div
          class="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-4"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[302px] h-[302px] object-cover border border-black/20"
          />
          <p class="flex-grow-0 flex-shrink-0 w-[74px] text-base text-left text-black">벨로샵</p>
          <p class="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-black">
            2023 벨로시닷 에어플로우 전립선 안장
          </p>
          <p class="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-black">60,000원</p>
        </div>
        <div
          class="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-4"
        >
          <img
            src="../../../public/bicyclePageImage/bikeDemo.webp"
            class="flex-grow-0 flex-shrink-0 w-[302px] h-[302px] object-cover border border-black/20"
          />
          <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black">브랜드 이름</p>
          <p class="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-black">
            <span class="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-black"
              >미케 피스타 1단 픽시 트랙 코그</span
            ><br />
          </p>
          <p class="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-black">36,000원</p>
        </div>
      </div>
      <svg
        width="17"
        height="30"
        viewBox="0 0 17 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M1.5 29L15.5 15L1.5 1"
          stroke="#1A1A1A"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </div>
    <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
      <svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0"
        preserveAspectRatio="none"
      >
        <ellipse cx="7.5" cy="7" rx="7" ry="7" fill="#1A1A1A"></ellipse></svg
      ><svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0"
        preserveAspectRatio="none"
      >
        <ellipse cx="7.5" cy="7" rx="7" ry="7" fill="#E8E8E8"></ellipse></svg
      ><svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0"
        preserveAspectRatio="none"
      >
        <ellipse cx="7.5" cy="7" rx="7" ry="7" fill="#E8E8E8"></ellipse></svg
      ><svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0"
        preserveAspectRatio="none"
      >
        <ellipse cx="7.5" cy="7" rx="7" ry="7" fill="#E8E8E8"></ellipse></svg
      ><svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="flex-grow-0 flex-shrink-0"
        preserveAspectRatio="none"
      >
        <ellipse cx="7.5" cy="7" rx="7" ry="7" fill="#E8E8E8"></ellipse>
      </svg>
    </div>
  </div>
</div>
<BasicFooter/>
  </div>

</template>

<style scoped>

</style>
