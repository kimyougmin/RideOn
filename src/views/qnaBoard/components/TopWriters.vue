<template>
  <div class="flex flex-col gap-4 border border-black4 rounded-lg px-4 py-3">
    <h3 class="text-body1 font-bold dark:text-black3">RideOn Top Writters</h3>
    <div class="flex flex-col gap-2">
      <ul class="flex flex-col gap-2 list-none p-0">
        <li v-for="writer in writers" :key="writer.id" class="flex gap-2 items-center">
          <div class="flex gap-2 items-center">
            <div class="w-5 h-5 rounded-full overflow-hidden">
              <img
                :src="writer.profileImage"
                :alt="writer.fullName"
                class="w-full h-full object-cover"
              />
            </div>
            <span class="text-body1 font-light dark:text-black3">{{ writer.fullName }}</span>
          </div>
          <span class="text-body2 text-black5 font-light dark:text-black3">{{
            writer.postCount
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  writers: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>
