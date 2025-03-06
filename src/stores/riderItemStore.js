import { defineStore } from 'pinia';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    selectedItem: null, // ✅ 기본값을 null로 설정
  }),
  actions: {
    setSelectedItem(item) {
      if (!item || !item.productId) {
        console.warn("⚠️ setSelectedItem: 잘못된 데이터가 전달됨", item);
        return;
      }
      this.selectedItem = item;
      localStorage.setItem('selectedItem', JSON.stringify(item));
    },
    restoreItem() {
      const savedItem = localStorage.getItem('selectedItem');
      if (savedItem) {
        try {
          this.selectedItem = JSON.parse(savedItem);
          console.log("✅ LocalStorage에서 데이터 복구:", this.selectedItem);
        } catch (error) {
          console.error("❌ LocalStorage 데이터 파싱 오류:", error);
          this.selectedItem = null;
        }
      }
    },
  },
});
