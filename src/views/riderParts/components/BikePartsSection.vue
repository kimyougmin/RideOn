<template>
  <article class="w-full flex flex-col gap-16">
    <!-- 상단 -->
    <div class="w-full flex flex-col justify-center items-center gap-4">
      <div class="w-full flex items-center gap-8">
        <div class="w-full h-[1px] bg-black6"></div>
        <p class="w-96 text-title font-bold m-0 text-primaryRed">Bike Parts</p>
        <div class="w-full h-[1px] bg-black6"></div>
      </div>
      <p class="text-4xl font-bold m-0 dark:text-black1">라이딩의 즐거움을 더할 최상의 선택</p>
      <p class="text-sub-title text-center m-0 dark:text-black1">
        라이딩에 필요한 모든 장비 <br />
        내구성 높은 부품, 편안한 라이딩을 위한 용품, 그리고 스타일을 더할 액세서리까지
      </p>
    </div>
    <section class="grid grid-cols-2 gap-8">
      <article class="relative bg-primaryRed p-8">
        <h3 class="text-[28px] font-bold text-left text-black1">자전거 부품</h3>
        <p class="text-body2 text-left text-black1 mt-2">
          타이어 / 안장 / 핸들 / 그립 / 테이프 / 페달 / 속도계 <br />
          핸들바 / 변속기 / 크랭크 / 체인 / 라이트 / 브레이크 <br />
          백미러 / 셀프정비
        </p>
        <div class="absolute -bottom-1 right-0">
          <img src="/riderPageImage/bikeParts_1.png" class="size-full" />
        </div>
      </article>
      <article class="relative bg-black6 p-8">
        <div class="absolute top-2 left-14">
          <img src="/riderPageImage/bikeParts_2.png" class="size-full" />
        </div>
        <div class="flex flex-col gap-2 absolute top-6 right-10">
          <h3 class="text-[28px] font-bold text-left text-black1">라이더 용품</h3>
          <p class="text-body2 text-left text-black1 mt-2">
            헬멧 / 모자 / 두건 / 자전거장갑 / 자전거슈즈 <br />
            슈커버 / 토커버 / 자전거양말 / 상하의세트 <br />
            상의 / 저지 / 하의 / 빕 <br />
            이너웨어 / 보호대
          </p>
        </div>
      </article>
    </section>
  </article>
</template>
