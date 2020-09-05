class MyFooter extends HTMLElement{
	connectedCallback(){
		this.render();
	}

	render() {
		this.innerHTML = `
        <footer class="text-center copyright " id="sticky-footer">
        <p class="p-4 text-white">Belajar Fundamental Front-End Web Development <a href="https://dicoding.com/">Dicoding.com</a> &copy; 2020,Made with <i class="fas fa-heart"></i> by <span class="myName"><a href="https://instagram.com/chandraper_" class="myName" target="_blank">Chandra Perdiansyah</a></span></p>
     	</footer>
        `;
	}
}

customElements.define("my-footer",MyFooter);
