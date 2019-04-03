let description = `Ціна: 600 грн<br />
	Якісний товар!<br />
	Доставка по всій Україні 2-3 дня!<br />
	Оплата при отриманні!<br />
	Розмір 31-44!`

let things = [
	{
		id: 790,
		filter: 'shoes',
		name: 'Nike Mercurial Walked (сороконіжки)',
		price: 599,
		img: './src/images/shoes-1-1.jpg',
		otherImg: [
			'./src/images/shoes-1-2.jpg',
			'./src/images/shoes-1-3.jpg'
		],
		description: description,
		availability: true
	},
	{
		id: 791,
		filter: 'shoes',
		name: 'Nike Mercurial Walked (сороконіжки)',
		price: 599,
		img: './src/images/shoes-2-1.jpg',
		otherImg: [
			'./src/images/shoes-2-2.jpg',
			'./src/images/shoes-2-3.jpg',
			'./src/images/shoes-2-4.jpg'
		],
		description: description,
		availability: true
	},
	{
		id: 792,
		filter: 'shoes',
		name: 'Nike Mercurial Walked (сороконіжки)',
		price: 599,
		img: './src/images/shoes-3-1.jpg',
		otherImg: [
			'./src/images/shoes-3-2.jpg'
		],
		description: description,
		availability: true
	},
	{
		id: 793,
		filter: 'shoes',
		name: 'Nike Mercurial Walked (сороконіжки)',
		price: 599,
		img: './src/images/shoes-4-1.jpg',
		otherImg: [
			'./src/images/shoes-4-2.jpg',
			'./src/images/shoes-4-3.jpg',
			'./src/images/shoes-4-4.jpg'
		],
		description: description,
		availability: true
	},
	{
		id: 794,
		filter: 'shoes',
		name: 'Nike Mercurial Walked (сороконіжки)',
		price: 599,
		img: './src/images/shoes-5-1.jpg',
		otherImg: [
			'./src/images/shoes-5-2.jpg',
			'./src/images/shoes-5-3.jpg'
		],
		description: description,
		availability: true
	},
	{
		id: 795,
		filter: 'shoes',
		name: 'Nike Mercurial Walked (сороконіжки)',
		price: 599,
		img: './src/images/shoes-6-1.jpg',
		otherImg: [
			'./src/images/shoes-6-2.jpg',
			'./src/images/shoes-6-3.jpg'
		],
		description: description,
		availability: true
	},
	{
		id: 796,
		filter: 'shoes',
		name: 'Nike Mercurial Walked (сороконіжки)',
		price: 599,
		img: './src/images/shoes-7-1.jpg',
		otherImg: [
			'./src/images/shoes-7-2.jpg',
			'./src/images/shoes-7-3.jpg'
		],
		description: description,
		availability: true
	},
	{
		id: 797,
		filter: 'shoes',
		name: 'Nike Mercurial Walked (сороконіжки)',
		price: 599,
		img: './src/images/shoes-8-1.jpg',
		otherImg: [
			'./src/images/shoes-8-2.jpg',
			'./src/images/shoes-8-3.jpg'
		],
		description: description,
		availability: true
	},
	{
		id: 798,
		filter: 'shoes',
		name: 'Nike Mercurial Walked (сороконіжки)',
		price: 599,
		img: './src/images/shoes-9-1.jpg',
		otherImg: [
			'./src/images/shoes-9-2.jpg'
		],
		description: description,
		availability: true
	}
]

Vue.component('my-header', {
	template: `<h1>Xedrum Shop</h1>`
})

Vue.component('my-footer', {
	template: `<footer>
		<p>Copyrigh © 2018-2019&ensp;&ensp;&ensp;</p>
		<a href="https://bohdan-krupa.github.io" target="_blank">Created by Bohdan Krupa</a>
	</footer>`
})

let ThingsContainer = Vue.component('things-container', {
	data: () => {
		return {
			active: 'shoes'
		}
	},
	template: `<div>
		<filter-container @viewActive="onViewActive"></filter-container>
		<things :active="active"></things>
	</div>`,
	methods: {
		onViewActive(tag) {
			this.active = tag
		}
	}
})

Vue.component('filter-container', {
	data: () => {
		return {
			filters: [
				// { tag: 'type1', name: 'Одяг' },
				// { tag: 'all', name: 'Все' },
				{ tag: 'shoes', name: 'Футбольне взуття' }
			],
			active: 'shoes'
		}
	},
	// template: `<div class="filter-container">
	// 	<div
	// 		v-for="filter in filters"
	// 		class="filter" :class="{ active: filter.tag == active }"
	// 		@click="filterClick(filter.tag)"
	// 	>
	// 		{{ filter.name }}
	// 	</div>
	// </div>`,
	template: `<p class="sub-text">
		Ласкаво просимо в наш інтернет-магазин!<br />
		Вашій увазі широкий асортимент товарів!<br />
		Наш інтернет-магазин пропонує найнижчі ціни!<br />
		Чекаємо вас за покупками кожен день,<br />
		ми завжди готові до ваших послуг!
	</p>`,
	methods: {
		filterClick(tag) {
			this.active = tag
			this.$emit('viewActive', this.active)
		}
	}
})

Vue.component('things', {
	props: ['active'],
	data: () => {
		return {
			things: things
		}
	},
	template: `<div class="things">
		<div
			v-for="thing in things"
			v-if="thing.filter == active || active == 'all'"
			class="thing"
		>
			<router-link :to="'/article/' + thing.id">
				<div class="image" :style="{ backgroundImage: 'url(' + thing.img + ')' }">
					<div class="price">{{ thing.price }}&#8372;</div>
				</div>
				<div class="btn-buy">Купити</div>
			</router-link>
		</div>
	</div>`
})

let ThingContainer = Vue.component('thing-container', {
	data: () => {
		return {
			thing: {}
		}
	},
	created: function() {
		this.thing = things.find(item => {
			return item.id == this.$route.params.id
		})

		// For changing references
		this.thing = Object.assign({}, this.thing)
		this.thing.otherImg = [...this.thing.otherImg]
	},
	template: `<div class="thing-container">
		<div class="left">
			<div class="image" :style="{ backgroundImage: 'url(' + thing.img + ')' }">
				<div class="price">{{ thing.price }}&#8372;</div>
			</div>
			<div
				v-for="(img, id) in thing.otherImg"
				class="small-image"
				:style="{ backgroundImage: 'url(' + img + ')' }"
				@click="smallImgClick(id)"
			></div>
		</div>
		<div class="right">
			<p class="name">{{ thing.name }}</p>
			<p v-if="thing.availability" class="available">В наявності</p>
			<p v-else class="unavailable">Немає в наявності</p>
			<p class="article">Артикул: {{ thing.id }}</p>
			<p v-html="thing.description" class="description"></p>
			<p class="contact-title">Контакти для покупки</p>
			<a href="https://www.instagram.com/xedrum_shop/" class="number">Instagram: @xedrum_shop</a>
			<a href="tel:+380983771267" class="number">+380 98 377-12-67</a>
			<a href="tel:+380672047743" class="number">+380 67 204-77-43</a>
		</div>
	</div>`,
	methods: {
		smallImgClick(id) {
			let temp = this.thing.img
			this.thing.img = this.thing.otherImg[id]
			this.thing.otherImg[id] = temp
		}
	}
})

let router = new VueRouter({
	routes: [
		{ path: '/', component: ThingsContainer },
		{ path: '/article/:id', component: ThingContainer }
	]
})