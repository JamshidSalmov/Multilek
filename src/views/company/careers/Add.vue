<template>
  <b-form @submit.prevent="changeCareer">
    <b-card>
      <b-row>
        <b-col cols="12">
          <!-- Career title -->
          <b-form-group label="Career title" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input
                  placeholder="Uz Career title"
                  v-model="career.uz"
                  required
                />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input
                  placeholder="Ru Career title"
                  v-model="career.ru"
                  required
                />
              </b-tab>
              <b-tab title="En">
                <b-form-input
                  placeholder="En Career title"
                  v-model="career.en"
                  required
                />
              </b-tab>
            </b-tabs>
          </b-form-group>

          <!-- Career content -->
          <b-col cols="12">
            <b-form-group label="Career content" label-cols-md="4" class="mt-2">
              <b-tabs pills align="left">
                <b-tab title="Uz" active>
                  <quill-editor
                    v-model="career_content.uz"
                    :options="snowOption"
                  />
                </b-tab>
                <b-tab title="Ру">
                  <quill-editor
                    v-model="career_content.ru"
                    :options="snowOption"
                  />
                </b-tab>
                <b-tab title="En">
                  <quill-editor
                    v-model="career_content.en"
                    :options="snowOption"
                  />
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
      career: {
        uz: "",
        ru: "",
        en: "",
      },
      career_content: {
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
    async changeCareer() {
      const form = {};
      form.career = this.career.ru;
      form.career_uz = this.career.uz;
      form.career_ru = this.career.ru;
      form.career_en = this.career.en;

      form.career_content = this.career_content.ru;
      form.career_content_uz = this.career_content.uz;
      form.career_content_ru = this.career_content.ru;
      form.career_content_en = this.career_content.en;

      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .post(`${this.$baseUrl}/company/career/`, form, params)
        .then(() => {
          this.$router.push({name: "careers"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Ish o'rni yaratildi!",
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
