<template>
  <div class="ecommerce-application">
    <b-form @submit.prevent="changeAddress">
      <b-card>
        <b-row>
          <!-- created -->
          <b-col cols="12">
            <b-form-group label="created" label-cols-md="4">
              <b-form-input
                placeholder="created"
                :value="Formatter(order.created)"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- price -->
          <b-col cols="12">
            <b-form-group label="price" label-cols-md="4">
              <b-form-input
                placeholder="price"
                :value="formatTo(order.price)"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- drugs_count -->
          <b-col cols="12">
            <b-form-group label="drugs_count" label-cols-md="4">
              <b-form-input
                readonly
                type="tel"
                placeholder="drugs_count"
                v-model="order.drugs_count"
              />
            </b-form-group>
          </b-col>
          <!-- delivery_price -->
          <b-col cols="12">
            <b-form-group label="delivery_price" label-cols-md="4">
              <b-form-input
                placeholder="delivery_price"
                :value="formatTo(order.delivery_price)"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- total_price -->
          <b-col cols="12">
            <b-form-group label="total_price" label-cols-md="4">
              <b-form-input
                placeholder="total_price"
                :value="formatTo(order.total_price)"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- payment_method -->
          <b-col cols="12">
            <b-form-group label="payment_method" label-cols-md="4">
              <b-form-input
                placeholder="payment_method"
                v-model="order.payment_method"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- status -->
          <b-col cols="12">
            <b-form-group label="status" label-cols-md="4">
              <b-form-input
                placeholder="status"
                v-model="order.status"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- delivery_type -->
          <b-col cols="12">
            <b-form-group label="delivery_type" label-cols-md="4">
              <b-form-input
                placeholder="delivery_type"
                v-model="order.delivery_type"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- delivery_status -->
          <b-col cols="12">
            <b-form-group label="delivery_status" label-cols-md="4">
              <b-form-input
                placeholder="delivery_status"
                v-model="order.delivery_status"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- in_collect_time -->
          <b-col cols="12">
            <b-form-group label="in_collect_time" label-cols-md="4">
              <b-form-input
                placeholder="in_collect_time"
                :value="Formatter(order.in_collect_time)"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- delivery_time -->
          <b-col cols="12">
            <b-form-group label="delivery_time" label-cols-md="4">
              <b-form-input
                placeholder="delivery_time"
                :value="Formatter(order.delivery_time)"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- being_delivered_time -->
          <b-col cols="12">
            <b-form-group label="being_delivered_time" label-cols-md="4">
              <b-form-input
                placeholder="being_delivered_time"
                :value="Formatter(order.being_delivered_time)"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- courier -->
          <b-col cols="12">
            <b-form-group label="courier" label-cols-md="4">
              <b-form-input
                placeholder="courier"
                v-model="order.courier"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </b-form>

    <h2 class="my-2">
      Ordered products:
    </h2>
    <OrderedProducts :products="order.doses" />
  </div>
</template>

<script>
import axios from "axios";
import OrderedProducts from "./OrderedProducts.vue";
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
    OrderedProducts,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      order: {
        address: "",
        birthday: "",
        finance_sum: null,
        first_name: "",
        full_name: "",
        gender: "",
        ill_history: "",
        is_active: null,
        is_staff: null,
        last_name: "",
        location: "",
        phone_number: "",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    formatTo(item) {
      return Number(item).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    Formatter(value) {
      return value != null
        ? value.slice(0, 10) + " " + value.slice(11, 19)
        : "- : - : -";
    },
    Gender(value) {
      switch (value) {
        case "M":
          return "Male";
        case "F":
          return "Female";

        default:
          return "";
      }
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
          `${this.$baseUrl}/dashboard/order-dashboard/${this.$route.params.id}/`,
          params
        )
        .then((res) => {
          this.order = res.data;
        });
    },
  },
};
</script>
