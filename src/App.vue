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
  transform: scale(1);
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
