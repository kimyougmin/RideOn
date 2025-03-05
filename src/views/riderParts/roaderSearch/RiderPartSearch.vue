<script setup>
import ShopHeader from '@/components/ShopHeader.vue'

</script>

<template>
  <div class="w-full h-full block dark:bg-black9">
    <ShopHeader :searchValue="searchValue" @update:receiveHandler="receiveHandler($event)"/>
    <div class="h-full fles flex-col justify-center items-center dark:bg-black9">
      <div class="flex flex-col justify-start items-start w-full mx-auto relative gap-8">
      <div class="flex-grow-0 flex-shrink-0 w-[628px] h-[94px] relative">
        <p class="absolute left-0 top-16 text-2xl text-left text-black">
          소모품부터 부품까지 쉽고 빠르게 검색하세요.
        </p>
        <p class="absolute left-0 top-0 text-[40px] text-left text-black">Find Your Perfect Part</p>
      </div>
      <div class="self-stretch flex-grow-0 flex-shrink-0 h-[400px] relative">
        <img
          src="/riderPageImage/chain.svg"
          class="w-[620px] h-[400px] absolute mx-auto top-[-1.5px] object-cover border-2 border-[#979797]"
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
          <clipPath id="clip0_234_140"><rect width="22" height="22" fill="white"></rect></clipPath>
        </defs>
      </svg>
      <p class="flex-grow-0 flex-shrink-0 w-14 text-xl text-left text-black">추천순</p>
    </div>
    <p class="flex-grow-0 flex-shrink-0 w-[97px] text-xl text-left text-[#979797]">낮은 가격순</p>
    <p class="flex-grow-0 flex-shrink-0 w-[97px] text-xl text-left text-[#979797]">높은 가격순</p>
    <p class="flex-grow-0 flex-shrink-0 w-[97px] text-xl text-left text-[#979797]">판매 많은순</p>
    <p class="flex-grow-0 flex-shrink-0 w-[97px] text-xl text-left text-[#979797]">리뷰 많은순</p>
    <p class="flex-grow-0 flex-shrink-0 w-[74px] text-xl text-left text-[#979797]">신상품순</p>
  </div>
  <div class="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
    <svg
      width="1100"
      height="2"
      viewBox="0 0 1100 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="flex-grow-0 flex-shrink-0"
      preserveAspectRatio="none"
    >
      <line y1="1" x2="1100" y2="1" stroke="black"></line></svg
    ><svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="flex-grow-0 flex-shrink-0 w-[18px] h-[18px] relative"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M8.73332 1.69224C8.89981 1.60259 9.10019 1.60259 9.26668 1.69224L16.5792 5.62973C16.7614 5.72784 16.875 5.91807 16.875 6.125C16.875 6.33193 16.7614 6.52216 16.5792 6.62027L9.26668 10.5578C9.10019 10.6474 8.89981 10.6474 8.73332 10.5578L1.42082 6.62027C1.23862 6.52216 1.125 6.33193 1.125 6.125C1.125 5.91807 1.23862 5.72784 1.42082 5.62973L8.73332 1.69224Z"
        fill="#0F172A"
      ></path>
      <path
        d="M2.44851 8.45135L8.19996 11.5483C8.69942 11.8172 9.30058 11.8172 9.80004 11.5483L15.5515 8.45135L16.5792 9.00473C16.7614 9.10283 16.875 9.29306 16.875 9.49999C16.875 9.70693 16.7614 9.89715 16.5792 9.99526L9.26668 13.9328C9.10019 14.0224 8.89981 14.0224 8.73332 13.9328L1.42082 9.99526C1.23862 9.89715 1.125 9.70693 1.125 9.49999C1.125 9.29306 1.23862 9.10283 1.42082 9.00473L2.44851 8.45135Z"
        fill="#0F172A"
      ></path>
      <path
        d="M8.19996 14.9233L2.44851 11.8264L1.42082 12.3797C1.23862 12.4778 1.125 12.6681 1.125 12.875C1.125 13.0819 1.23862 13.2722 1.42082 13.3703L8.73332 17.3078C8.89981 17.3974 9.10019 17.3974 9.26668 17.3078L16.5792 13.3703C16.7614 13.2722 16.875 13.0819 16.875 12.875C16.875 12.6681 16.7614 12.4778 16.5792 12.3797L15.5515 11.8264L9.80004 14.9233C9.30058 15.1922 8.69942 15.1922 8.19996 14.9233Z"
        fill="#0F172A"
      ></path>
    </svg>
    <p class="flex-grow-0 flex-shrink-0 text-base text-left text-black">
      <span class="flex-grow-0 flex-shrink-0 text-base font-light text-left text-black"
        >검색된 상품 </span
      ><span class="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-black">79</span
      ><span class="flex-grow-0 flex-shrink-0 text-base font-light text-left text-black">개</span>
    </p>
  </div>
  <div class="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 gap-8">
    <div
      class="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 h-[1396px] gap-4"
    >
      <div
        class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[408px] relative"
      >
        <svg
          width="410"
          height="302"
          viewBox="0 0 410 302"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="flex-grow-0 flex-shrink-0 w-[408px] h-[300px]"
          preserveAspectRatio="none"
        >
          <path d="M1 1H409V301H1V1Z" fill="#FEFEFE" stroke="#979797"></path>
          <path d="M1 1H409V301H1V1Z" fill="url(#pattern0_238_3606)" stroke="#979797"></path>
          <defs>
            <pattern
              id="pattern0_238_3606"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlink:href="#image0_238_3606"
                transform="matrix(0.00165289 0 0 0.00224793 0 -0.178876)"
              ></use>
            </pattern>
            <image
              id="image0_238_3606"
              width="605"
              height="604"
              preserveAspectRatio="none"
            />
          </defs>
        </svg>
        <div
          class="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-3 px-8 py-6 bg-[#fefefe] border border-[#979797]"
        >
          <div
            class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[316px] relative gap-3"
          >
            <p
              class="self-stretch flex-grow-0 flex-shrink-0 w-[316px] text-base text-left text-black"
            >
              메리다
            </p>
            <p
              class="self-stretch flex-grow-0 flex-shrink-0 w-[316px] text-xl font-bold text-left text-black"
            >
              메리다 스컬트라 림 100 (2022년형)
            </p>
            <p
              class="self-stretch flex-grow-0 flex-shrink-0 w-[316px] text-2xl font-bold text-left text-black"
            >
              1,317,500원
            </p>
          </div>
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="flex-grow-0 flex-shrink-0"
            preserveAspectRatio="none"
          >
            <path
              d="M17 5.09091C17 2.83156 15.1345 1 12.8333 1C11.1128 1 9.63581 2.02389 9 3.48493C8.3642 2.02389 6.88722 1 5.16667 1C2.86548 1 1 2.83156 1 5.09091C1 11.6551 9 16 9 16C9 16 17 11.6551 17 5.09091Z"
              stroke="#2A2A2A"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
      </div>

      </div>
    </div>
    <div
      class="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[300px] relative gap-8 p-4 rounded bg-[#202020]"
    >
      <p class="flex-grow-0 flex-shrink-0 text-xl font-bold text-center text-white">더보기</p>
    </div>
  </div>
</div>
    </div>
</template>

<style scoped>

</style>
