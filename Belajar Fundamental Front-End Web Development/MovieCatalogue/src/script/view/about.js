class About extends HTMLElement {

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
			p {
			   overflow: hidden;
			   text-overflow: ellipsis;
			   display: -webkit-box;
			   -webkit-line-clamp: 10; /* number of lines to show */
			   -webkit-box-orient: vertical;
			   margin:10px 10px 0px 20px;
			}
			
			img{
				width: 200px;
				max-height: 150px;
				border-radius: 0.5rem;
				object-fit: cover;
				object-position: center;
				margin:20px 20px;
			}
		</style>
		<p>Web ini dibuat menggunakan ES6, Custom Element, NPM, Webpack, dan AJAX.</p>
		<p>Data Film di web ini menggunakan API  dari <a href="http://themoviedb.org/">The Movie Database</a> (TMDb), 
		tapi tidak di endorse atau certified by TMDb.</p>
		<img src="/src/img/themoviedb_logo.svg"></img>`;		
	}
}

customElements.define("about-web", About);