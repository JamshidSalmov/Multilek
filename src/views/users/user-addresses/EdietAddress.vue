<template>
  <b-form @submit.stop.prevent="changeAddress">
    <b-card>
      <b-row>
        <!-- Address Name -->
        <b-col cols="12">
          <b-form-group label="Address" label-cols-md="4"
          label-for="Address">
            <b-form-input
              placeholder="Address"
              v-model="address.address"
              id="Address"
            />
          </b-form-group>
        </b-col>
        <!-- entrance -->
        <b-col cols="12">
          <b-form-group label="entrance" label-cols-md="4"
          label-for="entrance">
            <b-form-input
              id="entrance"
              placeholder="entrance"
              v-model="address.entrance"
            />
          </b-form-group>
        </b-col>
        <!-- floor -->
        <b-col cols="12">
          <b-form-group label="floor" label-cols-md="4"
          label-for="floor">
            <b-form-input
              id="floor"
              placeholder="floor"
              v-model="address.floor"
            />
          </b-form-group>
        </b-col>
        <!-- flat -->
        <b-col cols="12">
          <b-form-group label="flat" label-cols-md="4"
          label-for="flat">
            <b-form-input
              id="flat" placeholder="flat" v-model="address.flat" />
          </b-form-group>
        </b-col>
        
        <!-- landmark -->
        <b-col cols="12">
          <b-form-group label="landmark" label-cols-md="4"
          label-for="landmark">
            <b-form-input
              id="landmark"
              placeholder="landmark"
              v-model="address.landmark"
            />
          </b-form-group>
        </b-col>
        <!-- note -->
        <b-col cols="12">
          <b-form-group label="note" label-cols-md="4"
          label-for="note">
            <b-form-input
              id="note" placeholder="note" v-model="address.note" />
          </b-form-group>
        </b-col>
        <!-- Lat -->
       <b-col cols="12">
          <b-form-group label="Lat" label-cols-md="4"
          label-for="Lat">
            <b-form-input
              id="Lat"
              placeholder="Lat"
              v-model="address.lat"
            />
          </b-form-group>
        </b-col>
        <!-- Long -->
        <b-col cols="12">
          <b-form-group label="Long" label-cols-md="4"
          label-for="Long">
            <b-form-input
              id="Long"
              placeholder="Long"
              v-model="address.long"
            />
          </b-form-group>
        </b-col>
        <!-- Is permament -->
        <b-col cols="12">
            <b-form-group label="Is permament" label-cols-md="4" label-for="is_permament">
                <b-form-checkbox
                id="is_permament"
                v-model="address.is_permament"
                class="custom-control-primary"
                >
                Is permament
                </b-form-checkbox>
            </b-form-group>
        </b-col>
       <!-- Map -->
        <b-col cols="12" class="mt-1 mb-2"
        label-for="mapp">
          <MapView
            id="mapp"
            v-if="address && address.lat && address.long"
            :latlng="[address.lat, address.long]"
            class="my-map-cabinet"
          />
        </b-col>
      </b-row>
    </b-card>
    <!-- Submet and Reset -->
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
    <b-overlay :show="busy" no-wrap></b-overlay>
  </b-form>
</template>

<script>
import axios from "axios";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import MapView from "./MapView.vue";
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
  BOverlay,
  BFormCheckbox,
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
    MapView,
    BOverlay,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      busy: true,
      address: {
        address:"",
        entrance:"",
        floor: "",
        flat: "",
        landmark: "",
        note: "",
        lat: "",
        long: "",
        is_permament: true,
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    reset_all(){
        this.address.address = "";
        this.address.entrance= "";
        this.address.floor = "";
        this.address.flat= "";
        this.address.landmark = "";
        this.address.note= "";
        this.address.lat= "";
        this.address.long = "";
        this.address.is_permament= false;
    },
    async getData() {
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
        },
      };
      await axios
        .get(
          `${this.$baseUrl}/product/address/${this.$route.params.id}/`,
          params
        )
        .then((res) => {
          console.log('EditAddress data',res)
            this.address.address = res.data.address;
            this.address.entrance = res.data.entrance;
            this.address.floor = res.data.floor;
            this.address.flat = res.data.flat;
            this.address.landmark = res.data.landmark;
            this.address.note = res.data.note;
            this.address.lat = res.data.lat;
            this.address.long = res.data.long;
            this.address.is_permament = res.data.is_permament;
            this.busy = false;
        });
    },
    async changeAddress() {
      const form = new FormData();
      form.append("address", this.address?.address);
      form.append("entrance", this.address?.entrance);
      form.append("floor", this.address?.floor);
      form.append("flat", this.address?.flat);
      form.append("landmark", this.address?.landmark);
      form.append("note", this.address?.note);
      form.append("lat", this.address?.lat);
      form.append("long", this.address?.long);
      form.append("is_permament", this.address?.is_permament);
      console.log("New address",this.address)
      const access = localStorage.getItem("access");
      const params = {
        headers: {
          "Accept-Language": "ru",
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      }
      await axios
        .patch(`${this.$baseUrl}/product/address/${this.$route.params.id}/`, form, params)
        .then((res) => {
        //   console.log('Qarasang qarab quy eh joningdan',res)
          this.getData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Yangi user yaratildi!",
              icon: "CheckCircleIcon",
              variant: "success",
            },
          });
          this.$router.push({name: "user-addresses"});
        })
        .catch((err) => {
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
  },
};
</script>
<style scoped lang="scss"></style>
