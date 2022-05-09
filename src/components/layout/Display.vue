<template>
  <div class="display-layout">
    <h2 class="display-title display-item">
      <template v-if="isFail">
        <strong class="display-status error-text">{{ isPinLocked ? 'LOCKED' : 'ERROR' }}</strong>
        {{ isPinLocked ? 'Keypad disabled' : 'Wrong PIN' }}
      </template>

      <template v-else-if="isSuccess">
        <strong class="display-status success-text">OK</strong>
        PIN verified
      </template>

      <template v-else>
        Enter your PIN code
      </template>
    </h2>

    <p class="display-feedback display-item">
      <template v-if="isValidating">Checking...</template>
      
      <template v-else-if="isFail && !isPinLocked">
        {{ isLastAttempt ? 'Last try remaining' : 'Please try again' }}
      </template>

      <template v-else-if="isFail && isPinLocked">
        Please wait {{ paddedCountdown }} seconds
      </template>

      <template v-else-if="isSuccess">Your PIN is valid</template>

      <template v-else>The code must be {{ validLength }} characters long</template>
    </p>

    <pin-string class="display-pin display-item"
      :class="{'error': isFail && !isValidating}"
      :pinLength="validLength"
      :isLoading="isValidating || isPinLocked"
      :value="code"
      v-slot="slotProps">

      <pin-char :isVisible="isCharVisible(slotProps.pinPos)" :value="slotProps.pinChar" />
    </pin-string>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PinString from '@/components/ui/PinString.vue';
import PinChar from '@/components/ui/PinChar.vue';

import { mapGetters } from 'vuex';
import useValidation from '@/behaviours/useValidation';
import useLock from '@/behaviours/useLock';

export default defineComponent({
  name: 'Display',

  components: { 
    PinString,
    PinChar
  },

  props: {
    code: {
      type: String,
      required: true
    },
    
    validLength: {
      type: Number,
      required: true
    },

    // Number of characters from the right that remain visible
    visibleFromLast: {
      type: Number,
      default: JSON.parse(process.env.VUE_APP_PIN_SHOW_LAST) | 0
    },

    isPinLocked: {
      type: Boolean,
      default: false
    },

    isValidating: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters(['isLastAttempt', 'isFail', 'isSuccess'])
  },

  setup() {
    const { paddedCountdown } = useLock();

    return {
      paddedCountdown,
    }
  },

  methods: {
    isCharVisible(charPos: number) {
      return charPos >= this.code.length - this.visibleFromLast;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";
@import "@/scss/mixins.scss";

.display-layout {
  text-align: center;

  .display-item {
    margin: .5rem 0;
  }

  h2 {
    font-family: "Bodoni MT", "Bodoni 72", Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif;
    font-size: 1.7em;
    font-weight: 500;
    text-align: center;

    strong {
      font-weight: 700;
    }
  }

  .pin-string.error {
    @include shake-animation($medium);
  }
}
</style>
