<template>
  <display class="layout-item" />
  <keypad class="layout-item" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Display from '@/components/layout/Display.vue';
import Keypad from '@/components/layout/Keypad.vue';

export default defineComponent({
  name: 'App',
  components: {
    Display,
    Keypad
  }
});
</script>

<style lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/mixins.scss";

/* GLOBAL DEFAULTS */
body {
  color: $white;
}

a {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.primary-link {
    color: $primary;
  }
}

button {
  border: none;
  cursor: pointer;
  transition: background-color $short ease-in;

  &.primary-btn {
    @include app-button($primary);
    color: $primary-text;
  }
}

/* CONVENIENCE CLASSES */
.error-text {
  color: darken($error, 10%);
}

.success-text {
  color: darken($success, 10%);
}

/* LOADED STATE */
.branding {
  .logo {
    opacity: 1;
    animation: none;
  }
  
  body & {
    color: $white;
  }
}

#app {
  opacity: 1;
  max-height: 100vh;
  transform: scale(1);
  transition: all $long ease-in;

  .display-layout {
    margin: 1em 0;
  }
  
  .keypad-layout {
    max-width: 310px;
    margin-top: 1em;
  }

  /* Two-column landscape layout */
  @media (orientation: landscape) {
    display: flex;
    align-items: center;

    .display-layout {
      width: 17em;  // Prevents pushing keypad if headings change after validation
      margin-right: .5em;
    }
  }
}
</style>
