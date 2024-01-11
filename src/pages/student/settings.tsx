import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { NavigationBar } from "../../components/student/NavigationBar";
import {
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Settings = () => {
  const [, updateEmail] = useUpdateEmailMutation();
  const [, updatePassword] = useUpdatePasswordMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const alert = (
    <div className="alert flex flex-row items-center bg-green-200 p-5 rounded border-b-2 border-green-300">
      <div className="alert-icon flex items-center bg-green-100 border-2 border-green-500 justify-center h-10 w-10 flex-shrink-0 rounded-full"></div>
      <div className="alert-content ml-4">
        <div className="alert-title font-semibold text-lg text-green-800">
          Успешно сте извршили промену!
        </div>
      </div>
    </div>
  );

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <NavigationBar />

      {isAlert ? alert : null}

      <div className="h-full mt-10">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">Подешавања налога</h2>
            <form className="mt-6 border-t border-gray-400 pt-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    email адреса
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Унеси нову email адресу"
                  />
                  <button
                    onClick={async () => {
                      const result = await updateEmail({ email: email });
                      if (result) {
                        setIsAlert(true);
                      }
                    }}
                    className="appearance-none w-48 mt-4 bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md "
                  >
                    Промени е-mail адресу
                  </button>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    шифра
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Унеси нову шифру"
                  />
                  <button
                    onClick={async () => {
                      const result = await updatePassword({ pass: password });
                      if (result) {
                        setIsAlert(true);
                      }
                    }}
                    className="appearance-none mt-4 w-48 bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md "
                  >
                    Промени шифру
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Settings);
