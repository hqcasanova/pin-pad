<template>
  <app-display 
    :code="code" 
    :valid-length="validLength"
    :is-pin-locked="isPinLocked"
    :is-validating="isValidating" 
  />
  <app-keypad
    :is-disabled="isPinLocked"
    :is-input-blocked="isValidating" 
  />

  <a 
    class="link link--primary source-link"
    rel="external" 
    target="_blank" 
    href="https://github.com/hqcasanova/pin-pad"
  >
    Source
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppDisplay from '@/components/AppDisplay.vue';
import AppKeypad from '@/components/AppKeypad.vue';

import { mapState } from 'vuex';
import useValidation from '@/behaviours/useValidation';
import useLock from '@/behaviours/useLock';

export default defineComponent({
  name: 'App',
  
  components: {
    AppDisplay,
    AppKeypad
  },

  props: {
    isResetOnValidation: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    ...mapState(['code', 'validLength'])
  },

  setup(props) {
    const { validateOnLength, isValidating } = useValidation();
    const { timerOnFailcount, isPinLocked } = useLock();

    validateOnLength(props.isResetOnValidation);
    timerOnFailcount();

    return {
      isPinLocked,
      isValidating
    }
  }
});
</script>

<style lang="scss">
@import "@/scss/variables.scss";
@import "@/scss/mixins.scss";

.source-link {
  position: fixed;
  bottom: 0;
  right: 0;
  display: block;
  padding: .5em .7em;
}

/* GLOBAL DEFAULTS */
body {
  color: $white;
}

.link {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &--primary {
    color: $primary;
  }
}

.btn {
  border: none;
  cursor: pointer;
  transition: background-color $short ease-in;

  &--primary {
    @include app-button($primary);
    color: $primary-text;
  }
}

/* LOADED STATE */
.branding {
  &__logo {
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
  transition: all $long ease-in;

  .app-display {
    margin: 1em 0;
  }
  
  .app-keypad {
    max-width: 310px;
    margin-top: 1em;
  }

  /* Two-column landscape layout */
  @media (orientation: landscape) {
    display: flex;
    align-items: center;

    .app-display {
      width: 17em;  // Prevents pushing keypad if headings change after validation
      margin-right: .5em;
    }
  }
}
</style>
