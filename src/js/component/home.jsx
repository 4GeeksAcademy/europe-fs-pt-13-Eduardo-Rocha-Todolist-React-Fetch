import React from "react";
import TodoList from "./todolist";

//include images into your bundle
//import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			< TodoList />
		</div>
	);
};

export default Home;
