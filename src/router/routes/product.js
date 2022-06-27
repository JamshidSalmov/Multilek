export default [
  // Categories
  {
    path: "/product/drug-categories",
    name: "drug-categories",
    component: () =>
      import("@/views/product/drug-categories/DrugCategories.vue"),
    meta: {
      pageTitle: "Drug categories",
      breadcrumb: [
        {
          text: "Drug categories",
          active: true,
        },
      ],
    },
  },
  {
    path: "/product/drugs-categories/:id/edit",
    name: "drug-category-edit",
    component: () => import("@/views/product/drug-categories/Edit.vue"),
    meta: {
      pageTitle: "Edit",
      breadcrumb: [
        {
          text: "Drugs Categories",
          to: {name: "drug-categories"},
        },
        {
          text: "Edit",
          active: true,
        },
      ],
    },
  },
  {
    path: "/product/drugs-categories/add",
    name: "drug-category-add",
    component: () => import("@/views/product/drug-categories/Add.vue"),
    meta: {
      pageTitle: "Add",
      breadcrumb: [
        {
          text: "Drugs Categories",
          to: {name: "drug-categories"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  // Types
  {
    path: "/product/drug-types",
    name: "drug-types",
    component: () => import("@/views/product/drug-types/DrugTypes.vue"),
    meta: {
      pageTitle: "Drug types",
      breadcrumb: [
        {
          text: "Drug types",
          active: true,
        },
      ],
    },
  },
  {
    path: "/product/drug-types/:id/edit",
    name: "drug-type-edit",
    component: () => import("@/views/product/drug-types/Edit.vue"),
    meta: {
      pageTitle: "Edit",
      breadcrumb: [
        {
          text: "Drugs Types",
          to: {name: "drug-types"},
        },
        {
          text: "Edit",
          active: true,
        },
      ],
    },
  },
  {
    path: "/product/drug-types/add",
    name: "drug-type-add",
    component: () => import("@/views/product/drug-types/Add.vue"),
    meta: {
      pageTitle: "Add",
      breadcrumb: [
        {
          text: "Drugs Types",
          to: {name: "drug-types"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  // Brands
  {
    path: "/product/drug-brands",
    name: "drug-brands",
    component: () => import("@/views/product/drug-brands/DrugBrands.vue"),
    meta: {
      pageTitle: "Drug brands",
      breadcrumb: [
        {
          text: "Drug Brands",
          active: true,
        },
      ],
    },
  },
  {
    path: "/product/drug-brands/:id/edit",
    name: "drug-brand-edit",
    component: () => import("@/views/product/drug-brands/Edit.vue"),
    meta: {
      pageTitle: "Edit",
      breadcrumb: [
        {
          text: "Drugs Brands",
          to: {name: "drug-brands"},
        },
        {
          text: "Edit",
          active: true,
        },
      ],
    },
  },
  {
    path: "/product/drug-brands/add",
    name: "drug-brand-add",
    component: () => import("@/views/product/drug-brands/Add.vue"),
    meta: {
      pageTitle: "Add",
      breadcrumb: [
        {
          text: "Drugs Brands",
          to: {name: "drug-brands"},
        },
        {
          text: "Add",
          active: true,
        },
      ],
    },
  },
  // Drugs
  {
    path: "/product/drugs",
    name: "drugs",
    component: () => import("@/views/product/drugs/Drugs.vue"),
    meta: {
      pageTitle: "Drugs",
      breadcrumb: [
        {
          text: "Drugs",
          active: true,
        },
      ],
    },
  },
  {
    path: "/product/drugs/:id/edit",
    name: "drug-edit",
    params: true,
    component: () => import("@/views/product/drugs/Edit.vue"),
    meta: {
      pageTitle: "Drug Edit",
      breadcrumb: [
        {
          text: "Drugs",
          to: {name: "drugs"},
        },
        {
          text: "Drug Edit",
          active: true,
        },
      ],
    },
  },
  {
    path: "/product/drugs/add",
    name: "drug-add",
    component: () => import("@/views/product/drugs/Add.vue"),
    meta: {
      pageTitle: "Drug Add",
      breadcrumb: [
        {
          text: "Drugs",
          to: {name: "drugs"},
        },
        {
          text: "Drug Add",
          active: true,
        },
      ],
    },
  },
];
