app.component('product-display', {
    props:{
        cart:{
            type: Array,
            required: true
        },
        variants: {
            type: Array,
            required: true
        },
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">

            <div class="product-image">
                <!-- show of product -->
                <img :src="image" :class="[quantity < 1 ? 'out-of-stock-img' : '']">
                
                <!-- show a link to other products if there is no stock quantity -->
                <p v-show="quantity < 1" class="linkBrand">
                Viste others product of <a :href="url">{{brand}}</a>
                </p>
            </div>

            <div class="product-info">
                <!-- show title of product -->
                <h1>{{ title }}</h1>

                <!-- show description of product -->
                <p>{{ descriptionProduct }}</p>

                <!-- show shipping price-->
                <p>Shipping: {{ shipping }}</p>
                
                <!-- show available quantity -->
                <p v-if="quantAvalible >= 10">{{ quantAvalible }} units in stock</p>
                <p v-else-if="quantAvalible > 1">Run up, only {{ quantAvalible }} units in stock</p>
                <p v-else-if="quantAvalible > 0">It overing, {{ quantAvalible }} unit in stock</p>
                <p v-else>Out of stock</p>

                
                <!-- show details -->
                <details-display :details="details"></details-display>

                <!-- show colors options and sizes -->
                <div v-for="(variant, index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}">
                </div>

                <!-- show sizes avalibles -->
                <ul>
                    <li class="sizes" v-for="size in sizes">{{ size }}</li>
                </ul>

                <!-- show botton add and remove item -->
                <button class="button" @click="addToCart" :class="[quantity < 1 ? 'disabledButton' : '']" :disabled="quantity < 1">Add to card</button>
                <button class="button" @click="removeItem" :class="[showRemoveBotton ? '' : 'disabledButton']" :disabled="!showRemoveBotton" v-show="showRemoveBotton">Remove item</button>
                
            </div>
            
            </div>
        <reviews-list :reviews="reviews"></reviews-list>
        <review-from @review-submited="addReview"></review-from>
    </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Socks industry',
            description: 'This is a nice ',
            selectedVariante: 0,
            showLink: false,
            link: 'link',
            url: '#',
            details: ['50% cotton', '30% wool', '20% polyester'],
            showRemoveBotton : false,
            reviews: []
        }
    },
    methods: {
        addToCart(){
            let id = this.variants[this.selectedVariante].id
            this.$emit('update-card', 'add', id),
            this.styleBottons()
        },
        removeItem(){
            let id = this.variants[this.selectedVariante].id
            this.$emit('update-card', 'remove', id),
            this.styleBottons()
        },
        updateVariant(index){
            this.selectedVariante = index
            this.styleBottons()
        },
        styleBottons(){
            let uniqueId = this.cart.filter(onlyUnique)
            let i = 0
            uniqueId.forEach(id => {
                if(this.variants[this.selectedVariante].id == id){
                    i ++
                }
            })
            i > 0 ? this.showRemoveBotton = true : this.showRemoveBotton = false
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed: {
        title(){
            return this.product +' '+ this.variants[this.selectedVariante].color 
        },
        descriptionProduct(){
            return this.description + this.product
        },
        quantity(){
            return this.variants[this.selectedVariante].quantity
        },
        image(){
            return this.variants[this.selectedVariante].image
        },
        sizes(){
            return this.variants[this.selectedVariante].sizes
        },
        shipping(){
            return this.premium ? 'Free' : '$' + this.variants[this.selectedVariante].shippingPrice
        },
        quantAvalible(){
            return this.variants[this.selectedVariante].quantity
        }
    }
}) 