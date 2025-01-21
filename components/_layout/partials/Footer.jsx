import Link from "next/link";
import ContactForm from "@/components/partials/forms/ContactForm.jsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import Jsona from "jsona";
import FORMAPI from "@/lib/api/forms/request";
import footerTenantDetailsData from "@/lib/preBuildScripts/static/footerDetailsData.json";
import footerDetailsData from "@/lib/preBuildScripts/static/footerDetailsData.json";
const dataFormatter = new Jsona();

export default function Footer() {
  const [formData, setFormData] = useState();
  const [isLoadingForm, setIsLoadingForm] = useState();
  const { data } = footerTenantDetailsData;
  const fetchFormData = async () => {
    setIsLoadingForm(true);
    try {
      const res = await FORMAPI.findForm(
        "ecommerce-contact-form",
        "?include=blueprint"
      );
      const dataHandler = dataFormatter.deserialize(res);
      setFormData(dataHandler);
      setIsLoadingForm(false);
    } catch (error) {
      setIsLoadingForm(false);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white py-[15px]">
      {<ContactForm form={formData} />}
      {
        ("footerTenantDetailsData",
        data?.main?.accounts?.map((account, index) => {
          console.log(account);
        }))
      }
      <div className="grid grid-cols-3 px-32">
        <div>
          <div className="py-4">{data?.main?.name}</div>
          <div className="flex items-center gap-3 py-4">
            {data?.main?.accounts?.map((account, index) => {
              return (
                <Image
                  key={index}
                  src={account}
                  width={40}
                  height={40}
                  alt={`Image ${index}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-wrap gap-[15px] justify-between items-center">
          <span>
            {`&copy; ${currentYear} Sample Sitename. All rights reserved.`}{" "}
          </span>
          <span className="opacity-50">
            <Link href="https://halcyonagile.com/" target="_blank">
              Web develop by:
              <span className="underline">Halcyon Web Design</span>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
