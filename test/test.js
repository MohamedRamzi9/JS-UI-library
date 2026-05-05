import * as dom from '../Dom.js';

class SplitPane {
	constructor(container, pane_elements) {
		this.splitter_width = 10;
		this.container = container;
		this.pane_elements = pane_elements;
		this.current_splitter_index = -1;
		this.on_move = this.on_move.bind(this);
		this.stop_move = this.stop_move.bind(this);

		this.parent_x = 0;
		this.parent_observer = new ResizeObserver(enteries => {
			let old_width = this.pane_elements.reduce((sum, pane) => sum + pane.get_client_width(), 0) + this.get_all_splitter_width();
			let new_width = enteries[0].contentRect.width;
			this.parent_x = enteries[0].contentRect.x;
			this.redistribute_space(old_width, new_width);
		});
		this.parent_observer.observe(this.container.get_elem());

		this.pane_elements.forEach((pane, index) => {
			pane.parent(this.container);
			if (index < this.pane_elements.length - 1) {
				dom.div().parent(this.container).style({
					width: `${this.splitter_width}px`,
					backgroundColor: 'gray',
					cursor: 'col-resize',
				}).add_event("mousedown", () => {
					this.current_splitter_index = index;
					window.addEventListener("mousemove", this.on_move);
					window.addEventListener("mouseup", this.stop_move);
				});
			}
		});
	}
	redistribute_space(old_width, new_width) {
		old_width -= this.get_all_splitter_width();
		new_width -= this.get_all_splitter_width();

		// // redistribute new space proportionally to the new width on all panes
		this.pane_elements.forEach(pane => {
			let current_width = pane.get_client_width();
			let pane_new_width = current_width * (new_width / old_width);
			pane_new_width = Math.max(1, pane_new_width);
			pane.width(`${pane_new_width}px`);

		});

		// // redistribute extra space to the last pane
		// let last_pane_element = this.pane_elements[this.pane_elements.length - 1];
		// let last_pane_width = 0;
		// for (let i = 0; i < this.pane_elements.length - 1; i++) {
		// 	let pane = this.pane_elements[i];
		// 	last_pane_width += pane.get_client_width();
		// }
		// last_pane_width = new_width - last_pane_width;
		// last_pane_width = Math.max(10, last_pane_width);
		// last_pane_element.width(`${last_pane_width}px`);
	}
	get_all_splitter_width() {
		return this.splitter_width * (this.pane_elements.length - 1);
	}

	parent(parent) {
		this.container = parent;
		return this;
	}
	on_move(event) {
		let local_start = 0;
		for (let i = 0; i < this.current_splitter_index; i++) {
			local_start += this.pane_elements[i].get_client_width();
		}
		let local_width =  
			this.pane_elements[this.current_splitter_index].get_client_width()
			+ this.pane_elements[this.current_splitter_index + 1].get_client_width()
		;

		let left_width = event.clientX - this.container.get_bounding_box().x - local_start;
		left_width = Math.max(0, Math.min(left_width, local_width));
		this.pane_elements[this.current_splitter_index].width(`${left_width}px`);
		let right_width = local_width - left_width;
		this.pane_elements[this.current_splitter_index + 1].width(`${right_width}px`);
	}
	stop_move() {
		window.removeEventListener("mousemove", this.on_move);
		window.removeEventListener("mouseup", this.stop_move);
	}
}

dom.on_page_load(() => {
	let body = dom.get_body();
	body.style({
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'lightgray',
		color: 'black',
		width: '100%',
		height: '100vh',
		margin: '0',
	});
	let container = dom.div().parent(body).style({
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
	});
	let pane1 = dom.div().style({ display:"flex", width: '20%', backgroundColor:'lightblue', });
	let pane2 = dom.div().style({ display:"flex", width: '20%', backgroundColor:'lightgreen', });
	let pane21 = dom.div().style({ display:"flex", width: '50%', backgroundColor:'lightyellow', });
	let pane22 = dom.div().style({ display:"flex", width: '50%', backgroundColor:'lightpink', });
	let split_pane2 = new SplitPane(pane2, [pane21, pane22]);
	let pane3 = dom.div().style({ display:"flex", width: '20%', backgroundColor:'lightcoral', });
	let split_pane = new SplitPane(container, [pane1, pane2, pane3]);
});