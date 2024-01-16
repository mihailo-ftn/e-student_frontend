import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { AdminNavigationBar } from "../../components/admin/NavigationBar";
import { InputField } from "../../components/InputField";
import {
  SubjectType,
  useCreatSubjectMutation,
  useCreateExaminationPeriodMutation,
  useGetAllModulsQuery,
  useGetAllProfessorsQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import DropdownField from "../../components/DropdownField";

const CreateExaminationPeriod = ({}) => {
  const [, createExaminationPeriod] = useCreateExaminationPeriodMutation();
  const [{ data: profData }] = useGetAllProfessorsQuery();
  const [{ data: modulData }] = useGetAllModulsQuery();

  const professorOptions =
    profData && profData.getAllProfessors
      ? profData.getAllProfessors.map((prof) => ({ id: prof.id, label: `${prof.firstName} ${prof.lastName}` }))
      : [];

  const modulOptions =
    modulData && modulData.getAllModuls
      ? modulData.getAllModuls.map((modul) => ({ id: modul.id, label: modul.moduleCode }))
      : [];

  return (
    <>
      <AdminNavigationBar />
      <Formik
        initialValues={{
          name: "",
          endDate: "",
          beginningDate: "",
          modulID: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await createExaminationPeriod({
            input: values,
          });
          if (response.error?.message.includes("ER201")) {
            console.log("Module you entered does nost exist");
          } else if (response.error?.message.includes("ER100")) {
            console.log("Check input values");
          } else if (response.error?.message.includes("ER301")) {
            console.log("Class you entered does nost exist");
          } else if (response.data) {
            console.log("Success");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-3 space-y-6" action="#" method="POST">
            <div className="h-full">
              <div className="container mx-auto">
                <div className="inputs w-full max-w-2xl p-6 mx-auto">
                  <h2 className="text-2xl text-gray-900">Додај испитни рок</h2>
                  <div className="mt-2 border-t border-gray-400 pt-4">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Назив испитног рока
                        </label>
                        <InputField
                          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          id="name"
                          name="name"
                          type="name"
                          placeholder="Унеси назив"
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          модул
                        </label>
                        <DropdownField name="modulID" options={modulOptions} placeholder="Изабери модул" />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6 ">
                        <button
                          type="submit"
                          className="appearance-none mt-4 w-48 bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md "
                        >
                          Унеси
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(CreateExaminationPeriod);
