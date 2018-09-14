Vue.component('shape-selector', {
  props: ['shape'],
  template: `
    <h1 class="shape" @click="$emit('shape-clicked', shape)">
      {{ shape }}
    </h1>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    shapes: ['circle', 'square', 'triangle', 'pentagon'],
    activeShape: 'circle'
  },
  methods: {
    isActive: function(shape) {
      return shape === this.activeShape
    },
    handleClick: function(shape) {
      this.activeShape = shape
    }
  },
  template: `
    <div>
      <shape-selector
        v-for="shape in shapes"
        v-bind:shape="shape"
        v-bind:class="{ active: isActive(shape) }"
        v-on:shape-clicked="handleClick"
      />
    </div>
  `
})
