<template>
  <b-form @submit.prevent="changeAbout">
    <b-card>
      <b-row>
        <b-col cols="12">
          <!-- About title -->
          <b-form-group label="About title" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  placeholder="Uz About title"
                  v-model="title.uz"
                  required
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  placeholder="Ru About title"
                  v-model="title.ru"
                  required
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  placeholder="En About title"
                  v-model="title.en"
                  required
                />
              </b-tab>
            </b-tabs>
          </b-form-group>

          <!-- About content -->
          <b-col cols="12">
            <b-form-group label="About content" label-cols-md="4" class="mt-2">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <quill-editor v-model="mission.uz" :options="snowOption" />
                </b-tab>
                <b-tab title="Ру">
                  <quill-editor v-model="mission.ru" :options="snowOption" />
                </b-tab>
                <b-tab title="En">
                  <quill-editor v-model="mission.en" :options="snowOption" />
                </b-tab>
              </b-tabs>
            </b-form-group>
          </b-col>
        </b-col>
      </b-row>
    </b-card>

    <!-- Sumbit -->
    <b-card>
      <b-row>
        <!-- submit and reset -->
        <b-col class="d-flex justify-content-center">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
          >
            Submit
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-form>
</template>

<script>
import axios from "axios";
import {quillEditor} from "vue-quill-editor";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BCard,
  BTab,
  BTabs,
  BCardText,
  BFormFile,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BCard,
    Ripple,
    BTabs,
    BTab,
    BCardText,
    BFormFile,
    ToastificationContent,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      category: {},
      title: {
        uz: "",
        ru: "",
        en: "",
      },
      mission: {
        uz: "",
        ru: "",
        en: "",
      },
      snowOption: {
        theme: "snow",
      },
    };
  },
  methods: {
    async changeAbout() {
      const form = {};
      form.title = this.title.ru;
      form.title_uz = this.title.uz;
      form.title_ru = this.title.ru;
      form.title_en = this.title.en;

      form.mission = this.mission.ru;
      form.mission_uz = this.mission.uz;
      form.mission_ru = this.mission.ru;
      form.mission_en = this.mission.en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/company/about/`, form, params)
        .then(() => {
          this.$router.push({name: "about"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Biz haqimizda sahifasi yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Xatolik ketti :(",
              icon: "AlertCircleIcon",
              variant: "warning",
            },
          });
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "@core/scss/vue/libs/quill.scss";
</style>
