# PIN pad

A **purposefully over-engineered** take on building a Vue3-based pin code pad to learn how to unit test properly with Jest. Among other things, it's mobile-first, includes validation and supports touch hold events through [`vue3-touch-events`](https://github.com/robinrodricks/vue3-touch-events). Play around with the app [here](https://hqcasanova.github.io/pin-pad).

The valid code is defined as an environment variable in the [`.env`](/.env) file.

## General description

- The app’s behaviour details are inspired by this design: https://dribbble.com/shots/3295791--Wrong-PIN For example, the pin is cleared after validation, just as in the animation.
- The present solution has been over-engineered on purpose to showcase the different avenues for segregation of business from presentation logic and, thus, potential for scalability and reuse. Things such as global state management and composables could easily have been done away with.
- The high-level architecture is the typical one for medium to large-sized apps:
    - API layer with PIN check (would-be request)
    - Vuex store with minimum logic related to PIN code’s value, static properties (e.g. maxLength) and states (e.g. isFail).
    - Composables with behaviour realised by tying together elements from the store (e.g. committing a PIN value to the store only if the pin is short).
    - Higher-order components responsible for layout and making use of store and/or composables.
    - Lower-order UI components with as little dependencies on the rest of the app as possible.
- Each position in the PIN code is internally generalised to a character to allow support for alpha-numeric codes.
- Press and hold gesture is supported, with each key being emitted every 100 milliseconds.
- App-level constants are all listed in the “.env” file under the project’s root folder.
- The keypad is disabled while the locked state is on.
- The digit placeholders are dimmed and highlighted alternatively while the pin is being verified. This visual feedback will quickly become necessary once a remote API is employed for pin submission.
- The data transaction for pin submission and validation has been coded as an async op since the data source will eventually be a server.
- Vuex has been chosen for global state given the wide range of Vuex-based plugins for persistence on localStorage, which will be useful for saving a hypothetical authentication token sent back after successful pin submission.
- The store’s TypeScript-based implementation is modelled after the following repo: https://github.com/jsbroks/vuex-typescript-todoapp .

## UX improvements

- A toggle-type control should be provided so that automatic validation could be disabled. Some users may find auto-validation, a helpful feature at face value, completely obtrusive as it prevents them from being in full control of when the passcode should be considered complete. For example, when the user accidentally types in the last digit: if the user is aware of the accident (likely because of the OK/WRONG feedback), then they would likely expect to be able to replace the extra digit and, only after that, submit the amended code (a submit button would be provided).
- The above feature would require a backspace button to clear the last digit and be able to change the previous one.
- Each digit placeholder should be selectable so that, in the event of a mistyped digit, the user can change the affected digit without having to clear all the ones after it.
- A clear button to wipe clean the display and remove all digits may well be a necessary feature in cases such as right after a pin has been validated and clearing on validation is disabled: while some users may intuitively know that the currently valid pin code will be wiped out upon pressing the first key, others may not work out that affordance.
- After validation, both with or without auto-clearing, the state rendered is that one corresponding to the last PIN value. For example, if the PIN was correct, the code is cleared and the success feedback remains, even while typing a new entry. Ideally, the display should go back to its initial state asking for user input once the first character of the new entry is typed.


## Instructions for local deployment

- Git clone the project under a folder of your choice.
- Assuming NPM is already installed, CD into the folder and execute the command `npm install`. This will get all the necessary dependencies off the web.
- Once package install is complete, execute the command `npm run serve`.
- Open the browser and head to the URL http://localhost:8080.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
