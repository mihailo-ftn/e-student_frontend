import React from "react";

export const IndexCard = ({post}: any) => {
  return (
    <div className="flex w-full p-8 border-b border-gray-300">
      <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
      <div className="flex flex-col flex-grow ml-4">
        <div className="flex">
          <span className="font-semibold">{post.creator.firstName}</span>
          <span className="ml-1 font-semibold">{post.creator.lastName}</span>
          <span className="ml-auto text-sm">{post.creationDate.split("T")[0]}</span>
        </div>
        <p className="mt-1">
          {post.text}
        </p>
      </div>
    </div>
  );
};
