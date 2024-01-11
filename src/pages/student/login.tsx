import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "../../components/InputField";
import { NavigationBar } from "../../components/student/NavigationBar";
import { useLoginMutation, useMeQuery } from "../../generated/graphql";
import grbUniverziteta from "../../public/grbuniverziteta.png";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Login = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [{ data, error, fetching }] = useMeQuery();
  
  useEffect(() => {
    if (data?.me) {
      router.push("/student");
    }
  }, [fetching, data, router]);

  const [alert, setAlert] = useState<JSX.Element | null>(null);

  if (data?.me) {
    return (
      <svg
        role="status"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    );
  }


  return (
    <>
      <NavigationBar />
      {alert}
      <div className="min-h-full flex items-center  justify-center py-12 px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <div className="text-center -mt-16 ">
              <Image src={grbUniverziteta} alt="Workflow" height={120} width={150} />
            </div>
            <h2 className="mt-6 text-center text-xl font-extrabold text-gray-800">Пријавите се у свој налог</h2>
          </div>
          <Formik
            initialValues={{ brind: "", password: "" }}
            onSubmit={async (values) => {
              const response = await login(values);
              if (response.error?.message.includes("ER001")) {
                setAlert(
                  <div className="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300">
                    <div className="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
                      <span className="text-red-500">
                        <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="alert-content ml-4">
                      <div className="alert-title font-semibold text-lg text-red-800">Грешка</div>
                      <div className="alert-description text-sm text-red-600">Погрешан број индекса или шифра</div>
                    </div>
                  </div>
                );
              } else if (response.data?.login) {
                router.push("/student");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6 " action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label className="sr-only">Brind</label>
                    <InputField
                      id="brind"
                      name="brind"
                      type="brind"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Број индекса"
                    />
                  </div>
                  <div>
                    <label className="sr-only">Password</label>
                    <InputField
                      id="password"
                      name="password"
                      type="password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Шифра"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <a
                      onClick={() => {
                        router.push("/professor/login");
                      }}
                      className=" block cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-500"
                    >
                      Професорска пријава?
                    </a>
                  </div>

                  <div className="text-sm">
                    <a className="font-medium text-gray-600 hover:text-gray-500 cursor-pointer">
                      Заборавили сте шифру?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Пријави се
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
