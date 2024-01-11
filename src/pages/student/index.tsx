import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useState } from "react";
import { IndexCard } from "../../components/IndexCard";
import { IndexSideCard } from "../../components/IndexSideCard";
import { NavigationBar } from "../../components/student/NavigationBar";
import { useGetAllPostsQuery, useCreatePostMutation, useImportantQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Home = () => {
	const [important,setImportant] = useState(false);
	const [text,setText] = useState("");
	const [{data}] = useGetAllPostsQuery();
	const [,createPost] = useCreatePostMutation();
	const [{data:special}] = useImportantQuery();
  return (
	  
    <>
      <NavigationBar />
      <div className="flex justify-center h-screen px-4 text-gray-700">
	<div className="flex w-full max-w-screen-lg">
		<div className="flex flex-col w-64 py-4 pr-3">
		<Link href={"/student/registered_exams"}><a className="px-3 py-2 mt-2 text-lg font-medium rounded-md hover:bg-gray-300" href="#">Пријављени испити</a></Link>
		<Link href="/student/passed_exams" replace={true}><a className="px-3 py-2 mt-2 text-lg font-medium rounded-md hover:bg-gray-300" href="#">Положени испити</a></Link>
		<Link href="/student/next_examination_period" replace={true}><a className="px-3 py-2 mt-2 text-lg font-medium rounded-md hover:bg-gray-300" href="#">Пријава испита</a></Link>
		<Link href="/student/subjects" replace={true}><a className="px-3 py-2 mt-2 text-lg font-medium rounded-md hover:bg-gray-300" href="#">Предмети</a></Link>
			<a className="px-3 py-2 mt-2 text-lg font-medium rounded-md hover:bg-gray-300" href="#">Универзитет</a>
			<a className="flex px-3 py-2 mt-2 mt-auto text-lg rounded-md font-medium hover:bg-gray-200" href="#">
			
			</a>
		</div>
		<div className="flex flex-col flex-grow border-l border-r border-gray-300">
			<div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300">
				<h1 className="text-xl font-semibold">Обавештења</h1>
			</div>
			<div className="flex-grow h-0 overflow-auto">
			{data?.getAllPosts.map(post => {
					return(<IndexCard post={post}/>)
				})}
			</div>
		</div>
		<div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
			<input className="flex items-center h-8 px-2 border border-gray-500 rounded-md" type="search" placeholder="Search…"/>
			<div>
				<h3 className="mt-6 font-semibold">Популарно</h3>
				{special?.getImportant.map(post => {
					return(<IndexSideCard post={post}/>)
				})}
			</div>
		</div>
	</div>
</div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
