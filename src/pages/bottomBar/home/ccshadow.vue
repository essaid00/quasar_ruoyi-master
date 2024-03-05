<template>
  <div
    class="cursor-pointer"
    :class="{'cc-shadow-blue text-primary ': active, 'text-grey-8': !active}"
    @mouseover="select()"
    @mouseleave="clear()"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CcShadow',
  data() {
    return {
      active: false,
    };
  },
  props: {
  },
  methods: {
    select() {
      this.active = true;
    },
    clear() {
      this.active = false;
    },
  },
};
</script>


