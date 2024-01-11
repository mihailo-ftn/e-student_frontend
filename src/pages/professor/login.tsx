import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import Image from "next/image";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { InputField } from '../../components/InputField';
import { ProfessorNavigationBar } from '../../components/professor/NavigationBar';
import { useLoginProfessorMutation, useMeProfessorQuery } from '../../generated/graphql';
import grbUniverziteta from "../../public/grbuniverziteta.png";
import { createUrqlClient } from '../../utils/createUrqlClient';
import { isProfessor } from '../../utils/isProfessor';

const ProfessorLogin = ({}) => {
    const router = useRouter();
    const [, login] = useLoginProfessorMutation();
    const [{ data, error, fetching }] = useMeProfessorQuery();
    useEffect(() => {
      if (data?.meProfessor) {
        router.push("/professor");
      }
    }, [fetching, data, router]);
        return (
          <>
            <ProfessorNavigationBar />
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-24">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <div className="text-center -mt-16">
                    <Image src={grbUniverziteta} alt="Workflow" height={120} width={150} />
                  </div>
                  <h2 className="mt-6 text-center text-xl font-extrabold text-gray-800">Пријавите се у свој налог</h2>
                </div>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);
                    if (response?.error) {
                      console.log("err", response.error);
                    } else if (response.data?.loginProfessor) {
                      router.push("/professor");
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="mt-8 space-y-6" action="#" method="POST">
                      <input type="hidden" name="remember" value="true" />
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                          <label className="sr-only">Email</label>
                          <InputField
                            id="email"
                            name="email"
                            type="email"
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email адреса"
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
}

export default withUrqlClient(createUrqlClient)(ProfessorLogin);

