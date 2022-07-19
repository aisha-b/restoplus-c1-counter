import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import "./Counter.css";

export default function Counter() {
	const [count, setCount] = useState(0);

	function increment() {
		setCount(count + 1);
		sendCount(count + 1);
	}

	function decrement() {
		if (count !== 0) {
			setCount(count - 1);
			sendCount(count - 1);
		}
	}

	function reset() {
		setCount(0);
		sendCount(0);
	}

	function getCount() {
		fetch(`${process.env.REACT_APP_COUNTER_API_URL}/count/get`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				setCount(res.count);
			});
	}

	function sendCount(newCount) {
		fetch(`${process.env.REACT_APP_COUNTER_API_URL}/count/update`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				count: newCount,
			}),
		});
	}

	useEffect(() => {
		getCount();
	}, []);

	return (
		<div className="container">
			<h1 className="header">COUNTER</h1>
			<p>with MongoDB</p>
			<p className="count-display">{count}</p>
			<div>
				<div className="button-group">
					<Button name="-" type="decrement" handleClick={decrement} />
					<Button name="+" type="increment" handleClick={increment} />
					<Button name="Reset" type="reset" handleClick={reset} />
				</div>
			</div>
		</div>
	);
}
