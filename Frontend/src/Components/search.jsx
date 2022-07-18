import Button from "./Button"
import Input from "./Input"

function Search(props) {
	return (
		<>
			<Input
				id="query"
				name="query"
				text="Search"
				type="text"
				placeholder="search..."
				inputStyle="inputStyle"
				labelStyle="labelStyle"
			/>
			<Button text="Card ID/Unique ID" buttonStyle={buttonStyle} />
			<Button text="Cards by Username" buttonStyle={buttonStyle} />
			<Button text="Card ID" buttonStyle={buttonStyle} />
		</>
	)
}

export default Search
