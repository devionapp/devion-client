<template>
  <v-main>
    <section class="Home">
      <v-container class="Home__Container">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-img
              lazy-src="@/assets/logo-menor.png"
              max-height="150"
              max-width="150"
              contain
              src="@/assets/logo-menor.png"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-card width="600">
              <router-view></router-view>
            </v-card>
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
</style>
