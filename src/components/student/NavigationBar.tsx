import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import grbUniverziteta from "../../public/grbuniverziteta.png";

export const NavigationBar = () => {
  const [down, setDown] = useState(false);
  const [downMobile, setDownMobile] = useState(false);
  const [ispitiMenu, setIspitiMenu] = useState(false);
  const [{ data, error, fetching }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const router = useRouter();

  let body = null;

  if (data?.me) {
    body = (
      <>
        <p className="text-white text-md hidden sm:block">
          {data.me.firstName} {data.me.lastName}
        </p>
        <div className="ml-3 relative">
          <div>
            <button
              type="button"
              className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={() => {
                setDown(!down);
              }}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="h-12 w-12 rounded-full"
                src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                alt=""
              />
            </button>
          </div>
          {down ? (
            <div
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                id="user-menu-item-0"
                onClick={() => {
                  router.push("/student/profile");
                }}
              >
                Профил
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                id="user-menu-item-1"
                onClick={() => {
                  router.push("/student/settings");
                }}
              >
                Подешавања
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                id="user-menu-item-2"
                onClick={async () => {
                  const result = await logout();
                  if (result) {
                    router.replace("/");
                  }
                }}
              >
                Одјави се
              </a>
            </div>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => {
                setDownMobile(!downMobile);
              }}
            >
              <span className="sr-only">Отвори главни мени</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div
              className="flex-shrink-0 flex items-center"
              onClick={() => {
                router.push("/");
              }}
            >
              <div className="flex cursor-pointer">
                <Image src={grbUniverziteta} alt="Workflow" width={60} height={50} />
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6 mt-2">
              <div className="flex space-x-4">
                <a
                  className="bg-gray-900 cursor-pointer text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                  onClick={() => {
                    setIspitiMenu(!ispitiMenu);
                  }}
                >
                  Испити
                </a>
                {ispitiMenu ? (
                  <div className="flex absolute rounded shadow w-44 bg-white mt-11">
                    <ul className="py-1" aria-labelledby="dropdownButton">
                      <li>
                        <Link href={"/student/registered_exams"}>
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            role="menuitem"
                            id="user-menu-item-1"
                          >
                            Пријављени испити
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/student/passed_exams" replace={true}>
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            role="menuitem"
                            id="user-menu-item-1"
                          >
                            Положени испити
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/student/next_examination_period" replace={true}>
                          <a
                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            role="menuitem"
                            id="user-menu-item-1"
                          >
                            Пријава испита
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : null}
                <Link href="/student/subjects" replace={true}>
                  <a className="text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Предмети
                  </a>
                </Link>
                <Link href="/student" replace={true}>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Насловна
                  </a>
                </Link>
                <Link href="https://www.kg.ac.rs/" replace={true}>
                  <a
                    href="https://www.kg.ac.rs/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Универзитет
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {body}
          </div>
        </div>
      </div>
      {downMobile ? (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Испити
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Нешто
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Нешто
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Нешто
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
};
