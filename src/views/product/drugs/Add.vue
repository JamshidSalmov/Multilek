<template>
  <b-form @submit.prevent="createDrugItem">
    <b-card>
      <b-row>
        <!-- Category -->
        <b-col cols="12">
          <b-form-group
            label="Category"
            label-for="h-catogory"
            label-cols-md="4"
          >
            <v-select
              id="h-catogory"
              :value="selectedCategory"
              label="name"
              :options="category"
              :required="!selectedCategory"
              placeholder="Category"
              @input="setCategory"
            >
              <template #selected-option="{ name }">
                {{ name }}
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Type -->
        <b-col cols="12">
          <b-form-group label="Type" label-for="h-type" label-cols-md="4">
            <v-select
              id="h-type"
              :value="selectedType"
              label="title"
              :options="type"
              :required="!selectedType"
              placeholder="Type"
              @input="setType"
            >
              <template #selected-option="{ title }">
                {{ title }}
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Brand -->
        <b-col cols="12">
          <b-form-group label="Brand" label-for="h-brand" label-cols-md="4">
            <v-select
              id="h-brand"
              :value="selectedBrand"
              label="title"
              :options="brand"
              :required="!selectedBrand"
              placeholder="Brand"
              @input="setBrand"
            >
              <template #selected-option="{ title }">
                {{ title }}
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <!-- Name -->
        <b-col cols="12">
          <b-form-group label="Name" label-cols-md="4">
            <b-tabs pills align="left">
              <b-tab title="Uz" active>
                <b-form-input placeholder="Uz Name" v-model="name.uz" />
              </b-tab>
              <b-tab title="Ру">
                <b-form-input placeholder="Ru Name" v-model="name.ru" />
              </b-tab>
              <b-tab title="En">
                <b-form-input placeholder="En Name" v-model="name.en" />
              </b-tab>
            </b-tabs>
          </b-form-group>
        </b-col>

        <!-- Drug price -->
        <b-col lg="12">
          <b-form-group
            label="Drug price"
            label-for="drugPrice"
            label-cols-md="4"
          >
            <b-form-input
              :type="'number'"
              id="drugPrice"
              placeholder="Drug price"
              v-model="product.price"
            />
          </b-form-group>
        </b-col>
        <!-- Amount in store -->
        <b-col lg="12">
          <b-form-group
            label="Amount in store"
            label-for="drugCount"
            label-cols-md="4"
          >
            <b-form-input
              id="drugCount"
              placeholder="Amount in store"
              v-model="product.amount_in_store"
            />
          </b-form-group>
        </b-col>

        <!-- code -->
        <b-col lg="12">
          <b-form-group label="Code*" label-for="drugCode" label-cols-md="4">
            <b-form-input
              id="drugCode"
              required
              placeholder="Code*"
              v-model="product.code"
            />
          </b-form-group>
        </b-col>

        <!-- Available -->
        <b-col cols="12">
          <b-form-group label="Available" label-cols-md="4">
            <b-form-checkbox
              v-model="product.available"
              class="custom-control-primary"
            >
              Available
            </b-form-checkbox>
          </b-form-group>
        </b-col>

        <!-- Active -->
        <b-col cols="12">
          <b-form-group label="Active" label-cols-md="4">
            <b-form-checkbox
              v-model="product.active"
              class="custom-control-primary"
            >
              Active
            </b-form-checkbox>
          </b-form-group>
        </b-col>

        <!-- Recommended -->
        <b-col cols="12">
          <b-form-group label="Recommended" label-cols-md="4">
            <b-form-checkbox
              v-model="product.recommended"
              class="custom-control-primary"
            >
              Recommended
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <!-- Information -->
    <b-card>
      <app-collapse>
        <app-collapse-item title="Information">
          <b-tabs pills align="left" v-if="product">
            <b-tab title="Uz" active>
              <quill-editor v-model="content.contentUz" :options="snowOption" />
            </b-tab>
            <b-tab title="Ру">
              <quill-editor v-model="content.contentRu" :options="snowOption" />
            </b-tab>
            <b-tab title="En">
              <quill-editor v-model="content.contentEn" :options="snowOption" />
            </b-tab>
          </b-tabs>
        </app-collapse-item>
      </app-collapse>
    </b-card>

    <!-- Main image -->
    <b-card>
      <b-form-group label="Main image" label-cols-md="4">
        <b-form-file
          v-model="mainImage"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          @change="onFileChange"
          accept="image/png, image/gif, image/jpeg"
        />
        <img
          class="mt-1"
          v-if="mainImageUrl"
          :src="mainImageUrl"
          data-fancybox-image="mainImageUrl"
          alt="main Image"
          style="height: 150px; object-fit: contain"
        />
      </b-form-group>
    </b-card>

    <!-- Image Galley -->
    <b-card>
      <b-form-group label="Image gallery" label-cols-md="4">
        <b-form-file
          v-model="imageGallery"
          multiple
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          @change="onImageGalleryChange"
          accept="image/png, image/gif, image/jpeg"
        />
        <swiper
          class="mt-1 swiper-multiple swiper-centered-slides d-flex align-items-center"
          :options="swiperOptions"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
        >
          <swiper-slide v-for="image in imageGalleryUrls" :key="image.id">
            <b-img
              style="height: 150px; object-fit: contain"
              :src="image.image"
              data-fancybox="image.image"
              fluid
            />
          </swiper-slide>

          <div slot="pagination" class="swiper-pagination" />
          <!-- Add Arrows -->
          <div slot="button-next" class="swiper-button-next" />
          <div slot="button-prev" class="swiper-button-prev" />
        </swiper>
      </b-form-group>
    </b-card>

    <!-- Sumbit -->
    <b-card>
      <b-row>
        <!-- submit and reset -->
        <b-col offset-md="4">
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
            @click="reset_all"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-card>
  </b-form>
