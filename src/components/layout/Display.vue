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

      <template v-else>The code must be {{ maxLength }} characters long</template>
    </p>

    <pin-code class="display-pin display-item"
      :class="{'error': isFail && !isValidating}"
      :reqLength="maxLength"
      :visibleFromLast="pinShowLast"
      :isLoading="isValidating"
      :value="code"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PinCode from '@/components/ui/PinCode.vue';
import { mapGetters, mapState } from 'vuex';
import useValidation from '@/behaviours/useValidation';
import useLock from '@/behaviours/useLock';

export default defineComponent({
  name: 'Display',
  components: { 
    PinCode
  },

  props: {
    pinShowLast: {
      type: Number,
      default: JSON.parse(process.env.VUE_APP_PIN_SHOW_LAST)
    },

    isValidateOnLength: {
      type: Boolean,
      default: true
    },

    isResetOnValidation: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    ...mapState(['code', 'maxLength']),
    ...mapGetters(['isLastAttempt'])
  },

  setup(props) {
    const { isFail, isSuccess, isValidating } = useValidation(props.isValidateOnLength, props.isResetOnValidation);
    const { paddedCountdown, isPinLocked } = useLock();

    return {
      paddedCountdown,
      isPinLocked,
      isFail,
      isSuccess,
      isValidating
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

  .pin-code.error {
    @include shake-animation($medium);
  }
}
</style>