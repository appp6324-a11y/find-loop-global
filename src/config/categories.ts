export type CategoryConfig = {
  slug: string;
  name: string;
  subcategories: {
    slug: string;
    name: string;
    fields: {
      key: string;
      label: string;
      type: "text" | "number" | "select";
      options?: string[];
      required?: boolean;
    }[];
  }[];
};

export const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    slug: "jobs",
    name: "Jobs & Hiring",
    subcategories: [
      {
        slug: "full-time",
        name: "Full Time",
        fields: [
          { key: "salary", label: "Salary", type: "number" },
          {
            key: "jobType",
            label: "Job Type",
            type: "select",
            options: ["On-site", "Remote", "Hybrid"]
          }
        ]
      }
    ]
  },
  {
    slug: "for-sale",
    name: "For Sale",
    subcategories: [
      {
        slug: "electronics",
        name: "Electronics",
        fields: [
          { key: "brand", label: "Brand", type: "text" },
          { key: "condition", label: "Condition", type: "select", options: ["New", "Used"] }
        ]
      }
    ]
  },
  {
    slug: "property",
    name: "Property",
    subcategories: [
      {
        slug: "rent",
        name: "For Rent",
        fields: [
          { key: "bedrooms", label: "Bedrooms", type: "number" },
          { key: "bathrooms", label: "Bathrooms", type: "number" }
        ]
      }
    ]
  }
];
