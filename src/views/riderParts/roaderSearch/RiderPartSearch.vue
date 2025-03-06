<script setup>
import ShopHeader from '@/components/ShopHeader.vue'
import chain from '/riderPageImage/chain.svg'
import chain2 from '/riderPageImage/chain2.svg'
import seat from '/riderPageImage/seat.svg'
</script>

<template>
  <div class="w-full h-full block dark:bg-black9">
    <ShopHeader :searchValue="searchValue" @update:receiveHandler="receiveHandler($event)"/>
    <div class="flex flex-col justify-center items-center w-[1256px] relative gap-8">
      <div class="flex-grow-0 flex-shrink-0 w-[628px] h-[94px] relative">
        <p class="absolute left-0 top-16 text-2xl text-left text-black">
          소모품부터 부품까지 쉽고 빠르게 검색하세요.
        </p>
        <p class="absolute left-0 top-0 text-[40px] text-left text-black">Find Your Perfect Part</p>
      </div>
      <div class="self-stretch flex-grow-0 flex-shrink-0 h-[400px] relative">
        <img
          src="/riderPageImage/chain.svg"
          class="w-[620px] h-[400px] absolute left-[-1.5px] top-[-1.5px] object-cover border-2 border-[#979797]"
        /><img
          src="/riderPageImage/seat.svg"
          class="w-[620px] h-[200px] absolute left-[634.5px] top-[198.5px] object-none border-2 border-[#979797]"
        /><img
          src="/riderPageImage/chain2.svg"
          class="w-[620px] h-[180px] absolute left-[634.5px] top-[-1.5px] object-none border-2 border-[#979797]"
        />
      </div>
    </div>
    <div class="flex flex-col justify-start items-start w-[1256px] gap-8">
      <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-4">
        <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="flex-grow-0 flex-shrink-0 w-[22px] h-[22px] relative"
            preserveAspectRatio="none"
          >
            <g clip-path="url(#clip0_234_140)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.65438 0.93657C10.1518 -0.31219 11.8482 -0.31219 12.3456 0.93657L14.6571 6.74093L20.6569 7.24414C21.9492 7.35198 22.4733 9.03554 21.4885 9.91675L16.9176 14.0062L18.3132 20.1202C18.6141 21.4373 17.2429 22.4774 16.1371 21.7724L11 18.4957L5.86289 21.7724C4.75709 22.4774 3.38594 21.4362 3.68681 20.1202L5.08239 14.0062L0.511509 9.91675C-0.473278 9.03554 0.0507575 7.35198 1.34308 7.24414L7.34285 6.74093L9.65438 0.93657Z"
                fill="black"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_234_140">
                <rect width="22" height="22" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
          <p class="flex-grow-0 flex-shrink-0 w-14 text-xl text-left text-black">추천순</p>
        </div>
        <p class="flex-grow-0 flex-shrink-0 w-[97px] text-xl text-left text-[#979797]">
          낮은 가격순
        </p>
        <p class="flex-grow-0 flex-shrink-0 w-[97px] text-xl text-left text-[#979797]">
          높은 가격순
        </p>
        <p class="flex-grow-0 flex-shrink-0 w-[97px] text-xl text-left text-[#979797]">
          판매 많은순
        </p>
        <p class="flex-grow-0 flex-shrink-0 w-[97px] text-xl text-left text-[#979797]">
          리뷰 많은순
        </p>
        <p class="flex-grow-0 flex-shrink-0 w-[74px] text-xl text-left text-[#979797]">신상품순</p>
      </div>
      <div
        class="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative"
      >
      </div>
      </div>

  </div>
</template>

<style scoped>

</style>
