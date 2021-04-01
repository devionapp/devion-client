<template>
  <v-main>
    <section class="Home">
      <v-container class="Home__Container">
        <v-card width="600">
          <LoginForm />
        </v-card>
      </v-container>

      <div class="Home__Waves">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#C12157"
            fill-opacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480
          ,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152
          ,234.7C1248,235,1344,181,1392,154.7L1440,128L1440
          ,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,
          320C768,320,672,320,576,320C480,320,384,320,288,
          320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  </v-main>
</template>
<script>
import LoginForm from "@/components/LoginForm";
export default {
  components: { LoginForm },
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

  &__Container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &__Waves svg {
    vertical-align: top;
  }
}
</style>
