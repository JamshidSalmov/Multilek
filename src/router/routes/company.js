export default [
  // Store addresses
  {
    path: "/company/store-addresses",
    name: "store-addresses",
    component: () =>
      import("@/views/company/store-addresses/StoreAddresses.vue"),
    meta: {
      pageTitle: "Store's Addresses",
      breadcrumb: [
        {
          text: "Store's Addresses",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/store-addresses/:id/view",
    name: "store-address-view",
    component: () => import("@/views/company/store-addresses/View.vue"),
    meta: {
      pageTitle: "View",
      breadcrumb: [
        {
          text: "Store's Addresses",
          to: {name: "store-addresses"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/store-addresses/:id/edit",
    name: "store-address-edit",
    component: () => import("@/views/company/store-addresses/Edit.vue"),
    meta: {
      pageTitle: "Edit",
      breadcrumb: [
        {
          text: "Store's Addresses",
          to: {name: "store-addresses"},
        },
        {
          text: "Edit",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/store-addresses/add",
    name: "store-address-add",
    component: () => import("@/views/company/store-addresses/Add.vue"),
    meta: {
      pageTitle: "Add",
      breadcrumb: [
        {
          text: "Store's Addresses",
          to: {name: "store-addresses"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  // Contact
  {
    path: "/company/contact",
    name: "contact",
    component: () => import("@/views/company/contact/Contact.vue"),
    meta: {
      pageTitle: "Contact",
      breadcrumb: [
        {
          text: "Contact",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/contact/add",
    name: "contact-add",
    component: () => import("@/views/company/contact/Add.vue"),
    meta: {
      pageTitle: "Contact",
      breadcrumb: [
        {
          text: "Contact",
          to: {name: "contact"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/contact/:id/view",
    name: "contact-view",
    component: () => import("@/views/company/contact/Edit.vue"),
    meta: {
      pageTitle: "Contact",
      breadcrumb: [
        {
          text: "Contact",
          to: {name: "contact"},
        },
        {
          text: "Edit",
          active: true,
        },
      ],
    },
  },
  // About
  {
    path: "/company/about",
    name: "about",
    component: () => import("@/views/company/about/About.vue"),
    meta: {
      pageTitle: "About us",
      breadcrumb: [
        {
          text: "About us",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/about/add",
    name: "about-add",
    component: () => import("@/views/company/about/Add.vue"),
    meta: {
      pageTitle: "About us",
      breadcrumb: [
        {
          text: "About us",
          to: {name: "about"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/about/:id/view",
    name: "about-view",
    component: () => import("@/views/company/about/View.vue"),
    meta: {
      pageTitle: "About us",
      breadcrumb: [
        {
          text: "About us",
          to: {name: "about"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  // Careers
  {
    path: "/company/careers",
    name: "careers",
    component: () => import("@/views/company/careers/Careers.vue"),
    meta: {
      pageTitle: "Careers",
      breadcrumb: [
        {
          text: "Careers",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/careers/add",
    name: "career-add",
    component: () => import("@/views/company/careers/Add.vue"),
    meta: {
      pageTitle: "Careers",
      breadcrumb: [
        {
          text: "Careers",
          to: {name: "careers"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/careers/:id/view",
    name: "career-view",
    component: () => import("@/views/company/careers/View.vue"),
    meta: {
      pageTitle: "Careers",
      breadcrumb: [
        {
          text: "Careers",
          to: {name: "careers"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  // Faq
  {
    path: "/company/faq",
    name: "faq",
    component: () => import("@/views/company/faq/Faq.vue"),
    meta: {
      pageTitle: "FAQ",
      breadcrumb: [
        {
          text: "Faq",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/faq/add",
    name: "faq-add",
    component: () => import("@/views/company/faq/Add.vue"),
    meta: {
      pageTitle: "Faq",
      breadcrumb: [
        {
          text: "Faq",
          to: {name: "faq"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/faq/:id/view",
    name: "faq-view",
    component: () => import("@/views/company/faq/View.vue"),
    meta: {
      pageTitle: "Faq",
      breadcrumb: [
        {
          text: "Faq",
          to: {name: "faq"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  // Privacy policy
  {
    path: "/company/privacy-policy",
    name: "privacy-policy",
    component: () => import("@/views/company/privacy-policy/PrivacyPolicy.vue"),
    meta: {
      pageTitle: "Privacy policy",
      breadcrumb: [
        {
          text: "Privacy policy",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/privacy-policy/add",
    name: "privacy-policy-add",
    component: () => import("@/views/company/privacy-policy/Add.vue"),
    meta: {
      pageTitle: "Privacy policy",
      breadcrumb: [
        {
          text: "Privacy policy",
          to: {name: "privacy-policy"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/privacy-policy/:id/view",
    name: "privacy-policy-view",
    component: () => import("@/views/company/privacy-policy/View.vue"),
    meta: {
      pageTitle: "Privacy policy",
      breadcrumb: [
        {
          text: "Privacy policy",
          to: {name: "privacy-policy"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
  // Terms of use
  {
    path: "/company/terms-of-use",
    name: "terms-of-use",
    component: () => import("@/views/company/terms-of-use/TermsOfUse.vue"),
    meta: {
      pageTitle: "Terms of use",
      breadcrumb: [
        {
          text: "Terms of use",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/terms-of-use/add",
    name: "terms-of-use-add",
    component: () => import("@/views/company/terms-of-use/Add.vue"),
    meta: {
      pageTitle: "Terms of use",
      breadcrumb: [
        {
          text: "Terms of use",
          to: {name: "terms-of-use"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  {
    path: "/company/terms-of-use/:id/view",
    name: "terms-of-use-view",
    component: () => import("@/views/company/terms-of-use/View.vue"),
    meta: {
      pageTitle: "Terms of use",
      breadcrumb: [
        {
          text: "Terms of use",
          to: {name: "terms-of-use"},
        },
        {
          text: "View",
          active: true,
        },
      ],
    },
  },
];
