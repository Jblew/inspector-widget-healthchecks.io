<template>
  <stateful-resource :resource="healthchecksKeyResource">
    <healthchecks-module-ui :key="healthchecksKeyResource.result" />
  </stateful-resource>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { StatefulResource, Resource } from 'vue-stateful-resource';
import firebase from 'firebase/app';
import HealthchecksModuleUi from './HealthchecksModuleUi.vue';
import { loadKey } from './loadKey';

@Component({
  components: { StatefulResource, HealthchecksModuleUi },
})
export default class HealthchecksModule extends Vue {
  healthchecksKeyResource: Resource<{ key: string }> = Resource.loading();

  beforeMount() {
    loadKey().then(
      (res) => {
        this.healthchecksKeyResource = res;
      },
    ).catch(console.error);
  }
}
</script>
