<template>
  <div>
     <mu-grid-list :cols="3" :padding="20" :cellHeight="250">
        <!-- :class="[selectedId === tile.id ? 'active' : 'inactive']" -->
      <mu-grid-tile :cols="1" v-for="(tile, index) in items" :key="index">
        <div class="img-container">
          <img src="../../../assets/tile_grey.png" class="avatar" 
            :style="{width: tile.dw + 'px!important', height: tile.dh + 'px!important'}"/>
        </div>
        <div class="td-d">
          <div class="td-d-item " style="color: #767676;">{{tile.w}}x{{tile.h}}</div>
          <div class="td-d-item ">{{tile.label}}</div>
        </div>
        <div id="click-area" style="width: 100%; height: 100%; background-color: transparent;
          position: absolute; z-index: 1" 
          @click="onItemSelected(tile, index)"/>
      </mu-grid-tile>
    </mu-grid-list>
  </div>
</template>
<script>
/*
  @component: tab-detail
  @props:
    items: the items to be populated on the list
  @events: 
    onItemSelected: occurs then an item is clicked
*/
export default {
  name: "tab-detail",
  props: ["items", "selectedTab"],
  data() {
    return {
      selectedId: ""
    };
  },
  mounted() {
    this.onItemSelected(this.items[0], 0);
  },
  methods: {
    onItemSelected(item, index) {
      console.log('item;',item)
      if (!item) {
        return;
      }
      this.selectedId = item.id;
      this.$_setSelected(index, true);
      this.$emit("onItemSelected", item);
    },
    $_setSelected(index) {
      var els = this.$el.getElementsByClassName("mu-grid-tile");
      if (!els) {
        return;
      }
      for (var i = 0; i < els.length; i++) {
        if (i === index) {
          els[i].style.border = "2px solid #4A574B";
        } else {
          els[i].style.border = "#222222 solid 2px";
        }
      }
    }
  },
  watch: {
    selectedTab: function(val) {
      setTimeout(() => {
        this.onItemSelected(this.items[0], 0);
      }, 50);
    }
  }
};
</script>
<style scoped>
.td-d {
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
  display: grid;
  text-align: center;
}
.td-d-item {
  margin: auto auto;
  width: 100%;
  text-align: center;
  font-size: 14px;
}
.mu-grid-tile-titlebar {
  background-color: transparent;
}
.active {
  border: 2px solid #4a574b;
}
.inactive {
  border: #222222 solid 2px;
}
.mu-grid-tile {
  border-radius: 2px;
  border: #222222 solid 2px !important;
}
.mu-grid-tile:hover {
  border: 2px solid #4a574b;
}
.mu-grid-tile-title {
  text-align: center;
  color: #767676;
  font-size: 14px;
}
.mu-grid-tile-subtitle {
  font-size: 16px;
  text-align: center;
}
.avatar {
  text-align: center;
  margin: auto auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.list {
  float: left;
}
.img-container {
  width: 100%;
  height: 50%;
  position: absolute;
  text-align: center;
}
</style>



