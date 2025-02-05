const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const axios = require("axios").default;
const { Jsona } = require("jsona");
const dataFormatter = new Jsona();

const generateStaticJson = (filename, newData) => {
  const staticPath = "./lib/preBuildScripts/static/";
  const filePath = staticPath + filename;

  // Attempt to read the existing data
  let existingData;
  try {
    existingData = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    existingData = null;
  }

  // If no existing data or data is different, write the new data
  if (existingData !== JSON.stringify(newData)) {
    console.log(`Generated new json file for \x1b[32m${filename}\x1b[0m`);
    fs.writeFileSync(filePath, JSON.stringify(newData));
  } else {
    console.log(`Skipping file write in \x1b[33m${filename}\x1b[0m.`);
  }
};

module.exports.preBuildDevelopment = async () => {
  dotenv.config();
  // Convert the environment variables to a JSON object
  const envVars = {};
  for (const key in process.env) {
    envVars[key] = process.env[key];
  }

  // Form Setting
  const formSettingHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/settings/form"
  );
  const formSetting = dataFormatter.deserialize(formSettingHandler.data);

  // Locales
  const localesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/locales"
  );
  const locales = localesHandler.data;

  // Form
  // const formHandler = await axios.get(
  //   envVars.NEXT_PUBLIC_TENANT_API + "/api/forms/get-in-touch?include=blueprint"
  // );
  // const form = dataFormatter.deserialize(formHandler.data);

  // Global Data
  const footerTenantDetails = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/globals/ecommerce-footer-tenant-details"
  );
  const footerTenantDetailsData = dataFormatter.deserialize(
    footerTenantDetails.data
  );

  const footertDetails = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/globals/ecommerce-footer-tenant-details"
  );
  const footerDetailsData = dataFormatter.deserialize(footertDetails.data);

  const tenantDetailsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/globals/tenant-details"
  );
  const tenantDetails = dataFormatter.deserialize(tenantDetailsHandler.data);

  // furniture category
  const categoryDetailsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/taxonomies/product-category?include=taxonomyTerms"
  );
  const categoryDetails = dataFormatter.deserialize(
    categoryDetailsHandler.data
  );

  // Menu Data
  const menusHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/menus?include=nodes.children,parentNodes"
  );
  const menus = dataFormatter.deserialize(menusHandler.data);

  // Generate default Image
  const generateImage = (imageUrl, path) => {
    const file = fs.createWriteStream(path);
    https.get(imageUrl, function (response) {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("Default Image Downloaded");
      });
    });
  };
  [].forEach((e, i) => {
    generateImage(e, `./public/image${i}.webp`);
  });
  generateStaticJson("categoryDetails.json", categoryDetails);
  generateStaticJson("footerTenantDetailsData.json", footerTenantDetailsData);
  generateStaticJson("footerDetailsData.json", footerDetailsData);
  // generateStaticJson("filename.json", yourData);
  generateStaticJson("globalData.json", {
    tenantDetails,
    menus,
    locales,
    formSetting,
  });

  console.log("New Global Data Generated!");
};
