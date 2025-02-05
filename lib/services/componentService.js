import dynamic from "next/dynamic";

export const components = {
  TestComponent1: dynamic(() =>
    import("@/components/blocks/TestComponent1").then(
      (module) => module.default
    )
  ),
  TestComponent2: dynamic(() =>
    import("@/components/blocks/TestComponent2").then(
      (module) => module.default
    )
  ),
  Contact: dynamic(() =>
    import("@/components/blocks/Contact").then((module) => module.default)
  ),
  TaxonomyCollection: dynamic(() =>
    import("@/components/blocks/TaxonomyCollection").then(
      (module) => module.default
    )
  ),
  Slider: dynamic(() =>
    import("@/components/blocks/Slider").then((module) => module.default)
  ),
  Gallery: dynamic(() =>
    import("@/components/blocks/Gallery").then((module) => module.default)
  ),
  Banner: dynamic(() =>
    import("@/components/blocks/Banner").then((module) => module.default)
  ),
  Furniture: dynamic(() =>
    import("@/components/blocks/Furniture").then((module) => module.default)
  ),

  BestSelling: dynamic(() =>
    import("@/components/blocks/BestSelling").then((module) => module.default)
  ),
};
