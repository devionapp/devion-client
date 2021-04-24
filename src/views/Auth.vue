<template>
  <v-main>
    <section class="Home">
      <v-container class="Home__Container">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <h1>Devion</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <div style="width:580px">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <Waves />
  </v-main>
</template>
<script>
import Waves from "@/components/Layout/Waves";
export default {
  components: { Waves },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.Home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
