export interface INavItem {
  title: string;
  link: string;
  collapse: INavItem[] | null;
}

export const getNavigationList = (): INavItem[] => {
  return [
    { title: "Home", link: "/", collapse: null },
    { title: "FinOps", link: "", collapse: null },
    {
      title: "Product",
      link: "/page-not-found/product.html",
      collapse: null,
    },
    {
      title: "InfraOps",
      link: "",
      collapse: [
        {
          title: "Ops",
          link: "/page-not-found/intake.html",
          collapse: null,
        },
        {
          title: "SecOps",
          link: "",
          collapse: null,
        },
        {
          title: "Development",
          link: "/page-not-found/infraOps.html",
          collapse: null,
        },
      ],
    },
    {
      title: "CaB",
      link: "/page-not-found/cab.html",
      collapse: null,
    },
  ];
};
