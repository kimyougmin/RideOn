import { defineStore } from 'pinia';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    selectedItem: null,
  }),
  getters: {
    getSelectedItem(state) {
      if (!state.selectedItem) {
        console.warn("🔄 Pinia에서 selectedItem이 없음 → LocalStorage에서 복구 시도");
        this.restoreItem();
      }
      return state.selectedItem;
    },
  },
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
        } catch (error) {
          console.error("❌ LocalStorage 데이터 파싱 오류:", error);
          this.selectedItem = null;
        }
      }
    },
  },
});
