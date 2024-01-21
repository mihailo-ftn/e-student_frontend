import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AdminNavigationBar } from "../../components/admin/NavigationBar";
import { InputField } from "../../components/InputField";
import {
  GetAllModulsDocument,
  GetClassesDocument,
  useCreateStudentMutation,
  useGetAllModulsQuery,
  useGetClassesQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import SuccessModal from "../../components/SuccessModal";
import { submitForm } from "../../utils/submitForm";
import ErrorModal from "../../components/ErrorModal";
import DropdownField from "../../components/DropdownField";
import { useQuery } from "urql";

const CreateStudent = ({}) => {
  const [, createStudent] = useCreateStudentMutation();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  // window.location.reload();

  const [{ data: modulData }] = useGetAllModulsQuery();
  const [{ data: classData }] = useGetClassesQuery();

  const modulOptions =
    modulData && modulData.getAllModuls
      ? modulData.getAllModuls.map((modul: { id: string; moduleCode: string }) => ({
          id: modul.id,
          label: modul.moduleCode,
        }))
      : [];

  const classOptions =
    classData && classData.getClasses
      ? classData.getClasses.map((clas: { id: string; classLabel: number }) => ({
          id: clas.id,
          label: clas.classLabel.toString(),
        }))
      : [];

  return (
    <>
      <AdminNavigationBar />
      <ErrorModal isOpen={!!error} onClose={() => setError("")}>
        <h2>{error}</h2>
      </ErrorModal>
      <SuccessModal isOpen={showSuccess} onClose={() => router.back()}>
        <h2>Успешно креирано.</h2>
      </SuccessModal>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          brind: "",
          middleName: "",
          jmbg: "",
          modulID: "",
          classID: "",
          birthDate: "",
        }}
        onSubmit={async (values) =>
          submitForm(values, () => createStudent({ input: values }), setError, setShowSuccess)
        }
      >
        {({ isSubmitting }) => (
          <Form className="mt-3 space-y-6" action="#" method="POST">
            <div className="h-full">
              <div className="container mx-auto">
                <div className="inputs w-full max-w-2xl p-6 mx-auto">
                  <h2 className="text-2xl text-gray-900">Додај студента</h2>
                  <div className="mt-2 border-t border-gray-400 pt-4">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Име студента
                        </label>
                        <InputField
                          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          id="firstName"
                          name="firstName"
                          type="firstName"
                          placeholder="Унеси име студента"
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Презиме студента
                        </label>
                        <InputField
                          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          id="lastName"
                          name="lastName"
                          type="lastName"
                          placeholder="Унеси презиме студента"
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Име једног родитеља
                        </label>
                        <InputField
                          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          id="middleName"
                          name="middleName"
                          type="middleName"
                          placeholder="Унеси име једног родитеља"
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Еmail адреса
                        </label>
                        <InputField
                          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Унеси email адресу"
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Број индекса
                        </label>
                        <InputField
                          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          id="brind"
                          name="brind"
                          type="brind"
                          placeholder="Унеси број индекса"
                        />
                      </div>

                      <div className="w-full md:w-full px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Датум рођења
                        </label>
                        <InputField
                          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          placeholder="Унеси датум рођења"
                        />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6 ">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Модул
                        </label>
                        <DropdownField name="modulID" options={modulOptions} placeholder="Изабери модул" />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6 ">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Генерација
                        </label>
                        <DropdownField name="classID" options={classOptions} placeholder="Изабери генерацију" />
                      </div>
                      <div className="w-full md:w-full px-3 mb-6 ">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          ЈМБГ
                        </label>
                        <InputField
                          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                          id="jmbg"
                          name="jmbg"
                          type="jmbg"
                          placeholder="Унеси ЈМБГ"
                        />
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

export default withUrqlClient(createUrqlClient)(CreateStudent);
