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
      localStorage.setItem('selectedItem', JSON.stringify(item));
      localStorage.setItem('selectedLink', item.link);
    },
    restoreItem() {
      const savedItem = localStorage.getItem('selectedItem');
      const savedLink = localStorage.getItem('selectedLink');

      if (savedItem) this.selectedItem = JSON.parse(savedItem);
      if (savedLink) this.selectedLink = savedLink;
    },
  },
});
