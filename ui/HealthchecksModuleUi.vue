<template>
  <div class="theme-dark-hcmi">
    <div v-if="hckey" id="healthchecks-panel">
      <h3 :data-readonly-key="hckey">
        <a href="https://healthchecks.io/">Healthchecks.io</a>
      </h3>
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
  hckey!: string;

  private timer: any = '';

  mounted() {
    this.updatePanel();

    console.log({ KEY: this.hckey });
  }

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updatePanel() {
    updateHealthchecksPanel('#healthchecks-panel h3');
    this.timer = setTimeout(() => this.updatePanel(), 5000);
  }
}


</script>
<style>
.theme-dark-hcmi h3 a {
  color: #bbb;
  font-weight: 200;
  font-size: 1.5em;
  text-decoration: none;
  border-bottom: 1px solid #bbb;
}

.theme-dark-hcmi {
  background: #000;
  color: #fff;
}

.theme-dark-hcmi #healthchecks-panel > div {
  background: #aaa;
  color: #000;
}

.theme-dark-hcmi #healthchecks-panel > div.status-up {
  color: #fff;
  background: #263026;
}

.theme-dark-hcmi #healthchecks-panel > div.status-started {
  color: #fff;
  background: #263026;
}

.theme-dark-hcmi #healthchecks-panel > div.status-grace {
  color: #000;
  background: #ffb300;
}

.theme-dark-hcmi #healthchecks-panel > div.status-down {
  color: #000;
  background: #ff3929;
}

.theme-dark-hcmi .spinner:after {
  border-color: #4c604c transparent #4c604c transparent;
}

/* Spinner from https://loading.io/css/ */
.theme-dark-hcmi .spinner {
  display: none;
}

.theme-dark-hcmi div.status-started .spinner {
  position: absolute;
  right: 8px;
  top: 50%;
  margin-top: -18px;
  display: inline-block;
  width: 36px;
  height: 36px;
}
.theme-dark-hcmi .spinner:after {
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

#healthchecks-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 8px;
  padding: 8px;
}

#healthchecks-panel > h1 {
  grid-column-start: 1;
  grid-column-end: -1;
  margin: 12px 0;
  font-size: 20px;
}

#healthchecks-panel > div {
  padding: 8px 8px 32px 8px;
  font-size: 18px;
  position: relative;
}

#healthchecks-panel > div .name {
  text-overflow: ellipsis;
  overflow: hidden;
}

#healthchecks-panel > div .lp {
  position: absolute;
  font-size: 13px;
  opacity: 0.8;
}

#healthchecks-panel > div .lp {
  bottom: 8px;
  left: 8px;
}

.theme-dark-hcmi .check-template {
  display: none;
}
</style>
