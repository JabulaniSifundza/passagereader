import React, {useRef, useEffect, useState} from "react";
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import {Puff} from "react-loader-spinner";
import {Fragment} from "react";



const App = () =>{
	const passageRef = useRef(null);
	const questionRef = useRef(null);

	const [answer, setAnswer] = useState();
	const [model, setModel] = useState(null);

	const loadTFModel = async () =>{
		const loadedModel = await qna.load()
		setModel(loadedModel);
		console.log("model has been loaded");
	}

	useEffect(()=>{
		loadTFModel()
	}, [])

	const answerQuestion = async (e)=>{
		if(e.which === 13 && model !== null){
			//Enter key is 13
			console.log("Question asked");
			const passage =  passageRef.current.value;
			const question = questionRef.current.value;

			const answers = await model.findAswers(question, passage);
			setAnswer(answers);
			console.log(answers)
		}
	}


	return (
		<div className="App">
			<header className="App-header">
				{}
				{
					model == null?
					<div>
						<div>Model Loading</div>
						<Puff
						type="Puff"
						color="#aa0000"
						height={100}
						width={100}/>
					</div>
					: 
					<Fragment>
						Enter your desired Passage/Text
						<textarea ref={passageRef} rows="30" cols="100"></textarea>
						Ask a question about the above passage
						<input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
						Answers
						{answer ? answer.map((ans, idx) => <div><b>Answer {idx+1} - </b>{ans.text} ({Math.floor(ans.score*100)/100})</div>):""}

					</Fragment>

				}
			</header>
		</div>
	)




}

export default App;
