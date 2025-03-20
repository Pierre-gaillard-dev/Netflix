import React, { useState } from "react"
// components
import { Search } from "./Icons"
// css
import "./css/SearchBar.css"

interface SearchBarProps {
	placeholder: string
	foldOnEmptySearch?: boolean
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
	const { placeholder, foldOnEmptySearch } = props
	const [search, setSearch] = useState("")
	const [folded, setFolded] = useState(foldOnEmptySearch ? !search : false)
	const [focused, setFocused] = useState(false)

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
		if (foldOnEmptySearch) {
			setFolded(!e.target.value)
		}
	}
	return (
		<div className={"search-bar" + (folded && !focused ? " folded" : "")}>
			<label htmlFor="search">
				<Search />
			</label>
			<input
				type="text"
				id="search"
				placeholder={placeholder}
				onChange={handleSearch}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
		</div>
	)
}

export default SearchBar