</template>

<script>
import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import "@fancyapps/ui/dist/panzoom.controls.css";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {quillEditor} from "vue-quill-editor";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import vSelect from "vue-select";
import axios from "axios";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BCard,
  BTab,
  BTabs,
  BCardText,
  BFormFile,
  BBadge,
  BFormTextarea,
  BImg,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import {heightTransition} from "@core/mixins/ui/transition";
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    vSelect,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BCard,
    Ripple,
    BTabs,
    BTab,
    quillEditor,
    BCardText,
    AppCollapse,
    AppCollapseItem,
    BFormFile,
    BBadge,
    BFormTextarea,
    heightTransition,
    Swiper,
    SwiperSlide,
    BImg,
    ToastificationContent,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      swiperOptions: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      snowOption: {
        theme: "snow",
      },

      product: {
        price: "",
        amount_in_store: "",
        code: "",
        recommended: false,
        active: false,
        available: false,
      },
      category: [],
      selectedCategory: {},

      type: [],
      selectedType: {},

      brand: [],
      selectedBrand: {},

      content: {
        contentUz: "",
        contentRu: "",
        contentEn: "",
      },

      name: {
        uz: "",
        ru: "",
        en: "",
      },

      imageGallery: null,
      imageGalleryUrls: null,
      imageGalleryArr: [],
      mainImage: null,
      mainImageUrl: null,
    };
  },
  mounted() {
    this.getData();
    Fancybox.bind("[data-fancybox]", {
      Image: {
        zoom: true,
      },
    });
    Fancybox.bind("[data-fancybox-image]", {
      Image: {
        zoom: true,
      },
    });
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.mainImageUrl = URL.createObjectURL(file);
    },
    onImageGalleryChange(e) {
      this.imageGalleryUrls = [];
      this.imageGalleryArr = e.target.files;
      console.log(this.imageGalleryArr);
      for (let index = 0; index < e.target.files.length; index++) {
        let file = URL.createObjectURL(e.target.files[index]);
        this.imageGalleryUrls[index] = {
          image: file,
        };
      }
    },
    async getData() {
      await axios
        .get(`${this.$baseUrl}/product/category/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.category = res.data.results;
        });

      await axios
        .get(`${this.$baseUrl}/product/type/`, {
          headers: {
            "Accept-Language": "ru",
          },
        })
        .then((res) => {
          this.type = res.data.results;
        });

      await axios
        .get(`${this.$baseUrl}/product/brand/`, {
          headers: {
            "Accept-Language": "uz",
          },
        })
        .then((res) => {
          this.brand = res.data.results;
        });
    },
    async createDrugItem() {
      const form = new FormData();
      if (this.selectedCategory?.id) {
        form.append("category", this.selectedType?.id);
      }
      if (this.selectedBrand?.id) {
        form.append("brand", this.selectedBrand?.id);

      }
      if (this.selectedType?.id) {
        form.append("type", this.selectedType?.id);
       
      }

      form.append("name", this.name?.ru);
      form.append("name_en", this.name?.en);
      form.append("name_ru", this.name?.ru);
      form.append("name_uz", this.name?.uz);

      form.append("price", this.product?.price);
      form.append("amount_in_store", this.product?.amount_in_store);
      form.append("code", this.product?.code);
      form.append("available", this.product?.available);
      form.append("active", this.product?.active);
      form.append("recommended", this.product?.recommended);

      form.append("info", this.content?.contentRu);
      form.append("info_en", this.content?.contentEn);
      form.append("info_ru", this.content?.contentRu);
      form.append("info_uz", this.content?.contentUz);

      form.append("image", this.mainImage);
      
      for (let index = 0; index < this.imageGalleryArr.length; index++) {
        let file = this.imageGalleryArr[index];
        form.append("images", file);
         
      }
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios
        .post(`${this.$baseUrl}/product/`, form, params)
        .then(() => {
          
          this.$router.push({name: "drugs"});

          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi dori yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
        })
        .catch((err) => {
          console.log('bu yrga keldi')
          const errors = Object.values(err.response.data);
          console.log(errors);
          for (let index = 0; index < errors.length; index++) {
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: "Xato ketdi! - " + errors[index],
                icon: "CheckCircleIcon",
                variant: "danger",
              },
            });
          }
        });
    },
    setCategory(item) {
      this.selectedCategory = item;
    },
    setType(item) {
      this.selectedType = item;
    },
    setBrand(item) {
      this.selectedBrand = item;
    },
    reset_all(){
      console.log('salom dunyo')
      this.selectedCategory={};

      this.selectedType={};

      this.selectedBrand={};

      this.imageGalleryUrls= [];

      this.mainImageUrl=null;

      this.content.contentUz='';
      this.content.contentRu='';
      this.content.contentEn='';
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/quill.scss";
.swiper-centered-slides {
  .swiper-wrapper {
    align-items: center !important;
    display: flex !important;
    text-align: center;
  }
}
</style>
