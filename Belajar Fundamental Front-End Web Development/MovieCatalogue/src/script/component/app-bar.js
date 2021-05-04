class AppBar extends HTMLElement {

	constructor() {
		super();
		this.shadowDOM = this.attachShadow({mode: "open"});
	}
	
	connectedCallback() {
		this.render();
	}
	
	render() {
		this.shadowDOM.innerHTML = `
		<style>
			* {
				 margin: 0;
				 padding: 0;
				 box-sizing: border-box;
			}
			:host {
				display: block;
				width: 100%;				
				background-color: darkcyan;
				color: white;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
			}
			h2 {
				padding: 16px;
			}
			ul {
				list-style-type: none;
				margin: 0;
				overflow: hidden;
				background-color: #333;
			}
			li {
				float: left;
			}
			li a {
				display: block;
				color: white;
				text-align: center;
				padding: 14px 16px;
				text-decoration: none;
			}
		    a:hover{
				background-color: blue;
			}			
			
		</style>
		<h2>Movie Catalogue</h2>
		<ul>
			<li><a href="index.html">Home</a></li>
			<li><a href="about.html">About</a></li>
		</ul>`;
	}
}

customElements.define("app-bar", AppBar);