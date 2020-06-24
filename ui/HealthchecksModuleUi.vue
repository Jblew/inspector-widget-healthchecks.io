<template>
  <div class="theme-dark">
    <div class="check-template">
      <div class="name"></div>
      <div class="lp"></div>
      <div class="spinner"></div>
    </div>

    <div id="healthchecks-panel">
      <h1 :data-readonly-key="key">Jedrzej healthchecks</h1>
    </div>
  </div>
</template>

<script lang="ts">
// Based on https://github.com/healthchecks/dashboard
import { Component, Vue, Prop } from 'vue-property-decorator';
import { updateHealthchecksPanel } from './fetchHealthchecks';

@Component
export default class HealthchecksModuleUi extends Vue {
  @Prop({ required: true })
  key!: string;

  private timer: any = '';

  mounted() {
    this.updatePanel();
  }

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updatePanel() {
    updateHealthchecksPanel('#healthchecks-panel');
    this.timer = setTimeout(() => this.updatePanel(), 5000);
  }
}


</script>
<style scoped>
/* Colors, dark theme */

.theme-dark {
  background: #000;
  color: #fff;
}

.theme-dark #panel > div {
  background: #aaa;
  color: #000;
}

.theme-dark #panel > div.status-up {
  color: #fff;
  background: #263026;
}

.theme-dark #panel > div.status-started {
  color: #fff;
  background: #263026;
}

.theme-dark #panel > div.status-grace {
  color: #000;
  background: #ffb300;
}

.theme-dark #panel > div.status-down {
  color: #000;
  background: #ff3929;
}

.theme-dark .spinner:after {
  border-color: #4c604c transparent #4c604c transparent;
}

/* Colors, light theme */

.theme-light {
  background: #fff;
  color: #333;
}

.theme-light #panel > div {
  color: #000;
  background: #fff;
  border: 2px solid #ddd;
}

.theme-light #panel > div.status-grace {
  color: #000;
  background: #ffab00;
  border: none;
}

.theme-light #panel > div.status-down {
  color: #fff;
  background: #d81818;
  border: none;
}

.theme-light .spinner:after {
  border-color: #ddd transparent #ddd transparent;
}

/* Spinner from https://loading.io/css/ */
.spinner {
  display: none;
}

div.status-started .spinner {
  position: absolute;
  right: 8px;
  top: 50%;
  margin-top: -18px;
  display: inline-block;
  width: 36px;
  height: 36px;
}
.spinner:after {
  content: ' ';
  display: block;
  width: 24px;
  height: 24px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid transparent;
  animation: lds-dual-ring 1.25s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Layout and font */

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif;
  height: 100%;
  margin: 0;
}

#panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 8px;
  padding: 8px;
}

#panel > h1 {
  grid-column-start: 1;
  grid-column-end: -1;
  margin: 12px 0;
  font-size: 20px;
}

#panel > div {
  padding: 8px 8px 32px 8px;
  font-size: 18px;
  position: relative;
}

#panel > div .name {
  text-overflow: ellipsis;
  overflow: hidden;
}

#panel > div .lp {
  position: absolute;
  font-size: 13px;
  opacity: 0.8;
}

#panel > div .lp {
  bottom: 8px;
  left: 8px;
}

.check-template {
  display: none;
}
</style>
