import { defineStore } from 'pinia';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    selectedItem: JSON.parse(localStorage.getItem('selectedItem')) || null,
    selectedLink: localStorage.getItem('selectedLink') || null,
  }),
  actions: {
    setSelectedItem(item) {
      this.selectedItem = item;
      this.selectedLink = item.link;
      localStorage.setItem('selectedItem', JSON.stringify(item)); // 🔥 상태를 강제 저장
      localStorage.setItem('selectedLink', item.link); // 🔥 링크도 저장
    },
    restoreItem() {
      // 🔄 외부 사이트 방문 후 돌아왔을 때 자동 복구
      const savedItem = localStorage.getItem('selectedItem');
      const savedLink = localStorage.getItem('selectedLink');

      if (savedItem) this.selectedItem = JSON.parse(savedItem);
      if (savedLink) this.selectedLink = savedLink;
    },
  },
});
