import FormField from "@/components/forms/FormField";
import { Fragment, useState } from "react";
import { formSubmit, isError, RenderCaptcha } from "@/lib/services/formService";
import formStore from "@/lib/store/formStore";
import globalState from "@/lib/store/globalState";
import { shallow } from "zustand/shallow";
import SuccessInfo from "@/components/modal/SuccessInfo";

export default function ContactForm({ form }) {
  const { formSuccessInfo, uploading, submitLoading, setFormSuccessInfo } =
    formStore(
      (state) => ({
        formSuccessInfo: state.formSuccessInfo,
        uploading: state.uploading,
        submitLoading: state.submitLoading,
        setFormSuccessInfo: state.setFormSuccessInfo,
      }),
      shallow
    );

  const captcha = globalState((state) => state.captcha);
  const [errors, setErrors] = useState([]);
  const [statusLoader, setStatusLoader] = useState(false);
  const [token, setToken] = useState();

  const findClass = (field) => {
    switch (field) {
      default:
        return "min-h-[45px] border border-[#ccc] px-[15px] py-[5px] w-full input";
    }
  };

  const setSuccessTimeOut = () => {
    setTimeout(() => {
      setStatusLoader(false);
      setFormSuccessInfo(false);
    }, 3000);
  };

  const findWrapperClass = (field) => {
    switch (field) {
      case "message":
      case "name":
        return "col-span-2";
      case "radio_list":
        return "flex flex-col";
      default:
        return "col-span-2 sm:col-span-1";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusLoader(true);
    try {
      await formSubmit({
        e,
        formId: form.id,
        setToken,
        token,
        captcha,
        sections: form?.blueprint?.schema?.sections,
        setErrors,
        formData: formStore.getState(),
      });

      setFormSuccessInfo(true);

      setStatusLoader(false);

      setSuccessTimeOut();
    } catch (error) {
      console.error("Error during form submission:", error);

      setStatusLoader(false);
    }
  };

  return (
    <>
      {formSuccessInfo && <SuccessInfo />}

      {form?.blueprint?.schema?.sections.map((section) => {
        const fields = section?.fields || [];
        return (
          <Fragment key={section?.state_name}>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-[15px] items-center justify-center my-6">
                <h1 className="text-[32px] text-[#0C4A6E]">
                  Sign up for our newsletter
                </h1>
                <p className="container text-[18px] text-gray-500 my-3">
                  <div className="px-52 text-center break-words">
                    Stay updated with the latest products, exclusive deals, and
                    special offers! Sign up for our newsletter, and be the first
                    to know about new arrivals, discounts, promotions, and
                    exciting updates from our store.
                  </div>
                </p>

                {fields.map((field) =>
                  field?.state_name === "email" ? (
                    <Fragment key={field?.state_name}>
                      <div className="flex">
                        <FormField
                          {...field}
                          className="p-4 border w-[380px]"
                          error={isError(
                            errors,
                            section?.state_name,
                            field?.state_name
                          )}
                        />
                        <button
                          disabled={uploading || submitLoading}
                          className={`${
                            !uploading && !submitLoading
                              ? "cursor-pointer "
                              : "cursor-not-allowed"
                          } min-w-[150px] h-[58px] p-0 select-none px-4 btn text-[16px] text-[#0C4A6E] border border-[#0C4A6E]`}
                        >
                          {statusLoader ? (
                            <>
                              <div className="relative flex justify-center items-center h-full w-full">
                                <div className="h-8 w-8 rounded-full absolute border-2 border-solid border-gray-200"></div>
                                <div className="h-8 w-8 rounded-full animate-spin absolute border-2 border-solid border-[#0C4A6E] border-t-transparent"></div>
                              </div>
                            </>
                          ) : (
                            <>Subscribe</>
                          )}
                        </button>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment key={field?.state_name}>
                      <div className="w-[530px] text-gray-500">
                        <FormField
                          {...field}
                          className={findClass(field?.state_name)}
                          wrapperclassname={findWrapperClass(field?.state_name)}
                          error={isError(
                            errors,
                            section?.state_name,
                            field?.state_name
                          )}
                        />
                      </div>
                    </Fragment>
                  )
                )}
              </div>

              {form?.attributes?.uses_captcha && (
                <RenderCaptcha setToken={setToken} />
              )}
            </form>
          </Fragment>
        );
      })}
    </>
  );
}
